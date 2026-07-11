---
title: Ribbon
summary: A cascading FK chain riding a flip-proof NURBS ribbon surface, with a twist/sine/jiggle/volume dial board, for tails, tentacles, and other bendy body parts.
category: component
---

# Ribbon

## What it builds

A variable-length bind chain (`min_joints=2`, no upper limit) ridden along a 1-wide, degree-3 NURBS surface lofted through the joints, with orientation carried by a single uvPin per component (flip-proof by construction, not by a flag). One row of the surface is skinned to its own control joint (hard-set, not blended across neighbors), and each control joint is driven by a cascading chain-parented FK ctrl (cube by default) with a free child offset ctrl (sphere by default) for secondary tweaks. A locked-TRS "cog" settings ctrl carries a dial board: per-control-roll twist, arc-length volume preservation, and a sine/jiggle secondary-motion layer, all evaluated in a fixed deformer stack (twist + sine blendShape before the skin, jiggle after it).

## When to use it

This is the component for a body part that needs FK-level authorship along its length but is too long, tapered, or organic for a fixed 2-3 joint IK/FK limb: tails, tentacles, ears, trunks, generic ribbon-driven cables. It shares its FK-cascade substrate with SplineFK (`_chain_common.py`) but is the one that adds the lofted surface ride and the antCGi-style dial board (twist, sine, jiggle, volume) - reach for Ribbon when the part needs that layered secondary motion on top of straight FK control, not just a spline-driven chain.

## Options

Pulled from `RIBBON_CONTRACT.options_schema` in `modules/ribbon.py`:

| Option | Default | What it does |
|---|---|---|
| `control_count` | `0` | FK controls / surface V CV-rows. `0` = one row per bind joint. Always clamped to a minimum of 4 at build regardless of joint count or this value. Range 0-64. |
| `ribbon_width` | `0.0` | Cross-width of the ribbon surface. `0.0` = auto: 10% of the chain's total length, floored at 25% of its shortest segment. The resolved value is persisted so rebuilds match even if joints move afterward. Range 0.0-1000.0. |
| `ctrl_shape` | `cube` | Curve-O-Matic shape for each FK ctrl. |
| `offset_ctrl_shape` | `sphere` | Curve-O-Matic shape for each ctrl's free child offset ctrl. |
| `ctrl_color` | `yellow` | Color applied to every FK ctrl, offset ctrl, and the settings ctrl. |
| `channels` | keyable: tx, ty, tz, rx, ry, rz | Channel Box setup applied to each FK ctrl. |

## Plugs and spaces

- Input: `parent_in` (matrix, required) - parent transform space. The chain's first FK ctrl (and the settings ctrl) parent under whatever this resolves to; if that target doesn't exist in the scene, build falls back to `fab_controls_grp`.
- Outputs: `start_out` (matrix, `space_target=True`) - world matrix of the chain-start FK ctrl; `tip_out` (matrix, `space_target=True`) - world matrix of the chain-tip FK ctrl. Both are flagged as space providers, so other components' space switches can target either end of a Ribbon instance.
- Ribbon declares no `space_consumers` of its own: none of its ctrls (`ribbon_fk_ctrl`, `ribbon_offset_ctrl`, `ribbon_settings_ctrl`) get a switchable `space` enum.
- `parent_strategy='walk_up'`, `side_supported=True`.

## Animator features

- Dial board on the settings ("cog") ctrl, parented under the chain-start FK ctrl: `enable`, `twist_root`, `twist_tip`, `sine_amplitude`, `sine_wavelength`, `sine_orientation`, `jiggle_amount`, `jiggle_stiffness`, `jiggle_weight`, `volume`. `enable` gates the sine and jiggle layers; twist and volume are always-live pose dials. These values persist through an Edit Rig unbuild/rebuild round trip.
- Every FK ctrl carries a free child offset ctrl for secondary, non-cascading tweaks per row.
- Marking menu: only the universal Common section (Zero All / Zero Translates / Zero Rotations / Zero Scale). Ribbon declares no `Contract.actions` and no `space_consumers`, so there is no IK/FK match and no Switch/Match-to-space entries on any of its ctrls - it's a straight FK-plus-dynamics component, not an IK counterpart.
- Mirroring: `mirror_rules` negate `translateX/Y/Z` on both `ribbon_fk_ctrl` and `ribbon_offset_ctrl` (rotation values copy verbatim, position values flip sign) - the standard pre-mirrored-joint-frame convention.
- Selection sets: the type name `Ribbon` contains neither `fk` nor `ik`, so its ctrls never join `all_fk_ctrls`, `all_ik_ctrls`, or any `<region>_fk`/`<region>_ik` set. They still join the side set (`all_left_ctrls` / `all_right_ctrls` / `all_center_ctrls`) and, if the instance has a region assigned, `<region>[_l|_r]_all`. `default_region` is empty on the contract, so region membership depends entirely on what the rigger sets per instance.

## Gotchas

- `build()` raises `RuntimeError` immediately if any bind joint in `instance.joints` doesn't exist in the scene.
- `control_count` always clamps to a floor of 4 - a 2 or 3 joint chain still gets at least 4 CV rows and 4 FK controls.
- The lofted surface is validated after build: if the CV grid isn't exactly 2 (across) by `control_count` (along), build raises `RuntimeError`. The loft's U/V assignment and normal direction are auto-detected and corrected (degree check + a normal-direction guard against the chain's up vector), but a near-degenerate or near-collinear joint chain is the real failure mode behind this check.
- The uvPin ride requires every bind joint to have `rotateAxis == (0,0,0)` and bind `scale == (1,1,1)`; `build_ride_uvpin` raises `RuntimeError` naming the offending joint before creating a single scene node if either check fails.
- Bind joints are driven through TRS channels only (uvPin to multMatrix to decomposeMatrix to translate/rotate/scale), never through `offsetParentMatrix` - by contract, because the anim exporter bakes channels and severs their inputs; a live OPM input would neither bake nor sever and would double-transform the export.
- `segmentScaleCompensate` is forced off on every ride bind joint (the ride's own compensating-scale wire replaces it). `unbuild()` restores it to Maya's default (on) - don't expect SSC to still be off immediately after an unbuild.
- The board `blendShape` (twist + sine) must evaluate before the `skinCluster` in the deformer stack; a post-skin blendShape at weight 1.0 would replace the posed skin output outright (rig looks correct at bind pose, goes dead once posed). Build calls `reorderDeformers` and then asserts the resulting stack order, raising `RuntimeError` if the reorder didn't take.
- The jiggle deformer's `enable` attribute is a 3-way enum (0=Enable, 1=Disable, 2=After-stop), not a float. It's set once at build time; live dynamics on/off is driven separately through `settings.enable` into `jiggle.envelope`.
- `ctrl_shape` / `offset_ctrl_shape` changes between rebuilds don't lose previously sculpted control CVs (they're persisted keyed by ctrl name), but the old shape's CVs don't carry over to a newly chosen shape. The `reset_ctrl_shapes` build option suppresses restoring persisted CVs entirely.
- Each control row's cross-axis comes from the nearest bind joint's local +Z; a chain with sharply varying joint orientation between neighbors can put a slight kink in the ribbon's width direction at row boundaries that fall between two bind joints.
