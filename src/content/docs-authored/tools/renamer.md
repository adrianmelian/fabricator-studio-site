---
title: Renamer
summary: Batch-rename a Maya selection with hash numbering, search/replace, prefix/suffix, or renumber, all in one undo step.
category: framework
---

# Renamer

## What it does
Renamer batch-renames the current selection with one of several operations: hash-pattern renaming (`joint_##` becomes `joint_01`, `joint_02`...), search/replace, prefix/suffix, and renumber. Every operation runs in one undo chunk, so a batch reverts with one Ctrl+Z. It ships as a full window with all four operations, plus a compact Bridge toolbar widget.

## Quick start
1. Select the objects to rename (numbering follows selection order, not the Outliner).
2. Open it from **FabricatorStudio > Scene & Selection > Renamer**, or the **REN** widget on the Bridge toolbar.
3. Fill in the fields for your chosen mode and click Rename (or press Enter).
4. Check the result in the viewport, or expand the window's LOG section for a report.

## Good to know
- The toolbar's Prefix/Suffix mode only adds text. To remove one, use Search/Replace instead, with the text to strip in Find and Replace left empty.
- The toolbar has no Renumber mode; use the window instead. It has Select by Name, a wildcard select, not a rename.
- None of the four operations check for name collisions. If a name already exists, Maya's automatic uniquify suffix shows up, not an error.
