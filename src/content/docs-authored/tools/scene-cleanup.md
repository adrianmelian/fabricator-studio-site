---
title: Scene Cleanup
summary: Flags duplicate short names and mesh artifacts like non-manifold and lamina faces across a scene, and can auto-fix the mesh issues, the same checks Fabricator runs before every build.
category: framework
---

# Scene Cleanup

## What it does
Scene Cleanup checks a scene for two problems: transforms sharing a duplicate short name, and mesh artifacts such as non-manifold edges and lamina faces. It can auto-fix the mesh issues in one pass. Fabricator runs both checks before every build, and Connect Your AI can request them as a read-only scene report.

## Quick start
1. Find the Scene Cleanup button on the fsModel or fsAnim shelf.
2. Select mesh(es), right-click the button, and choose "Select Mesh Artifacts" to find problems (press F to frame them).
3. With the same mesh(es) selected, right-click again and choose "Fix Mesh Artifacts" to repair them in one undoable pass.
4. Duplicate names are checked automatically whenever you build a rig in Fabricator.

## Good to know
- Left-clicking the shelf button does nothing yet; the working commands both live in the right-click menu.
- Fix Mesh Artifacts is destructive: it rewrites topology and deletes construction history, with no dry run beyond running Select first.
- Select Mesh Artifacts replaces your current selection with the flagged components and doesn't restore your prior selection.
- There's no dedicated window for this yet; a fuller UI is planned.
