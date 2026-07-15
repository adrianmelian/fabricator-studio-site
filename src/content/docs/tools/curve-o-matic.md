---
title: CtrlEditor
summary: Build, swap, recolor, and mirror control-curve shapes from a shared library that also drives every Fabricator component's ctrl-shape options.
category: rigging
---

# CtrlEditor

## What it does
CtrlEditor is the control-curve shape library for rigging. Pick a shape and build a fresh control from it, swap an existing control's shape without breaking its connections, mirror a control onto its opposite side, combine several curves into one multi-shape control, recolor from a shared palette, or save your own shapes back into the library. Every shape you add shows up automatically on Fabricator's components.

## Quick start
1. Open CtrlEditor from the Bridge toolbar, the shelf, or the Rigging menu.
2. Click a shape in the list.
3. Click Build at Origin for a new control, or select existing control(s) and click Swap to restyle them in place.
4. Optional: with control(s) selected, pick a color and click Apply Color.

## Good to know
- Build at Origin always places the new control at world origin; it ignores your viewport selection.
- Delete removes a shape's file permanently, with no undo.
- Mirror needs a recognized side token (L/R, left/right) in the name, and the opposite control must already exist.
- Combine deletes every source curve except the last one selected once it merges their shapes, so check your selection order first.
