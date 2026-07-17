---
title: Armature
summary: Fabricator's editable skeleton stage. Place the joints and they get auto-oriented, symmetry mirrors live, and it bakes into a clean, engine-ready skeleton when you build your Animation Rig.
category: rigging
---

# Armature

## What
The Armature Rig is Fabricator's editable skeleton stage. You place the joints and they'll get auto-oriented. Every rig starts here. You place and shape the skeleton in the Armature, Fabricator keeps it oriented and symmetrical as you work, and it bakes into a clean, engine-ready skeleton when you build your Animation Rig.

## Why
A rig is only as good as the skeleton under it. The Armature keeps that skeleton correct while you author it. Joints orient themselves as you move them, symmetry mirrors one side onto the other live, and the whole thing stays live so you can restructure at any point.

## How
1. Start with a Template, a single root joint, or bring your own skeleton.
2. Move the Armature controls around.
3. Watch the aimers move around, they represent the final orientation of that joint.
4. Use Symmetry to keep your skeleton symmetrical. Turn it off for asymmetry.
5. Duplicate and Mirror limbs as needed.

The Armature is non-destructive. Unbuild a rig and you land right back in it with nothing lost, and skinned meshes detach and rebind automatically around Armature edits, so you can restructure the skeleton even after skinning.

## Related
Skeleton IO saves and loads the armature skeleton as portable JSON. Joint Aimer is the standalone tool for orienting hand-built or imported skeletons outside Fabricator. Build the animation rig itself with Fabricator.
