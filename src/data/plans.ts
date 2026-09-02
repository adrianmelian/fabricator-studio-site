// src/data/plans.ts
// THE single place a Stripe payment link URL gets pasted in. Every `url` starts `null`
// until Adrian (or Data) has the real payment link; a `null` url means the buy button in
// SubscriptionTiers.astro renders disabled with the label "Coming soon". Nothing else in
// the codebase should hold a second copy of these ids or their prices — the price strings
// here trace to _TheBridge/StandingOrders/Knowledge/commercial-model.md, which is the only
// source of truth for the commercial model.
//
// EVERY TIER IS A RECURRING SUBSCRIPTION, the weekly band included. Ruled by Adrian
// 2026-09-02: "Let's do weekly payments for the weekly people", replacing the prepaid
// 1/4/12-week blocks of 2026-08-31. A weekly seat renews itself every week, cancels in
// the same customer portal as every other tier, and needs no top-up toggle: Stripe's own
// dunning is the retry. Nothing on this list is a one-time purchase any more.
export interface Plan {
  id: string;
  label: string;
  price: string;
  per: string;
  url: string | null;
}

// RENAMED 2026-09-02 by Adrian: Freelancer became Freelance Tech Art, Premium became
// Pro, and the old Pro became Enterprise. The plan ids follow the names, so `pro_m` now
// means $25 where it used to mean $45. That reuse is only safe because nothing was live
// when it happened: no Stripe price had ever been mapped and there were zero
// subscriptions. It would have been a data migration a week later.
export const PLANS: Plan[] = [
  { id: 'techart_w', label: 'Weekly', price: '$6', per: '/ week', url: null },
  { id: 'techart_anim_w', label: 'Weekly', price: '$9', per: '/ week', url: null },
  { id: 'pro_m', label: 'Monthly', price: '$25', per: '/ month', url: null },
  { id: 'pro_y', label: 'Yearly', price: '$250', per: '/ year', url: null },
  { id: 'enterprise_m', label: 'Monthly', price: '$45', per: '/ month', url: null },
  { id: 'enterprise_y', label: 'Yearly', price: '$450', per: '/ year', url: null },
];
