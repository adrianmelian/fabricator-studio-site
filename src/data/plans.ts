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
  { id: 'techart_w', label: 'Weekly', price: '$6', per: '/ week', url: 'https://buy.stripe.com/9B614m0sR9mC8hA7X24Rq03' },
  { id: 'techart_anim_w', label: 'Weekly', price: '$9', per: '/ week', url: 'https://buy.stripe.com/14A4gyfnL7eu41k5OU4Rq02' },
  { id: 'pro_m', label: 'Monthly', price: '$25', per: '/ month', url: 'https://buy.stripe.com/5kQ28qa3reGW8hAa5a4Rq07' },
  { id: 'pro_y', label: 'Yearly', price: '$250', per: '/ year', url: 'https://buy.stripe.com/fZu5kC1wVaqGapI1yE4Rq06' },
  // The FIRST link for this plan charged $40.00 a month where every surface said
  // $45.00; Adrian replaced it the same day and the replacement verifies at $45.00.
  // The old one (...4Rq04) should be archived at Stripe so nobody reaches it.
  { id: 'enterprise_m', label: 'Monthly', price: '$45', per: '/ month', url: 'https://buy.stripe.com/dRm4gya3rcyOapI4KQ4Rq08' },
  { id: 'enterprise_y', label: 'Yearly', price: '$450', per: '/ year', url: 'https://buy.stripe.com/8x200i5Nb42i1Tc7X24Rq05' },
];
