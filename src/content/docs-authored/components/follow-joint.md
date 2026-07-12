---
title: FollowJoint
summary: Constrains one joint to follow another joint's position and rotation, with per-axis and per-channel weight control.
category: component
---
# FollowJoint

## What it does
FollowJoint builds no control. It point- and orient-constrains one joint to a source joint you pick in Properties, with independent per-axis skip and weight sliders for translate and rotate. It's a plumbing component: useful wherever a joint just needs to track another one.

## When to use it
- UE5 engine reference joints (`ik_foot_*`, `ik_hand_*`, `ik_hand_gun`) that need to follow their rig counterparts for export.
- Helper joints, prop attachers, or any joint that should track another without a control.
- As a placeholder in a template: leave the follow target empty and set it later, a supported no-op.

## Good to know
- Leaving the follow target empty is silent, the joint doesn't move, no warning printed.
- A follow target that doesn't exist in the scene fails the build.
- Dropping either weight to 0, or turning off all axes on one side, skips building that constraint, so re-enabling it later needs a rebuild.
- Not mirrorable, and it never joins the FK/IK selection sets, since it has no control.
