---
title: Fabricator
summary: Assemble an Animation Rig from reusable parts, then edit it until it's animation-ready. Networked, modular, non-linear.
category: rigging
---

# Fabricator

## What it does
Fabricator is FabricatorStudio's flagship rigging tool: networked, modular, and non-linear. Assemble a rig from reusable components (FK, IK, spline, ribbon, and more) onto any skeleton, then click Build Rig to bake them into an animator-friendly rig. Rig state lives in the scene as connected nodes, so renaming joints or controls never breaks it.

## Two states
One button toggles between them; unbuild restores everything.
- **Armature State (Edit Mode)**: place and orient joints, attach rig components, and do all major edits to the rig.
- **Animation State (Build Mode)**: ready for animation. Only control-curve shapes and colors change here, no rig editing.

## Quick start
1. Launch Fabricator and choose File > New Rig to adopt the scene's skeleton.
2. Or choose a template from the Components section.
3. Have your own skeleton? Name the rig: that attaches a World component and you start building.
4. Starting fresh? Naming the rig creates a root joint with a World module. Build anything from there.
5. Click Build Rig.

## Good to know
- Save Rig only works in Edit Mode; unbuild first if the rig is built.
- Duplicating or mirroring joints in the viewport can carry a component's connections onto the duplicate; the pre-build check flags this.
- Deleting a joint or aimer a component depends on leaves it orphaned; Build Rig blocks until it is fixed or restored.
