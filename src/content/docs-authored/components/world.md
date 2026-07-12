---
title: World
summary: The rig's root control and joint, the first component every rig needs before anything else can attach.
category: component
---
# World
## What it does
World builds the single root joint and control that every other component ultimately attaches to. The control sits at the root but stays aligned to world space, even if the root joint itself is rotated, so its axes are always predictable.

## When to use it
Add World first, before anything else. It has no parent of its own, it's the anchor everything downstream traces back to. Use it exactly once per rig.

## Good to know
- Treat it as a singleton: the rig assumes exactly one World; a second instance would confuse anything that looks up the root control by name.
- It's never mirrored, there's no left/right version.
- Selecting "World" as a space elsewhere means a fixed reference pose, not this control's live animation. To follow the live control, target it directly.
