---
title: Project Setup
summary: Sets up the per-project settings every exporter, library, and Maya session reads from, with live validation and optional folder scaffolding instead of hand-edited JSON.
category: framework
---

# Project Setup

## What it does
Project Setup (window title: Mindmeld) authors the two settings files every project runs on: session settings (units, frame rate, playback range) and export settings (output folders, prefixes, FBX presets). Save once, and the exporters, libraries, and your Maya session all read from that same source.

## Quick start
1. Open Project Setup from the FabricatorStudio menu or the fsModel shelf.
2. Click New, pick an engine template (Unreal5 is vetted; Unity and Godot are experimental; Generic starts empty), and name your project.
3. Set your Project Root, fill in Asset Classes, and watch the validation panel; Save stays disabled while an error is listed.
4. Save, then optionally check off which folders to create on disk.
5. Select the project and click Apply & Activate to apply its settings to your current session.

## Good to know
- A project's engine template locks once created. To switch, Duplicate under a new template, then delete the old one.
- Renaming a project so its folder would change is blocked; Duplicate under the new name instead.
- Apply & Activate doesn't change which project a scene exports to. That's always based on file path.
