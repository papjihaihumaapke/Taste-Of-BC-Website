import { Link } from "react-router-dom";
import { event as E } from "../data.js";

/* FAQ — shared by Home and About.
   `todo: true` marks an answer the client still needs to confirm (shows a small "To confirm" tag). */
export const FAQ = [
  { q: "When is the festival?", a: <>{E.datesLong} (tentative, to be confirmed), {E.hours}, in {E.city}.</> },
  { q: "Is entry really free?", a: <>Yes. Entry is free on all four days at every entrance arch. You only pay for food and drinks, using festival coupons.</> },
  { q: "How do coupons work?", a: <>A coupon sheet costs ${E.sheetPrice} and has {E.couponsPerSheet} tear-off $1 coupons. Every menu is priced in coupons. <Link to="/coupons">Learn more</Link>.</> },
  { q: "Can I bring cash?", a: <>Taste of BC is cashless. Coupon Booths accept debit, credit, Apple Pay and Google Pay. You can also buy coupons online before you arrive.</> },
  { q: "Are there vegetarian, vegan, gluten-free or halal options?", a: <>Yes. Use the dietary filters on <Link to="/food-and-drink">Food & Drink</Link>. Labels are supplied by vendors, so please ask at the booth about allergens.</> },
  { q: "Is the festival family-friendly?", a: <>Absolutely. There’s a Family Zone, kid-sized portions and shaded seating. The BC Wine Garden is 19+ with ID.</> },
  { q: "Where do I park?", a: <>On-site and nearby parking. Lots fill up on weekend evenings, so carpool if you can. Transit and rideshare details are on <Link to="/visit">Plan Your Visit</Link>.</>, todo: true },
  { q: "Can I bring my dog?", a: <>Pets are not permitted on site. Service animals are welcome.</> },
  { q: "How old do I need to be for the BC Wine Garden?", a: <>The BC Wine Garden is 19+. ID is checked at the entrance to the garden.</> },
  { q: "Can I get a refund on coupons?", a: <>Unused coupon sheets bought online may be refunded up to [X] days before the festival. Torn, lost or stolen coupons can’t be replaced. See the <Link to="/legal#refunds">refund policy</Link>.</>, todo: true }
];
