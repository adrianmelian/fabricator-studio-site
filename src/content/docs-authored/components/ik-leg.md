---
title: IKLeg
summary: A four-joint IK/FK leg with a reverse foot rig, heel and toe pivots, and a foot roll slider.
category: component
---
# IKLeg
## What it does
IKLeg builds on SimpleIK's hip-knee-ankle chain and adds a fourth ball joint plus a full reverse-foot rig. You get everything SimpleIK gives a limb (FK controls, IK/FK switch, pole vector), plus a floor-level foot control, separate heel and toe controls, and a `foot_roll` slider that lifts the heel and rolls onto the toe while keeping the ball and toe planted.

## When to use it
Use it on any hip-knee-ankle-ball chain that needs to plant on the ground, like a game character's leg. For a limb with no foot (an arm, a tail), use SimpleIK directly instead, the reverse-foot stack has nothing to attach to without a ball joint.

## Good to know
- `foot_roll_axis` depends on your skeleton's orientation convention; the wrong axis rolls or yaws instead of lifting the heel.
- The toe-wiggle ball control stays visible and posable in both IK and FK mode.
- Heel and toe guide positions need to be genuinely separate points, not stacked on top of each other.
