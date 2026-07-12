---
title: BindSkin Tools
summary: A tabbed bind, smooth, and bake pipeline that auto-skins a mesh and converts the smoothed result into clean skinCluster weights.
category: skinning
---

# BindSkin Tools

## What it does
BindSkin Tools is a tabbed dialog covering three skinning stages: an auto-bind (Geodesic Voxel or BBW), a Delta Mush smoothing pass, and a DemBones bake that solves clean skinCluster weights from the smoothed result. The heavy solvers run in a background process, separate from Maya's own Python. A standalone BBW Bind dialog offers the same solver with finer tuning.

## Quick start
1. Open BindSkin Tools from the `fsAnim` shelf.
2. On BIND, select the mesh and joints, choose Geodesic Voxel or BBW, and click Bind Selection.
3. On DEFORM, click Apply Delta Mush to smooth the bind.
4. On BAKE, load a short ROM animation and click Bake DemBones.
5. Accept the install prompt if a package is missing; it retries automatically.

## Good to know
- BBW needs an existing skinCluster; it replaces weights, not creates them. Rough-bind by hand or with Geodesic Voxel first.
- BBW reads the bind pose from frame 0. If that isn't your rig's actual bind pose, the solve will be wrong.
- Tet mode needs one connected mesh shell. Use Surface mode, in the standalone dialog, for meshes with separate pieces like eyes or teeth.
