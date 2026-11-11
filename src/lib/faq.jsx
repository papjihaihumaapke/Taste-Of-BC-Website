import { Link } from "react-router-dom";
import { event as E } from "../data.js";
import { Tbc } from "./ui.jsx";

/* FAQ — used by /faq (all) and the home page (first `home` items).
   Answers marked <Tbc /> still need the client to confirm them. */
export const FAQ = [
  { q: "Is admission free?", a: <>Yes, general admission is free for all ages, subject to capacity.</> },
  { q: "How do coupons work?", a: <>Each coupon is $1. Sample-size dishes range from {E.couponRange} coupons <Tbc />. Hand your coupons to any vendor booth to pay. <Link to="/coupons">More about coupons</Link>.</> },
  { q: "Where can I buy coupons?", a: <>Online in advance on our <Link to="/coupons">Coupons page</Link>, or onsite at the festival <Tbc />.</> },
  { q: "What payment methods are accepted?", a: <>Debit and credit are accepted for coupons. Cash <Tbc />.</> },
  { q: "What are the hours?", a: <>{E.datesLong}: {E.hoursByDay.map(([d, h]) => `${d} ${h}`).join(", ")}. Dates are tentative.</> },
  { q: "Are pets allowed?", a: <>Yes, pets are welcome on a leash.</> },
  { q: "Is there alcohol?", a: <>Yes, in the Beverage Garden for guests 19+ with valid ID.</> },
  { q: "What happens if it rains?", a: <>The festival runs rain or shine <Tbc />.</> },
  { q: "Can I bring outside food or drinks?", a: <><Tbc>Policy</Tbc></> },
  { q: "Is the site accessible?", a: <>Yes. See our <Link to="/accessibility">Accessibility page</Link> for entrances, washrooms, seating and how to request accommodations.</> },
  { q: "How do I become a vendor, volunteer or performer?", a: <>Find everything you need on the <Link to="/vendors">Vendor Opportunities</Link>, <Link to="/volunteer">Volunteer</Link> and <Link to="/perform">Perform</Link> pages.</> },
  { q: "Are there vegetarian, vegan, gluten-free or halal options?", a: <>Yes. Menus show dietary tags (V, VG, GF, Halal, Contains Nuts) once they’re announced on the <Link to="/menu">Menu</Link>. Labels are supplied by vendors, so please ask at the booth about allergens.</> },
  { q: "Is the festival family-friendly?", a: <>Absolutely. There’s a Family Discovery Area and shaded seating. The Beverage Garden is 19+ with ID.</> },
  { q: "Can I get a refund on coupons?", a: <>Unused coupons bought online may be refunded up to <Tbc /> days before the festival. See the <Link to="/legal#refunds">refund policy</Link>.</> }
];
