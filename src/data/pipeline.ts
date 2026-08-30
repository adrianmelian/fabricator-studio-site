// The four pipeline sections: one source of truth for both renderers.
//
// These names are drawn TWICE by two different machines (2026-08-29): as glyphs inside the
// WebGL scene, where they stand in world space above the pipe, and as DOM text on phones,
// where the pipe runs off both edges of the screen and a world-anchored label would sit
// past x -1561. Two copies of the strings would have drifted the first time one was
// reworded, and the drift would have shown as the scene and the page disagreeing.
//
// DRAFT COPY: the four bodies are placeholders for Adrian's pass; the four titles are his
// ruled names.
export const PIPELINE_SECTIONS = [
  {
    label: 'Workflow Automation',
    body: 'The chores leave the pipeline: batch exports, naming, scene hygiene and publish steps run themselves, so artists never babysit a process.',
  },
  {
    label: 'Project Integration',
    body: 'The tools bend to your project, not the other way around: naming conventions, folder structure and engine targets are read and respected.',
  },
  {
    label: 'Rigging & Animation',
    body: 'Fabricator and Armature carry a model from mesh to animation-ready: generative skeletons, machine-learned skinning, artist-grade controls.',
  },
  {
    label: 'Unhindered Iteration',
    body: 'Change the design at any point and rebuild in minutes. Nothing is locked and nothing is precious: iteration is the whole point.',
  },
];
