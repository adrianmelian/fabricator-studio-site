---
title: Rig & Animation Exporter
summary: Exports static and skeletal meshes and batches of animation clips from Maya to Unreal, using a per-rig binding so exports always ship the right joints.
category: export
---

# Rig & Animation Exporter

## What it does
Exports static and skeletal meshes to Unreal, plus batches of animation clips, through one FBX pipeline. Skeletal export writes a rig binding the animation exporter reads later, so it knows exactly which joints to bake. Animation clips bake in a background process, so it never touches your open scene.

## Quick start
1. Save the scene under a registered project, or set an output folder manually.
2. Select mesh(es) for a static export, or a joint plus skinned mesh(es) for skeletal, then press Alt+Shift+E to export.
3. For a repeatable list, open the Export popover, add entries, then Export Checked, Selected, or All.
4. For animation, set the playback range, open the Anim tab, add a clip from range, assign the rig, then export. You'll be asked to save first, since the bake reads the saved file.

## Good to know
- Animation export reads the rig's last skeletal binding; re-run skeletal export if it's missing or stale.
- Root motion isn't wired into the UI yet; animate the world control by hand.
- Two clips sharing an output filename block export rather than overwrite each other.
