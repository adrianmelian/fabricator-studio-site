// src/data/plans.ts
// THE single place a Stripe payment link URL gets pasted in. Every `url` starts `null`
// until Adrian (or Data) has the real payment link; a `null` url means the buy button in
// SubscriptionTiers.astro renders disabled with the label "Coming soon". Nothing else in
// the codebase should hold a second copy of these ids or their prices — the price strings
// here trace to the same table SubscriptionTiers.astro already carries (its own comment
// cites _TheBridge/StandingOrders/Knowledge/commercial-model.md as the source of truth).
//
// Flat multiples on the two weekly meters, no bundle discount:
//   Freelancer            $5/week  -> 1wk $5, 4wk $20, 12wk $60
//   Freelancer + Animation $8/week -> 1wk $8, 4wk $32, 12wk $96
// Premium and Pro carry the standard two-months-free yearly shape.
export interface Plan {
  id: string;
  label: string;
  price: string;
  per: string;
  url: string | null;
}

export const PLANS: Plan[] = [
  { id: 'freelancer_w1', label: '1 week', price: '$5', per: 'total', url: null },
  { id: 'freelancer_w4', label: '4 weeks', price: '$20', per: 'total', url: null },
  { id: 'freelancer_w12', label: '12 weeks', price: '$60', per: 'total', url: null },
  { id: 'freelancer_anim_w1', label: '1 week', price: '$8', per: 'total', url: null },
  { id: 'freelancer_anim_w4', label: '4 weeks', price: '$32', per: 'total', url: null },
  { id: 'freelancer_anim_w12', label: '12 weeks', price: '$96', per: 'total', url: null },
  { id: 'premium_m', label: 'Monthly', price: '$25', per: '/ month', url: null },
  { id: 'premium_y', label: 'Yearly', price: '$250', per: '/ year', url: null },
  { id: 'pro_m', label: 'Monthly', price: '$45', per: '/ month', url: null },
  { id: 'pro_y', label: 'Yearly', price: '$450', per: '/ year', url: null },
];
