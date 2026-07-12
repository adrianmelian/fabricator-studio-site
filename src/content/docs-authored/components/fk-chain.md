---
title: FKChain
summary: One FK control per joint down a chain of two or more, for spines, necks, tails, fingers, and capes.
category: component
---
# FKChain
## What it does
FKChain gives every joint in a selected run its own control, each parented under the joint before it, so posing the chain top to bottom feels natural. There's no IK underneath, each bind joint is driven straight from its own control.

## When to use it
Use it for any run of two or more joints in a straight parent-child line that just needs FK: spines, necks, tails, fingers, capes. For a single joint, use SimpleFK instead. If you need space switching or IK/FK matching, that lives on AdvancedFK, not this component.

## Good to know
- The joints must form one unbroken parent chain, no branches or skipped joints.
- Every control shares the same shape and color option; individual controls can still be hand-edited afterward, and that edit survives a rebuild.
- Only the top and tip controls are exposed for another component to attach to, not the joints in between.
