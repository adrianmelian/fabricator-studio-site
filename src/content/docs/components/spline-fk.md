---
title: SplineFK
summary: Rides a variable-length bind chain along a skinned NURBS curve with cascading FK controls and free offset ctrls per CV; no ikSpline solver, pure DG.
category: component
---

# SplineFK

## What it builds
SplineFK fits a degree-3 NURBS curve through the bind joints and rebuilds it to a fixed CV count, then rides the bind joints along that curve with pure dependency-graph nodes (pointOnCurveInfo for position, an aimConstraint against a second skinned "up" curve for orientation). There is no ikSpline solver and no ribbon surface. One control-joint per curve CV skins the main curve and the up curve; each control-joint is posed by a cascading FK control (a cube, chain-parented under the previous one) that carries its own free child "offset" control (a sphere) for hand-keyed secondary motion. Because the bind joints are placed by arc-length parameter along the curve, moving the FK controls stretches or compresses the curve and the bind chain follows: stretch is inherent, not a switch.

## When to use it
Use it for long, continuous chains where you want cascading FK posing plus per-control secondary offset motion without paying for a full ikSpline handle or a ribbon deformer: tails, tentacles, capes, loose neck/spine runs, anything that reads as a curve rather than a small joint count. The contract accepts any chain from 2 joints up (`min_joints=2`, `max_joints=-1`), and `side_supported=True` with mirror rules defined, so it can sit on a mirrored L/R chain.

## Options
| Option | Default | What it does |
|---|---|---|
| `control_count` | `0` | Number of FK controls / curve CVs. `0` means one per bind joint. Always clamped to at least 4 at build time, because a degree-3 curve needs a minimum of 4 CVs - short chains still get 4 controls, so control count won't map 1:1 to joint count below that floor. |
| `ctrl_shape` | `cube` | Shape for the main FK controls (uniform across the whole chain). Cube so the main ctrl reads clearly around the sphere offset ctrl. |
| `offset_ctrl_shape` | `sphere` | Shape for the per-control child offset controls. |
| `ctrl_color` | `yellow` | Override color applied to both the FK ctrl and its offset ctrl. |
| `channels` | `{'keyable': ['tx','ty','tz','rx','ry','rz']}` | Channel-box whitelist applied to the main FK ctrl only (not the offset ctrl). Scale is not in the default list, so `sx/sy/sz` come in locked and hidden on the FK ctrl by default. |

## Plugs and spaces
- Input: `parent_in` (matrix, required) - the parent transform space the whole chain builds under. Declared `parent_strategy: walk_up`.
- Outputs: `start_out` (matrix, marked as a space target) - world matrix of the chain-start FK ctrl; `tip_out` (matrix, marked as a space target) - world matrix of the chain-tip FK ctrl. Both are eligible parent-space anchors other components can wire into via their own `parent_in`.
- Joint roles: `start` ("top of chain, closest to parent") and `end` ("bottom of chain, tip") - these label the first and last entries of the component's own `joints[]` list, not a separate control.
- SplineFK does not declare any `space_consumers` of its own: its FK/offset controls do not get a `space` enum switch attribute. It only offers `start_out`/`tip_out` outward as space providers for other components.

## Animator features
- No component-specific marking-menu actions are declared on this contract, and no IK/FK match - there is no paired IK mode; SplineFK is FK-only end to end.
- Every tagged control still gets the studio-wide "Common" marking-menu section (Ctrl+Alt+RMB): Zero All / Zero Translates / Zero Rotations / Zero Scale. That comes from the generic ctrl tagging, not from anything SplineFK-specific.
- Mirror: `mirror_rules` are defined for both the main FK ctrl role and the offset ctrl role, negating `translateX/Y/Z` on an L↔R pose mirror swap (rotations copy verbatim - consistent with FK ctrls living in pre-mirrored joint frames).
- Selection sets: because the component's type name contains "FK", its controls are automatically swept into the rig's baked `all_fk_ctrls` set (and the region-scoped `<region>_fk` set, if the instance has a region) alongside every other FK-flavored component, plus the side-based `all_left_ctrls` / `all_right_ctrls` / `all_center_ctrls` sets. This is automatic, not something the component authors.

## Gotchas
- `control_count` is silently clamped to a 4 minimum (degree-3 curve requirement). Requesting 1–3 still produces 4 controls.
- The `channels` option only governs the main FK ctrl; the child offset ctrl is never passed through `_apply_channels` and keeps its own default channel state regardless of what `channels` is set to.
- There is no exposed stretch, volume, or twist-distribution control. Because bind joints ride the curve by arc-length parameter, reshaping the curve (posing the FK controls) always stretches the chain - there's no lock to disable that.
- The curve skinning (`maximumInfluences=2`, `dropoffRate=2` on both the main curve and the up curve) is fixed in code, not exposed as an option. If a build needs broader or tighter blending between adjacent controls, that has to be a manual post-build skin edit, and it will not survive an Edit Rig round trip (unbuild deletes the skin clusters and rebuild recreates them at the fixed settings).
- Unbuild only captures the keyable/locked channel state from the first FK ctrl in the chain (index 0) as the persisted `channels` block for the whole component - per-ctrl channel-box customization on any control past the first is not independently preserved across an unbuild/rebuild.
- Duplicating the main curve to build the "up" curve is a known trap class in this codebase (`cmds.duplicate`/`createNode` can silently propagate `.message` connections into another node's multi-connections); the module works around it explicitly, but it's a reminder that hand-duplicating rig curves near a SplineFK setup can leak message wiring if the same guard isn't applied.
