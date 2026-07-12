---
title: Joint Aimer
summary: Preview each joint's orientation with a rotatable XYZ aimer, then bake it into clean, engine-ready rotation with one click.
category: rigging
---

# Joint Aimer

## What it does
Joint Aimer puts a visible XYZ arrow on each joint so you can preview its orientation before committing. Point each aimer at the next joint, or dial in a custom twist, then click **Orient All Joints** to bake it into clean rotation, ready for Unreal. It is the tool for orienting hand-built or imported skeletons; inside Fabricator this runs automatically.

## Quick start
1. Select the root joint of your chain.
2. Open Joint Aimer and click **Create Aimers - From Root**.
3. Select an aimer, and in the Channel Box set its `aimTarget` to the child joint it should point at. Rotate the aimer for any extra twist.
4. Repeat for any joint that needs a custom target.
5. Click **Orient All Joints** to bake and clean up.

## Good to know
- A fresh aimer points at nothing until you set a target, so orienting untouched aimers just re-bakes the current orientation.
- Joints need unique names, or an aimer can wire to the wrong one.
- **Mirror Selected Aimers** copies an aimer to the opposite side using the standard side tokens (`l`/`r`, `left`/`right`).
