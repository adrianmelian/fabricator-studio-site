---
title: Skin IO
summary: Saves skin weights to a portable JSON file and loads them back, in place or transferred by closest point onto a rebuilt mesh.
category: skinning
---

# Skin IO

## What it does
Skin IO saves a mesh's skin weights to a JSON file and loads them back onto the same mesh (Direct) or transferred by closest point onto a rebuilt mesh (Transfer). A load can be scoped to selected vertices, to patch one area. It ships as popover shortcuts on a fixed temp file, plus a full window with Save and Load tabs.

## Quick start
1. Open the Skin popover on the Bridge toolbar and click "Skin IO Window..." (or use the Maya menu entry).
2. On SAVE, select your mesh, click Use Selected, confirm the output path, and click Save Skin Weights.
3. On LOAD, select the target mesh, click Use Selected, and set Skin File to the saved JSON.
4. Pick Direct or Transfer, then click Load Skin Weights.

## Good to know
- Direct mode only checks vertex count, not order. Use Transfer whenever the mesh was rebuilt, even if the count matches.
- Direct mode and vertex-scoped loads need a single target mesh; use Transfer for multiple meshes.
- "Create missing influences" is off by default, so missing joints are silently skipped unless you turn it on.
