---
title: Armature
summary: The editable skeleton stage of Fabricator, where you place joints, orient them live, and mirror the whole skeleton before you build the rig.
category: rigging
---

# Armature

## What
The Armature is Fabricator's editable skeleton stage: the joints, their live orientation, and their layout, before you press Build Rig. Every rig starts here. You place and shape the skeleton in the Armature, Fabricator keeps it oriented and symmetrical as you work, and it bakes into a clean, engine-ready skeleton when you build.

## Why
A rig is only as good as the skeleton under it. The Armature keeps that skeleton correct while you author it. Joints orient themselves as you move them, symmetry mirrors one side onto the other live, and the whole thing stays non-destructive so you can restructure at any point. It replaces the old one-off Smart Joint Mirror workflow with a system that holds the entire skeleton together.

## How
You build the Armature from the Skeleton Helpers Bar at the top of the Fabricator window:

- **Add Joint** and **Insert Joints Between**: grow a chain, or subdivide a segment to add twist and bend joints without rebuilding it.
- **Aim Joints at Aimers**: every joint carries a live XYZ aimer that keeps orientation correct as you move joints around. One click bakes it, so rotate carries the orientation and jointOrient and rotateAxis are zeroed, exactly what Unreal expects.
- **Armature Skeleton Symmetry**: toggle Live Mirror and one side drives the other while you pose, or use Mirror Joints, Mirror Limb, and Mirror Module to snap the opposite side into place.
- **Duplicate Limb** and **Duplicate Joints**: reuse a limb you have already placed.

The Armature is non-destructive. Unbuild a rig and you land right back in it with nothing lost, and skinned meshes detach and rebind automatically around Armature edits, so you can restructure the skeleton even after skinning.

## Related
Skeleton IO saves and loads the armature skeleton as portable JSON. Joint Aimer is the standalone tool for orienting hand-built or imported skeletons outside Fabricator. Build the animation rig itself with Fabricator.
