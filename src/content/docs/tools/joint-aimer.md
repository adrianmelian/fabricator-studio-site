---
title: Joint Aimer
summary: Preview each joint's orientation with an auto-aiming, always manually-rotatable XYZ aimer, then bake it into clean, engine-ready joint rotations with one click.
category: rigging
---

# Joint Aimer

## What it does
Joint Aimer puts a visible XYZ arrow on each joint so you can preview its orientation before committing. Point each aimer at the next joint, or dial in a custom twist. Then click **Orient All Joints** to bake it into clean rotation. It's the tool for orienting hand-built or imported skeletons. Inside Fabricator it runs automatically when building an Animation Rig from the Armature Rig.

## Aim Target
Every Aimer Control has an **Aim Target** attribute in the channel box. Each aimer automatically offers World, Local, Parent, and every child joint. Pick a child joint to aim down the chain, or World / Local / Parent for a fixed reference.

## Where
Toggle **Aimers** in the top toolbar of the Fabricator window to show or hide the XYZ arrows across the whole skeleton while you work.

## Quick start
1. Aimers are automatically built into the Armature System, no setup needed.
2. Set each aimer's **Aim Target**: World, Local, Parent, or any child joint.
3. Run **Aim Joints at Aimers** to aim on the fly, or just build your rig and joints aim at the aimers automatically.
4. Click **Orient All Joints** to bake into clean, engine-ready rotations.

## Good to know
- A fresh aimer points at nothing until you set a target, so orienting untouched aimers just re-bakes the current orientation.
- Joints need unique names, or an aimer can wire to the wrong one.
- **Mirror Selected Aimers** copies an aimer to the opposite side using the standard side tokens (`l`/`r`, `left`/`right`).
