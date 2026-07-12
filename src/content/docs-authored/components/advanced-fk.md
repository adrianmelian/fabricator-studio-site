---
title: AdvancedFK
summary: A single control anchored in world space, with a switchable space attribute so it can follow its parent joint, world, or any joint you add.
category: component
---
# AdvancedFK

## What it does
AdvancedFK builds one control for one joint, much like SimpleFK, but instead of parenting under an ancestor control it sits in world space and carries a switchable **space** attribute. Pick a target in Properties (its skeleton parent, world, or any joint you add) and the control follows that space.

## When to use it
Use it for anything that changes parent mid-shot: a prop that starts in a hand and ends on a table, a weapon, an accessory that hops between joints. If the control only ever needs one parent, use SimpleFK instead, it's the plainer, cheaper choice.

## Good to know
- The marking menu adds a Match to Space and a Switch to space entry per target you've added, on top of the usual Zero All / Zero Translates set.
- One joint per instance; selecting zero or several fails before the component can be added.
- The control's name comes from the joint's short name, so two joints sharing a short name collide on control naming.
