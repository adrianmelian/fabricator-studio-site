---
title: FKChain
summary: A variable-length, one-control-per-joint FK chain for spines, necks, tails, fingers, and capes; the multi-joint counterpart to SimpleFK.
category: component
---

# FKChain

## What it builds

One FK control per joint in the selected chain, parented in chain order (each control's offset buffer parents under the previous joint's control). For each joint, `build()` creates an `offset_null`/`connector_null` pair under `fab_nulls_grp`, a `<joint>_ctrl_offset` transform buffer, and a `<joint>_ctrl` Curve-O-Matic shape. Every joint is driven directly through a constraint chain: control to `connector_null` to joint (parent + scale constraints, maintain offset). There is no duplicated IK/FK/blend joint chain underneath; the bind joints themselves are driven.

Naming matches SimpleFK's convention (`<joint>_ctrl` / `<joint>_ctrl_offset`) on purpose (see the file's own header comment): pulling one joint out of an FKChain and re-adding it as a standalone SimpleFK keeps the same control names, so nothing downstream needs renaming.

## When to use it

The variable-length FK component: `min_joints=2`, `max_joints=-1` (unlimited). Reach for it on any run of two or more joints in a straight parent-child line that needs plain FK controls and no IK: spines, necks, tails, capes, fingers.

`can_apply` enforces the shape of the selection: it depth-sorts the picked joints against the blueprint's skeleton hierarchy and requires each joint to be the direct child of the previous one (`parent_map.get(sorted_joints[i]) != sorted_joints[i-1]` fails the check). A branching selection, a gap in the hierarchy, or fewer than 2 joints is rejected with a specific error naming the offending joint. For a single joint, use SimpleFK instead. For space switching or IK/FK matching on an FK-style control, that lives on AdvancedFK, not FKChain.

## Options

Pulled directly from `FK_CHAIN_CONTRACT.options_schema` in `modules/fk_chain.py`:

| Option | Default | What it does |
|---|---|---|
| `ctrl_shape` | `sphere` | Curve-O-Matic shape used for every control in the chain. Uniform across the whole chain: there is no per-joint shape option, though per-control hand edits are still possible in Edit Mode (see CV persistence below). |
| `ctrl_color` | `yellow` | Override color applied to every control in the chain (uniform). |
| `channels` | keyable: tx, ty, tz, rx, ry, rz | Channel-box setup applied to every control. Listed channels stay unlocked and keyable; every other transform channel is locked and hidden. |

## Plugs and spaces

- Input: `parent_in` (matrix, required), the parent transform space for the chain's first control. Resolved via `context.resolve_plug(instance.parent_plug)`; if the resolved node doesn't exist in the scene, the build falls back to `fab_controls_grp`.
- Outputs: `start_out` (matrix, `space_target=True`), world matrix of the first (top) control; `tip_out` (matrix, `space_target=True`), world matrix of the last (tip) control. Both are valid space providers for a downstream component's `parent_in`. Mid-chain controls are not exposed as plugs.
- `side_supported = True`. No `space_consumers` declared on this contract, so FKChain does not add a `space` enum attribute to any of its controls on its own.
- `joint_roles` declares only two named roles: `start` ("Top of chain, closest to parent") and `end` ("Bottom of chain (tip)"), used for the Properties panel's role labeling. Interior chain joints between the two ends are unlabeled.

## Animator features

- Marking menu (Ctrl+Alt+RMB): FKChain's contract declares no `actions`, so its controls only get the universal "Common" section shared by every KS-tagged control: Zero All, Zero Translates, Zero Rotations, Zero Scale. There is no dedicated per-component entry and no IK/FK match (there's no IK side to match to on this component).
- No space-switch enum on the chain's controls. See Plugs and spaces above.
- Selection sets: because the component type name `FKChain` contains "fk", every control in the chain lands in the rig's `all_fk_ctrls` set, plus the side set (`all_left_ctrls` / `all_right_ctrls` / `all_center_ctrls`) and, if the instance has a `region` set, `<region>[_l|_r]_all` and `<region>[_l|_r]_fk`.
- Mirroring: `mirror_rules` tags the `fk_ctrl` role with `negate={translateX, translateY, translateZ}`. Rotation values copy verbatim between a left/right pair (controls live in pre-mirrored joint frames); translation values flip sign. Same rule SimpleFK uses.
- CV persistence is per control, keyed by control name (`<joint>_ctrl`, not by shape name). An artist can hand-edit an individual control's curve in Edit Mode and that shape survives a rebuild independent of the chain-wide `ctrl_shape`/`ctrl_color` options above.

## Gotchas

- Direct-chain-only selection: `can_apply` rejects any joint that isn't the blueprint-hierarchy child of the joint before it. You can't skip a joint or hand the component two branches off one parent.
- The `reset_ctrl_shapes` build-time option blanks the CV data for the whole chain at once. Every hand-edited control shape in the chain reverts to the library default together, not selectively per control.
- `ctrl_shape`'s contract default is `sphere`, but the code path that reads it (`opts.get('ctrl_shape', 'circle')`) falls back to `circle` if the key is missing outright from an instance's options. That only surfaces on a blueprint that omits the key entirely (not one merely left at default), but it's worth knowing if a chain ever looks unexpectedly circle-shaped.
- If the resolved parent control is actually a joint (for example, the chain's `parent_plug` lands on a bind joint rather than another component's control output), the first control's offset buffer is not parented under that joint. It parents under `fab_controls_grp` instead and follows the joint via parent/scale constraint (`maintainOffset=True`), so it never pollutes the joint hierarchy or gets stranded when `unbuild` deletes `rig_grp`.
- Only the top and tip controls are exposed as output plugs (`start_out`, `tip_out`). A downstream component can't wire its `parent_in` to a mid-chain control without a manual scene-level connection outside the plug graph.
- `unbuild()` only deletes `parentConstraint`/`scaleConstraint` nodes that are direct children of each bind joint. Anything added outside that exact pattern won't get cleaned up before the `rig_grp` delete cascade runs (same caveat as SimpleFK).
- No IK option and no space switching on this component. If the situation needs either, use a different component (SimpleIK / IKLeg for IK, AdvancedFK for FK with space switching).
