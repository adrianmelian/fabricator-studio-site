---
title: Fabricator
summary: Assemble a Maya rig from reusable components onto a skeleton, then build and edit it until it is animation ready.
category: rigging
---

# Fabricator

## What it does
Fabricator is FabricatorStudio's rigging tool: assemble a rig from reusable components (FK, IK, spline, ribbon, and more) onto a skeleton, then click Build Rig to bake them into controls and constraints. Rig state lives in the scene as connected nodes, so renaming joints or controls never breaks it. One button toggles the rig between an editable Edit Mode and a built Animation Mode, and unbuilding restores each component's state.

## Quick start
1. Launch Fabricator and choose File > New Rig to adopt the scene's skeleton.
2. Select a joint or chain, then double-click a component in the Palette to attach it.
3. Run "Aim Joints at Aimers" once to bake joint orientation before building.
4. Click Build Rig. Fix anything the Build Issues dialog flags, then build again.

## Good to know
- Save Rig only works in Edit Mode; unbuild first if the rig is built.
- Duplicating or mirroring joints in the viewport can carry a component's connections onto the duplicate; the pre-build check flags this.
- Deleting a joint or aimer a component depends on leaves it orphaned; Build Rig blocks until it is fixed or restored.
