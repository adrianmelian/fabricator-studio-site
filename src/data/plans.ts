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

export const PLANS: Plan[] = [
  { id: 'freelancer_w', label: 'Weekly', price: '$5', per: '/ week', url: null },
  { id: 'freelancer_anim_w', label: 'Weekly', price: '$8', per: '/ week', url: null },
  { id: 'premium_m', label: 'Monthly', price: '$25', per: '/ month', url: null },
  { id: 'premium_y', label: 'Yearly', price: '$250', per: '/ year', url: null },
  { id: 'pro_m', label: 'Monthly', price: '$45', per: '/ month', url: null },
  { id: 'pro_y', label: 'Yearly', price: '$450', per: '/ year', url: null },
];
