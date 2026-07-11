---
title: ML Auto Skin
summary: A tabbed Bind / Delta Mush / DemBones-Bake pipeline that auto-skins a mesh, smooths it, then bakes the smoothed motion back into pure skinCluster weights, with the heavy solvers running in a background mayapy process.
category: skinning
---

# ML Auto Skin

## What it does
Auto Skin is a single tabbed dialog (BIND / DEFORM / BAKE) over three independent skinning stages: an auto-bind (Maya-native Geodesic Voxel, or BBW - Bounded Biharmonic Weights - via libigl), a Delta Mush smoothing pass, and a DemBones bake that plays a ROM (range-of-motion) animation through the bound + smoothed mesh and solves pure skinCluster weights that reproduce the same deformation. A standalone "BBW Bind" dialog offers the same BBW solver with more tuning (Surface vs Tet mode, handles-per-joint, a debug proxy-mesh compare) than Auto Skin's BIND tab exposes. All of it (libigl, TetGen, pymeshfix, py_dem_bones) runs inside a `mayapy.exe` subprocess rather than in Maya's own process, because Maya's GUI bundles numpy 1.24.4 while these solvers need numpy 2.x - a fresh `mayapy.exe` process picks up the separately-installed, pinned numpy 2.4.6 instead. A guided, opt-in first-run installer puts those pinned packages into mayapy's user site-packages via pip; it is never run automatically.

## Quick start
1. Shelf: **Auto Skin** button on the `fsAnim` shelf ("unified Bind / Delta Mush / DemBones Bake pipeline") opens the tabbed dialog. It has no FabricatorStudio menu entry.
2. **BIND tab** - select the mesh plus its influence joints, choose **Geodesic Voxel** (fast, Maya-native) or **BBW (Tet)** (slower, volumetric, needs a single-shell mesh), click **Bind Selection**.
3. **DEFORM tab** - with the bound mesh selected, set Smoothing Iterations (default 10) / Smoothing Step (default 0.5), click **Apply Delta Mush** to layer a `deltaMush` deformer on top of the skin.
4. **BAKE tab** - load or key a short ROM animation across the scene's Playback range (at least 2 frames) so the mesh visibly deforms through the deltaMush stack, set Max Influences (default 4), click **Bake DemBones**. Check **Debug Compare** first to bake onto a duplicate mesh instead of overwriting the original, so you can A/B before committing.
5. The first time Bind or Bake needs a package that isn't installed yet, a "Missing Dependencies" dialog offers a one-click install (needs internet, one-time); accepting it installs everything and automatically retries the action that triggered it.

## Workflow
**Bind dispatch** (`auto_skin_app.auto_skin_bind`): Geodesic Voxel validates the selection (at least one mesh transform + at least one joint), creates a `skinCluster(toSelectedBones=True)` per mesh, then runs `cmds.geomBind(bindMethod=3, geodesicVoxelParams=[1024, 1], falloff=0.2)` inside one undo chunk. BBW (Tet) instead dispatches straight to `bbw_skin(mode='tet')` using its own built-in defaults (`k_nearest=7`, `closestPoint` surface association, no debug proxy kept) - Auto Skin's BIND tab has no controls for those knobs or for Surface mode; open the standalone BBW Bind dialog for that (`from maya_tools.skinning.bbw_skin import bbw_skin_ui; bbw_skin_ui.BBWSkinDialog.show_window()` from the Script Editor - it has no shelf/menu entry of its own either).

**BBW under the hood**: the mesh must already carry a skinCluster (rough-bound by hand or via Geodesic Voxel first) - BBW replaces its weights, it does not create the cluster. It reads world-space vertices/faces via the OpenMaya API 2.0 and the skinCluster's current influence joints/positions, then hands those to `bbw_runner.py` in a `mayapy` subprocess. **Surface mode** solves a per-shell harmonic (k=1) Laplacian system - tolerant of multiple disconnected shells (eyes, teeth) - and writes weights straight back onto the original skinCluster. **Tet mode** requires a single connected shell, repairs the mesh with `pymeshfix`, tetrahedralizes it with TetGen, solves true bounded weights via `igl.bbw`, then rebuilds a proxy mesh from the repaired geometry, binds and weights the proxy, and uses Maya's native `copySkinWeights` to transfer the result onto the original mesh (the proxy is deleted afterward unless "Keep proxy mesh" is checked, which leaves it in place at the same world position for A/B comparison).

**DemBones Bake** (`dem_bones_bake_app.dem_bones_bake`): validates one mesh with an existing skinCluster of at least 2 influences, reads its current weights as a warm-start, then scrubs the **entire Playback range** (`cmds.playbackOptions` min/max, not the animation start/end fields), sampling deformed vertex positions and every influence joint's world matrix at each frame. Frame 0 is used as the rest/bind pose when it falls inside the playback range; otherwise the range's start frame is used instead, with a warning to verify it actually matches the bind pose. Joint transforms are converted to bind-relative skin matrices before the solve, matching DemBones' own bind-frame-is-identity convention. The sampled data goes to `dem_bones_runner.py` in a `mayapy` subprocess (600s timeout - double BBW's 300s, since ROM bakes sample many more frames), and the optimized weights are written back to the same skinCluster, or to a `_dembones_compare` duplicate mesh's own skinCluster when Debug Compare is checked, leaving the original mesh, skinCluster, and deformer stack untouched.

