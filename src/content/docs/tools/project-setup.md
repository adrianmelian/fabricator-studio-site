---
title: Project Setup
summary: Creates and manages your project configs. Author session and export settings from engine templates with live validation; your machine's folder locations bind separately, so teams stay in sync across different drives.
category: framework
---

# Project Setup

## What it does
Project Setup (window title: Mindmeld) authors the settings every project runs on: session settings (units, frame rate, playback range) and export settings (which folders hold which asset types, naming prefixes, FBX presets). Save once, and the exporters, libraries, and your Maya session all read from that same source of truth.

New in this release: a project config is fully shareable. It carries no machine-specific paths. Where the project lives on each computer (your Source Art Root and Content Root) is a separate per-machine binding, so teammates on different drive letters share one config without stepping on each other.

## Quick start
1. Open Project Setup from the FabricatorStudio toolbar or menu.
2. Click New, pick an engine template (Unreal5 is vetted; Unity and Godot are experimental; Generic starts empty), and name your project.
3. Browse to your Source Art Root (where this machine keeps the working files) and Content Root (where exports land, like your engine's content folder).
4. Fill in Asset Classes and watch the validation panel; Save stays disabled while an error is listed.
5. Save, optionally check off which folders to create on disk, then select the project and Apply & Activate to apply it to your current session.

## Good to know
- Two roots replaced the old single Project Root. Older projects keep working untouched: the old root fills in both automatically, and the config upgrades on your first save. Exports resolve identically before and after.
- Your roots are yours. A teammate opening the same project binds their own paths; nothing you save forces your drive letters on anyone.
- The quickest way to bind a machine without touching the project config at all is the Settings tool (left-click the toolbar gear). Handy when the shared config folder is read-only.
- A project's engine template locks once created. To switch, Duplicate under a new template, then delete the old one.
- Renaming a project so its folder would change is blocked; Duplicate under the new name instead.
- Apply & Activate doesn't change which project a scene exports to. That's always based on file path.
- Studio setup (one shared configs folder for the whole team) is supported: point Shared Configs Root at it in Settings, and contact FabricatorStudio for team setup help.
