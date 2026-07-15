---
title: Bridge (Toolbar)
summary: A dockable Maya toolbar that puts FabricatorStudio's scene, build, rigging, skinning, and export tools two clicks away.
category: framework
---

# Bridge (Toolbar)

## What it does
Bridge is FabricatorStudio's framework toolbar: a single strip that docks to Maya's viewport and puts the everyday tools within two clicks, with bigger tools opening as popover panels. It covers scene I/O, object creation, constraints, selection, mirroring, skeleton and skin I/O, the renamer, Fabricator, CtrlEditor, exporters, and pose/animation libraries. A Connect AI panel gives an AI client read-only scene access.

## Quick start
1. Show the toolbar from Maya's FabricatorStudio menu; it docks along the bottom by default.
2. Set your active project with the PRJ chooser at the left edge.
3. Hover a button like CR (Create) for a quick action, or click a bigger tool for its full panel.
4. Use the SET (gear) popover to change dock placement, reorder tools, or hide ones you don't use.

## Good to know
- Quick panels open on hover; full tools (Renamer, Export, CtrlEditor, Pose/Anim Studios, Fabricator) open on click only, so they never pop up uninvited.
- A hover-opened panel closes if you click away; interact with it to keep it open.
- Hiding the toolbar turns off its scene-change listeners, so anything tracking live scene state only resyncs once shown again.
