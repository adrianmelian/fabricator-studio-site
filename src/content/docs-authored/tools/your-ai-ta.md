---
title: Your AI TA
summary: A read-only AI technical artist that lives in Maya, sees your scene and your Fabricator rig, and hands you paste-ready fixes. Use the built-in assistant, or connect your own AI client.
category: framework
---

# Your AI TA

## What
FabricatorStudio ships with an AI technical artist that can actually read your open Maya scene and the Fabricator rig in it. Ask it why a build failed, where a rig went weird, or how a tool works, and it answers from real scene facts instead of guessing, then hands you a script to paste and run yourself.

It comes two ways, over the same read-only bridge:

- **Reggie** is the assistant built into the DevBot toolbar. He is docked and ready in the AI.TA panel, no setup.
- **Connect Your AI** points your own client (Claude Code, Claude Desktop, Cursor, or any MCP client) at the same bridge, so you bring your own model and key.

Either way it is read-only by construction: it can see everything and touch nothing. When something needs changing it gives you the fix to run, so every edit to your scene stays in your hands. Your model, your key, your machine.

## Why
Reach for your AI TA when:

- A Build Rig or Unbuild failed and you want to know why, in plain language.
- Something in the rig looks wrong and you want a second pair of eyes that can actually read the node graph.
- You forgot how a tool or Fabricator component works and want the answer without leaving Maya.
- An export is behaving oddly and you want to diagnose it before you get to Skeleton IO, Skin IO, or the exporters.

It reads scene summaries, build reports, component details, and node state through a read-only operation registry, so it grounds every answer in what is really in your file.

## How
Reggie needs no setup: open the DevBot toolbar and use the AI.TA panel.

To connect your own client, use **Connect AI** under Settings on the toolbar strip. It starts a small local bridge that listens on loopback only (`127.0.0.1`, default port 6292) and never talks to any server but the one on your own machine.

1. In Maya, open the DevBot toolbar's Settings zone and click **Connect AI** to open its popover.
2. Click **Start**. The status pill switches from `[ STOPPED ]` to `[ LISTENING ON <port> ]`.
3. Pick your client from the **Client** dropdown (claude-code, claude-desktop, cursor) and click **Copy** to grab that client's config snippet.
4. Set up your client: for Claude Code, run the copied command (`claude mcp add fabricator -- uvx fabricator-mcp`); for Claude Desktop or Cursor, paste the copied `mcpServers` block into that client's own MCP config file.
5. In your AI client, ask it to check your Fabricator rig's status. If it answers with real details about your open scene, the connection is working.

Your client reaches the bridge through a small package, `fabricator-mcp` (installed and run via `uvx`), which relays each read-only call to the bridge over a local connection.

## How it works
- Your AI is instructed to gather evidence before proposing anything: scene and rig status, pre-build checks, the last build report, the scene report, a viewport screenshot if the problem is visual.
- It then proposes the smallest documented fix, delivered one of two ways only: a plain `maya.cmds` script for you to paste into the Script Editor and run yourself, or a pointer to a button that already exists in Fabricator's UI (Build Issues dialog, Build Rig, Edit Rig). It is instructed never to claim it performed a change itself.
- On a build or unbuild failure, it is told to have you press Ctrl+Z once (each is one undo chunk) before it scans anything, so it diagnoses the pre-failure state rather than the wreckage.
- Only after a real fix attempt has failed does it offer to file a bug: it hands back a pre-filled GitHub issue URL with diagnostics attached, which you review and submit yourself under your own account. Nothing is auto-posted.

## Gotchas
- The bridge is off by default and stays off across Maya restarts unless **Start with Maya** is checked. If your AI can't reach Maya, the bridge most likely just isn't started yet.
- No authentication, loopback only: any process on your machine can connect to the bridge while it's running. That is a stated trust boundary (the same posture other local DCC bridges use), worth knowing if you leave it running on a shared machine.
- Reading a node's attributes forces Maya to evaluate its dependency graph up to that attribute. In a scene containing a malicious expression or plug-in node, that evaluation can run arbitrary code. This is inherent to opening and touching such a scene at all; the bridge doesn't widen the risk, but only connect it to scenes you trust.
- The viewport screenshot writes one throwaway PNG to your OS temp directory and deletes it after reading the bytes back. It only works in an interactive session, not batch or standalone Maya.
- A burst of many requests is capped so a heavy session doesn't stall Maya's main thread; anything past the cap waits for the next tick rather than failing.

## Troubleshooting
**"Maya isn't listening..."** The bridge isn't started, or it's listening on a different port than your client is configured for. Open the DevBot toolbar's Connect AI popover and click Start; if you changed the port, pass `--port <n>` on both sides.

**Status pill reads `[ ERROR ]`.** Hover it: the tooltip carries the actual failure text (for example, the port is already in use). Click Stop, then Start again, or set a different port.

**Every tool call fails with "unknown_op" or "Protocol mismatch".** Your `fabricator-mcp` package and the running Maya-side bridge have drifted. Update whichever side is behind, so both agree on the same set of operations.

**A tool call comes back "maya_busy".** Maya's main thread didn't answer within its reply window, usually because a long-running operation or an open modal dialog is blocking it. Let Maya go idle, then try again.

**"No viewport in batch/standalone mode."** Maya is running headless; there's no viewport to capture. The screenshot tool only works in an interactive session.

**Rig tools return "not_found" or "no build report."** There's no Fabricator rig built in the current scene yet, or no build has run this session. Load or build a rig first, then ask again.