**First-run dependency install**: `bbw_skin_app`/`dem_bones_bake_app` each probe `mayapy` with a bare import before running (cached per Maya session on `sys`, so repeat clicks skip the ~5s cold-start check). On a probe failure, the UI offers a one-click modal ("ML Skinning Dependencies") that runs `mayapy -m pip install --user <spec>` for a pinned set, in this fixed order (later packages assume the earlier ones' ABI): `numpy==2.4.6`, `scipy==1.17.1`, `libigl==2.6.1`, `tetgen`, `pymeshfix`, `py_dem_bones`. A live progress bar tracks each package; on success the action that triggered the prompt re-runs automatically. The same installer is also offered as an opt-in, off-by-default "Also install ML skinning dependencies" checkbox on the Fabricator installer itself, run only after the main tool payload installs successfully.

**UniRig / ComfyUI export** (`unirig_export_app.export_for_auto_skin`) is a separate, headless-only pathway that feeds an external ComfyUI AI bind-guess workflow - it is not part of the Auto Skin dialog and currently has no shelf or menu entry of its own. Given a selected mesh transform plus its root joint (must have no joint parent), it triangulates and exports the mesh as an `.obj` via the bundled `objExport` plugin, walks the joint hierarchy (filtered down to the mesh's existing skinCluster influences when it has one, re-parenting through any dropped joints to the nearest kept ancestor), and writes a matching `<asset>_skel.json` (joint names, parents, world positions, derived bone-tail directions, and local matrices) into the folder pointed to by the `KS_UNIRIG_COMFY_INPUT_DIR` environment variable, for ComfyUI's "KS: Load Mesh + Skeleton" node to pick up.

## Gotchas
- BBW (either mode) needs an existing skinCluster on the mesh first; it will not create one. Rough-bind by hand, or run Geodesic Voxel first, then run BBW to replace the weights.
- Tet mode hard-rejects a multi-shell mesh (e.g. body + separate eyes/teeth) before it ever reaches TetGen. Use Surface mode for those, or isolate/split the shell you want tet-quality weights on.
- BBW always scrubs to frame 0 before reading mesh + joint positions (`go_to_bind_pose=True` is not exposed as an option anywhere in either UI). If frame 0 isn't the rig's real bind pose, the solve will be wrong and there's no in-UI way to change the solve frame.
- The k-nearest handles-per-joint knob, the debug "keep proxy mesh" toggle, and the Surface/Tet mode choice only exist in the standalone BBW Bind dialog - Auto Skin's BIND tab always runs BBW Tet mode with fixed defaults.
- DemBones needs at least a 2-frame Playback range with real motion in it (a ROM clip) - it samples every frame in that range, so a longer or heavier ROM directly costs more solve time (up to the 600s subprocess timeout).
- The ML dependency versions are pinned deliberately (numpy 2.4.6 / scipy 1.17.1 / libigl 2.6.1 were, as of the pin date, the newest releases still shipping a cp311 Windows wheel) - don't `pip install --upgrade` these packages independently inside mayapy's user site-packages without checking wheel availability first.
- With no internet connection, the installer reports itself as "offline" per package rather than hiding the ML tools - they stay visible for a retry once connectivity is back.
- `unirig_export` has no shelf or menu button anywhere in the toolset right now; it can only be run from the Script Editor, and it raises immediately if `KS_UNIRIG_COMFY_INPUT_DIR` isn't already set to an existing ComfyUI input folder.
- `unirig_export_app._USE_IDENTITY_MATRIX_LOCAL` is a concluded, off-by-default experiment flag (emits identity 4x4 matrices instead of Maya's real local matrices). Leave it `False` - flipping it puts every bone in the exported FBX at the world origin, which is only meaningful for a weights-only quality check, never for visual verification.

## Troubleshooting
**"auto_skin_bind: nothing selected." / "...no mesh transform in selection." / "...no joints in selection."** - Geodesic Voxel needs both a mesh and its influence joints selected together.

**"bbw_skin: select exactly one mesh transform."** - Both BBW modes take exactly one mesh at a time, not a multi-mesh selection.

**"bbw_skin: ... has no skinCluster. Run bindSkin first..."** - BBW replaces existing weights; give it a rough bind (manual bindSkin or Geodesic Voxel) to start from.

**"bbw_skin: skinCluster ... has only N influence(s). BBW needs at least 2..."** - Add more influence joints to the rough bind before running BBW.

**"bbw_runner: Tet mode requires a single-shell mesh. Got N disconnected components."** - Split eyes/teeth/other disconnected shells into separate meshes, or switch to Surface mode.

**"dem_bones_bake: ... has no skinCluster..." / "...only N influence(s)..."** - Same preconditions as BBW: a real skinCluster with at least 2 influences must already exist on the mesh.

**"dem_bones_bake: timeline range is N frame(s). Load a ROM animation (at least 2 frames)..."** - Set the scene's Playback range to a real animated clip before baking.

**"... dependencies not importable in mayapy." / a "Missing Dependencies" prompt appears.** - Accept the one-click install (needs internet); if you decline or it still fails, the original error includes the exact `mayapy -m pip install --user ...` command to run by hand.

**Installer reports one or more packages "FAILED" with a network-looking error.** - Likely offline or blocked outbound access; retry once connected. The ML tools remain visible either way.

**"unirig_export: KS_UNIRIG_COMFY_INPUT_DIR is not set."** - Set that environment variable to your ComfyUI install's input subdirectory for the ks_unirig workflow before running the export.

**"unirig_export: selection must contain one mesh transform + one joint." / "... has a joint parent. Select the root joint..."** - Select exactly one mesh and the root joint of the hierarchy (a joint with no joint parent above it), nothing else.
