---
title: SimpleFK
summary: A single FK control on one joint, the basic block for anything posable that doesn't need a chain or IK.
category: component
---
# SimpleFK
## What it does
SimpleFK builds one control for one joint, parented under whatever it's attached to, driving that joint directly. Nothing fancier underneath: no duplicate chains, no blending.

## When to use it
Reach for it on a single joint that just needs a plain, posable control: a clavicle, a jaw, an individual finger or spine joint you aren't chaining. Need space switching or IK/FK matching? That's AdvancedFK, not this one.

## Good to know
- Exactly one joint per instance; selecting zero or more than one won't build.
- Hand-edited control shapes persist through a rebuild, keyed to the control's shape option.
- If the parent turns out to be a joint rather than a control, SimpleFK attaches safely instead of nesting into the skeleton.
