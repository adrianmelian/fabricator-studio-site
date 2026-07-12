---
title: SplineFK
summary: Rides a joint chain along a skinned curve with cascading FK controls and a free offset control per joint, for long, bendy chains without an IK spline handle.
category: component
---
# SplineFK

## What it does
SplineFK fits a curve through the chain and rides the bind joints along it, posed by a cascading run of FK controls, one per curve point, each parented to the one before it. Every FK control carries its own free child offset control for hand-keyed secondary motion. Moving the chain stretches or compresses it along the curve; stretch is built in, not a switch.

## When to use it
Reach for it on long, continuous chains that read as a curve rather than a small joint count: tails, tentacles, capes, a loose neck or spine run. It gives cascading FK posing plus per-control secondary offsets without the cost of an IK spline handle or a full Ribbon build.

## Good to know
- Works on any chain of 2+ joints; control count floors at 4 regardless of chain length.
- FK only, no IK counterpart, no space switching on its controls.
- No exposed stretch or volume control: reshaping the curve always stretches the chain.
- Mirrors cleanly across a left/right pair.
