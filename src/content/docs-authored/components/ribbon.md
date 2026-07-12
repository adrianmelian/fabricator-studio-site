---
title: Ribbon
summary: A cascading FK chain riding a NURBS ribbon surface, with a twist, sine, jiggle, and volume dial board, for tails, tentacles, and other bendy body parts.
category: component
---
# Ribbon

## What it does
Ribbon rides a chain of control joints along a lofted surface instead of a single curve, so orientation stays flip-proof by construction. Each control joint gets a cascading FK control with a free child offset control, plus a settings control carrying a dial board for twist, sine, jiggle, and volume, layered on top of the FK posing.

## When to use it
Pick Ribbon over SplineFK when the part needs that layered secondary motion, twist, sine, jiggle, volume, on top of straight FK control. Good for tails, tentacles, ears, trunks, and other organic, tapered parts too bendy for a fixed IK/FK limb.

## Good to know
- Control count and ribbon width can be set manually or left on auto; count floors at 4.
- Dial board values persist through an Edit Rig round trip.
- FK only: no IK/FK match or space switching, though start and tip are available for other components to parent into.
- Every FK control has its own free offset control for tweaks that don't cascade down the chain.
