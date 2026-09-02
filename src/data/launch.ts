/**
 * THE 2.0 PRICE SWITCH. One boolean, thrown once.
 *
 * The commercial model is explicit that this is an event and not a date: two live
 * listings change in one moment and neither moves before it. Armature stops costing
 * $149 and becomes free to everyone; the Advanced Ribbon Modules stop being a $199
 * purchase and come off the store. Until then the live site is CORRECT as it stands
 * and must not be "fixed" — quietly aligning the pages to the 2.0 model publishes a
 * price for a product that cannot be bought yet, and takes the two things that CAN be
 * bought off sale with nothing in their place.
 *
 * So every 2.0 surface reads this flag rather than being written twice. Flipping it to
 * true is the whole switch.
 *
 * WHAT MUST BE TRUE BEFORE IT IS FLIPPED:
 *   1. Every `url` in `src/data/plans.ts` is a real Stripe Payment Link. A tier with a
 *      null url renders "Coming soon", which is not a thing to put in front of a buyer
 *      on launch day.
 *   2. Each of those links carries `metadata.plan` set to its plan id, because that
 *      metadata is the ONLY signal a prepaid weekly block carries to the licensing
 *      service, and a purchase without it grants nothing.
 *   3. The subscription price ids are in the Worker's PLAN_MAP var.
 *   4. The Stripe webhook endpoint is subscribed to the subscription lifecycle events,
 *      not just checkout.session.completed and charge.refunded.
 *
 * Flipping it before those hold does not half-work. It sells nothing at all.
 */
export const PRICE_SWITCH_THROWN = true;
