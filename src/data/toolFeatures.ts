// src/data/toolFeatures.ts — Toolbox section copy (full per-tool feature list).
// SOURCE OF TRUTH: D:/Documents/MrMiata/brand/fabricatorstudio/fabricatorstudio_features.md
// Edit there first, then sync here. The "held off the public list" block in that file never ships.

export interface ToolFeatureBlock {
  name: string;
  blurb: string;
  features: string[];
  coming?: boolean;
}

export const toolFeatureBlocks: ToolFeatureBlock[] = [
  {
    name: 'Fabricator',
    blurb: 'The flagship. A template-driven modular rigging system: drag and drop components, build in three explicit phases (guides, skeleton, modules), and never lose work to a rebuild.',
    features: [
      'Template-driven builds: start from a blueprint, assemble components on the canvas, build the whole rig in one pass. Save Template snapshots your rig back to a reusable recipe.',
      'A production component set: FK chains with space switching, IK arms and legs, follow joints, spline FK, and flip-proof ribbon components with layered dynamics (sine, jiggle, volume). More landing regularly.',
      'Edit Rig round trip: unbuild, restructure, rebuild. Non-destructive and non-linear; rig edits can run while animation is already in production.',
      'Scene is truth: rig state lives in your Maya scene as network nodes joined by message connections, not name strings. Rename anything; nothing breaks.',
      'Animator features built in: IK/FK matching that holds the pose through the switch, space switching, a marking menu on every control, smart pole vector placement, rig-native selection sets.',
      'Mirror everything: joints, modules, and guide positions.',
      'Pre-build validation: structured, readable checks before anything builds.',
      'Engine-ready skeletons: UE5 joint conventions and a bind pose convention baked in.',
      'Extensible: components follow a documented authoring contract; write your own and the palette discovers it.',
    ],
  },
  {
    name: 'DevBot',
    blurb: 'The whole toolbox in one compact toolbar inside Maya.',
    features: [
      'Every tool two clicks away: the big tools and the everyday utilities in one dockable strip.',
      'Popover launchers keep it compact; no shelf sprawl, no menu hunting.',
      'Versioned builds, so "what version are you on" always has an answer.',
      'Connect Your AI lives here: start the bridge, check its status, and copy the setup snippet for your AI client.',
    ],
  },
  {
    name: 'Skeleton IO',
    blurb: 'Save and load joint hierarchies as portable JSON.',
    features: [
      'World-matrix accurate: handles any rotate order.',
      'Rebuild a skeleton on a new mesh or in a new scene in seconds.',
      'UE5 orientation convention: rotation lives in rotate, zero joint orient.',
    ],
  },
  {
    name: 'Skin IO',
    blurb: 'Skin weights as portable JSON.',
    features: [
      'Direct mode for identical topology; Transfer mode rebuilds weights onto changed topology.',
      'Single and multi-mesh save and load.',
      'A model update becomes routine, not an emergency.',
    ],
  },
  {
    name: 'Pose Library',
    blurb: 'Full-rig poses with thumbnails, portable across every rig built with Fabricator.',
    features: [
      'Save and load full-rig poses; frame your own thumbnails in an embedded viewport.',
      'Cross-rig portable: poses address controls by component identity, not node names. Save on one character, load on another.',
      'Search and user-authored sets keep big libraries usable.',
      'Selection sets mask a pose down to just the parts you choose.',
      'Coming: load mirrored and mirror in place.',
    ],
  },
  {
    name: 'Anim Library',
    blurb: 'Animation clips with the same cross-rig portability as poses.',
    features: [
      'Save and load clips across rigs built with Fabricator.',
      'Selection-set masking applies a clip to just the controls you choose.',
      'Library locations resolve per project, so a team shares one place.',
    ],
  },
  {
    name: 'Rig & Animation Exporter',
    blurb: 'FBX into Unreal without the folklore.',
    features: [
      'One-hotkey static and skeletal mesh export; a multi-entry export list remembered per scene.',
      'Batch animation export: every clip in one click, in a clean headless Maya session that cannot corrupt your working file.',
      'Bakes with references and constraints intact, strips the control rig, ships joints only.',
      'The rig tells the exporter what to ship: a per-rig binding contract records the export joints and what to strip. A missing contract blocks the export instead of shipping something wrong.',
      'Project setup enforces consistent, auto-created export paths and FBX presets.',
    ],
  },
  {
    name: 'Curve-O-Matic',
    blurb: 'A control curve library.',
    features: [
      '19 shapes shipped; save your own to the library.',
      'Multi-shape curves handled correctly, so complex controls swap cleanly.',
      'Consistent control shapes across every rig you build.',
    ],
  },
  {
    name: 'Joint Aimer',
    blurb: 'Aimer-driven joint orientation.',
    features: [
      'Place aimers, aim joints, commit: orientation you can see before you bake it.',
      'Pure dependency-graph implementation: no script jobs, nothing left running in your scene.',
      'UE5-convention output.',
    ],
  },
  {
    name: 'Smart Joint Mirror',
    blurb: 'Live joint mirroring across the YZ plane.',
    features: [
      'Mirrors position and orientation live while you edit one side.',
      'Permanent disconnect re-stamps values so the mirrored chain never collapses.',
    ],
  },
  {
    name: 'ksRenamer',
    blurb: 'Batch renaming, four ways.',
    features: [
      'Hash renaming with numbered placeholders.',
      'Find and replace, prefix and suffix, renumber.',
      'One tabbed window for all of it.',
    ],
  },
  {
    name: 'Skinning Utilities',
    blurb: 'The everyday skinning kit.',
    features: [
      'skinSmoosh: neighbor-average weight smoothing as a native Maya command with full undo. Pure Python, nothing to compile.',
      'Weight clipboard: copy weights from one vertex, paste anywhere.',
      'Average weights across a selection; combine skinned meshes without losing weights; influence cleanup.',
    ],
  },
  {
    name: 'Scene Cleanup',
    blurb: 'Validation checks shared with the rigging pipeline.',
    features: [
      'Duplicate short names, duplicate transforms, and mesh artifact checks.',
      'The same checks Fabricator runs before a build, callable on any scene.',
    ],
  },
  {
    name: 'Connect Your AI',
    blurb: 'A technical artist in your toolset. Connect your own AI and it can see your scene, your rig, and the last build that failed. It proposes the fix; if the fix fails, it files the bug. Read-only, enforced in code: your scene can never be touched.',
    features: [
      'Ships as a skill: it teaches your AI the Fabricator playbook. Troubleshoot from scene evidence first, propose the documented fix, never mutate, and file a clean bug report only when a real bug remains.',
      'Bring your own AI: Claude Code, Claude Desktop, Cursor, any MCP client. Your model, your key, your machine.',
      'Fabricator-aware: rig status, the component graph, build checks, the last build report, a viewport screenshot.',
      'Propose first, file second: it troubleshoots from the shipped docs before it is allowed to file a bug.',
      'Pre-filled bug reports with repro, versions, and diagnostics. You click submit; nothing auto-posts.',
      'READ-ONLY: your AI can see, never touch. Zero write operations in the bridge, auditable in the source.',
      'Open source, transparent, verifiable code.',
      'No telemetry, no bundled model, localhost only, off by default.',
    ],
  },
];
