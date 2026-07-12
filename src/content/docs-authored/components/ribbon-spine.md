---
title: RibbonSpine
summary: A COG-driven spine with hip and chest end controls, floating mid controls, and a falloff-skinned ribbon for free twist distribution plus twist, sine, jiggle, and volume dials.
category: component
---
# RibbonSpine

## What it does
RibbonSpine builds a whole-body COG control with a hip and a chest control underneath, plus floating mid controls that auto-follow both ends. Those drive a ribbon surface with a soft falloff skin rather than one control per row, giving the spine its smooth hip-to-chest twist, plus a dial board on the COG for twist, sine, jiggle, and volume.

## When to use it
Use it for a spine, or any 3+ joint chain treated as one, when you want a whole-body mover, organic secondary motion, and non-uniform twist between two ends, without placing an FK control per joint. Hip and chest outputs give arms, neck, or legs a stable space to parent into.

## Good to know
- Center-line only: doesn't mirror, no per-side version.
- Mid control count (1 to 8) is a build option, change it in Edit Mode and rebuild.
- Dial board values persist through an Edit Rig round trip.
- Hip and chest rotation locks to its end control instead of the ribbon directly, so anything parented there doesn't pick up drift.
