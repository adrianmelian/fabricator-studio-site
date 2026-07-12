---
title: SimpleIK
summary: A three-joint IK/FK chain with a pole vector and pin, the base building block for any bending limb.
category: component
---
# SimpleIK
## What it does
SimpleIK takes a 3-joint chain, shoulder-elbow-wrist or hip-knee-ankle, and gives it FK and IK control with a switch to blend between them. You get an FK control per joint, an IK control at the end joint, a pole vector control for the elbow's bend direction, and a switch control carrying the blend slider.

## When to use it
Use SimpleIK for any generic 3-joint bending limb that needs an IK/FK switch and pole vector, without limb-specific extras. It's also the foundation IK Arm and IK Leg build on, so use one of those instead when you need a clavicle or a foot.

## Good to know
- Stretchy is optional: the chain can extend past rest length in IK mode (stretch only, no squash).
- The pole vector control has a `pin` slider that locks the elbow exactly under it.
- Match to IK / Match to FK hold the pose through the switch; plain Switch can pop.
- The 3 joints must be one unbroken parent chain, no branching.
