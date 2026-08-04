// src/data/armature.ts
// The Armature launch config. Every value a release cut touches lives HERE, not in a page.
// Dispatch of record: MrMiata workspace/2026-07-30_armature-launch-dispatch/RELAY-R10-site.md;
// picker copy: COPY-LAUNCH.md §2, shipped verbatim per the no-paraphrase rule.

// PROVEN at the dress rehearsal (R23-ack, 2026-08-02): a .usd mesh opened in the installed
// 2.0.0 on a clean machine, tested from the public artifact. Flipped true under R29. The
// docs quick start and the Formats table read this flag.
//
// WIDENED in 2.1.0 (2026-08-03): import is no longer mesh-only. A rigged USD now opens with
// its skeleton and skin weights intact, so the surfaces this flag drives dropped the
// "(mesh only)" qualifier they carried at launch.
export const USD_IMPORT = true;

// The MAYA control rig builder: does a user who downloads today actually get it?
// R25 (2026-07-31) rules that it ships with Armature and that the page may say so. This flag
// exists because that claim has a dependency the relay does not name: the builder has to be
// in a DOWNLOADABLE toolset release, and no shipped release note mentions one (latest public
// toolset is 1.1.3). If the toolset release carrying it does not land by launch, this is the
// exact "demonstrated, not shipped" error R25 was written to correct, one level up.
//
// True = the page says Maya builds your control rig for you, free.
// False = the page keeps the honest USD claim and says nothing a user cannot execute.
// Flip it in one place; the hero line and the VERIFIED panel both read it.
//
// RESOLVED 2026-08-01: toolset 1.2.0 with the Armature import is published on the stable
// key (R26-ack; edge verified serving Fabricator_v1.2.0.zip at 17:19 local). The R27 merge
// gate is met and true is an executable claim.
export const MAYA_CONTROL_RIG = true;

// The STABLE update-feed base (R10-ack item 1). electron-updater fetches
// `${UPDATE_BASE}latest.yml` unauthenticated; the directory never changes across releases.
// The Armature lane seats this same string in the app's publish config before t01.
export const UPDATE_BASE = 'https://downloads.fabricator.studio/armature/';

// The installer filename is part of the release contract: latest.yml references it, the
// .sha256 sits beside it, and the SmartScreen copy's Get-FileHash example names it.
export const INSTALLER_NAME = 'Armature-2.1.1-Setup.exe';

export const ARMATURE = {
  version: '2.1.1',
  installer: UPDATE_BASE + INSTALLER_NAME,
  sha256File: UPDATE_BASE + INSTALLER_NAME + '.sha256',

  // The 2026-08-04 10:56 build, Armature 2.1.1 (a skeleton-only USD imports and goes
  // straight to binding). Verified before publish: the disk hash, the .sha256 sidecar and
  // latest.yml's sha512 and size (137350168) all agree, and the publish script re-verified
  // the served bytes. Prior release hashes retire with their releases; their
  // installers stay on the feed under versioned filenames.
  //
  // Empty renders a "published at release" placeholder instead of a wrong hash.
  sha256: '61712efc913d35c0fcc43fbef76ea770544ce540261f558460c79aa74f265aa0',

  // The LIVE Stripe payment link (R22, seated 2026-07-31). NEVER a test-mode URL: this value
  // is the only place the Commercial picker reads, so a wrong value here ships everywhere.
  // Empty renders the Commercial CTA disabled rather than a dead href.
  //
  // Two settings on the link that this build depends on:
  //   - Confirmation redirect goes to /armature/thank-you/, which is what delivers the
  //     installer and tells the buyer their key is in their inbox.
  //   - Adjustable quantity is OFF, and must stay off. The licensing Worker issues ONE seat
  //     per checkout.session.completed and never reads quantity, so a multi-seat purchase
  //     would take payment for N and issue one. Changing that is a Worker change first and a
  //     Stripe setting second, never the reverse.
  stripeCommercial: 'https://buy.stripe.com/00w28qcbzeGWapIcdi4Rq01',
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
