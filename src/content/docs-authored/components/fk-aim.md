---
title: FKAim
summary: A single joint that rotates to face a separate, draggable aim control, built for eyes and anything else that needs to look at a target.
category: component
---
# FKAim
## What it does
FKAim gives one joint a control plus a second "aim" control placed out in front of it. The joint's rotation follows an aim constraint pointed at that second control, so dragging the aim control turns the joint toward it instead of rotating it directly.

## When to use it
It's built as the eye-rig block: two FKAim instances sharing a `link_group` get a shared look-at control so both eyes converge on one point. It also works alone for anything that should face a draggable target rather than being rotated by hand, like a turret or a camera prop.

## Good to know
- `aim_distance` and `aim_axis` set how far in front of the joint the aim control sits and which axis points at the target.
- Leave `link_group` empty for a single, independent aim target; only set it when two or more instances should share one control.
- The target joint has to already exist in the scene when you build.
