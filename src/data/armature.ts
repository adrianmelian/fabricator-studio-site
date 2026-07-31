// src/data/armature.ts
// The Armature launch config. Every value a release cut touches lives HERE, not in a page.
// Dispatch of record: MrMiata workspace/2026-07-30_armature-launch-dispatch/RELAY-R10-site.md;
// picker copy: COPY-LAUNCH.md §2, shipped verbatim per the no-paraphrase rule.

// USD import is CONDITIONAL on the dress rehearsal proving it against the built artifact
// (R15 item 4 / R18 item 2). The docs quick start and the Formats table both read this one
// flag, so the page is never wrong either way. Set true only after a .usd mesh is proven to
// open in the SHIPPING build.
export const USD_IMPORT = false;

// The STABLE update-feed base (R10-ack item 1). electron-updater fetches
// `${UPDATE_BASE}latest.yml` unauthenticated; the directory never changes across releases.
// The Armature lane seats this same string in the app's publish config before t01.
export const UPDATE_BASE = 'https://downloads.fabricator.studio/armature/';

// The installer filename is part of the release contract: latest.yml references it, the
// .sha256 sits beside it, and the SmartScreen copy's Get-FileHash example names it.
export const INSTALLER_NAME = 'Armature-2.0.0-Setup.exe';

export const ARMATURE = {
  version: '2.0.0',
  installer: UPDATE_BASE + INSTALLER_NAME,
  sha256File: UPDATE_BASE + INSTALLER_NAME + '.sha256',

  // Pasted at the Aug 2 cut from the .sha256 file `npm run dist` emits beside the installer.
  // Empty renders a "published at release" placeholder instead of a wrong hash.
  sha256: '',

  // The LIVE Stripe payment link, supplied by Adrian on Aug 1. NEVER a test-mode URL: this
  // value is the only place the Commercial picker reads, so a test link here ships a test
  // link. Empty renders the Commercial CTA disabled rather than a dead href.
  stripeCommercial: '',
};

// Data-driven picker rows (ruling 2026-07-28b): the education grant lands later as a third
// row here, without a page rewrite. Eligibility leads, price follows; copy verbatim from
// COPY-LAUNCH.md §2.
export interface PickerRow {
  key: string;
  name: string;
  price: string;
  line: string;
  cta: 'download' | 'checkout';
  event: string;
}

export const PICKER_ROWS: PickerRow[] = [
  {
    key: 'indie',
    name: 'Indie',
    price: 'Free',
    line: 'For personal work, and for studios under $100k a year.',
    cta: 'download',
    event: 'armature-download-indie',
  },
  {
    key: 'commercial',
    name: 'Commercial',
    price: '$149 per seat',
    line: 'For studios at or above $100k a year.',
    cta: 'checkout',
    event: 'armature-checkout-commercial',
  },
];
