---
title: Skeleton IO
summary: Save a joint hierarchy to portable JSON and rebuild it in any scene, with options to strip scale offsets and control how rotation splits between rotate and joint orient.
category: rigging
---

# Skeleton IO

## What it does
Skeleton IO exports the joint chain under a chosen root to a JSON file, then rebuilds that hierarchy later, in any scene. It captures each joint's position, orientation, rotate order, limits, and lock states, and rebuilds accurately regardless of the original rotate order. On import you can strip unwanted scale, and choose whether rotation folds into joint orient or stays split as it was.

## Quick start
1. Select the root joint of the hierarchy you want to save.
2. Open Skeleton IO from the Bridge toolbar's Skeleton popover, Maya's Skeleton menu, or the fsAnim shelf.
3. On Export, click Use Selected, confirm the output path, and click Export Skeleton.
4. To rebuild, switch to Import, browse to the JSON file, and click Import Skeleton. Leave the scale checkboxes on unless you have a reason to keep scale.

## Good to know
- Joint names must be unique within the hierarchy; duplicates aren't handled.
- Custom attribute values round-trip, but connections and driven keys on them do not.
- "Bake to joint orient" folds rotation into joint orient and zeroes rotate; leaving it off keeps the original split.
