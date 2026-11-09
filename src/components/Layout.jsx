import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { event as E, products } from "../data.js";
import { Icon, QtyInput, money, useMeta } from "../lib/ui.jsx";
import { SocialLinks } from "../pages/Contact.jsx";
import { useStore, product } from "../lib/store.jsx";

const NAV = [
  ["/whats-on", "What’s On"],
  ["/menu", "Food & Drink"],
  ["/entertainment", "Entertainment"],
  ["/coupons", "Coupons"],
  ["/visit", "Plan Your Visit"],
  ["/get-involved", "Get Involved"],
  ["/sponsorship", "Sponsors"]
];
const MORE = [["/getting-there", "Getting There"], ["/map", "Festival Map"], ["/faq", "FAQ"], ["/shop", "Shop"], ["/about", "About"], ["/media", "Media"], ["/contact", "Contact"]];

function Header() {
  const { count, setCartOpen } = useStore();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  useEffect(() => setMenu(false), [loc.pathname]);
  useEffect(() => {
    const on = () => setScrolled(scrollY > 8); on();
    addEventListener("scroll", on, { passive: true }); return () => removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.body.style.overflow = menu ? "hidden" : ""; }, [menu]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="announce" role="note"><div className="container">
        <span className="dot" aria-hidden="true" />
        <span>{E.datesShort} · {E.city} · Free Entry{!E.datesConfirmed && <span className="tbc"> · Dates to be confirmed</span>}</span>
      </div></div>
      <header className={"site-header" + (scrolled ? " scrolled" : "")}><div className="container">
        <Link className="brand" to="/" aria-label="Taste of BC home"><img src="/assets/img/logo-red.png" alt="Taste of BC" width="90" height="46" /></Link>
        <nav className="nav" aria-label="Main">
          {NAV.map(([to, l]) => <NavLink key={to} to={to} aria-current={loc.pathname === to || loc.pathname.startsWith(to + "/") ? "page" : undefined}>{l}</NavLink>)}
        </nav>
        <div className="header-actions">
          <button className="icon-btn" aria-label={`Open cart${count ? ` (${count} items)` : ""}`} onClick={() => setCartOpen(true)}>
            <Icon name="cart" /><span className="cart-count" data-n={count}>{count}</span>
          </button>
          <Link className="btn btn-sm" to="/coupons"><Icon name="ticket" />Buy Coupons</Link>
          <button className="icon-btn menu-toggle" aria-label="Open menu" aria-expanded={menu} aria-controls="mobileNav" onClick={() => setMenu(true)}><Icon name="menu" /></button>
        </div>
      </div></header>

      <div className={"mobile-nav" + (menu ? " open" : "")} id="mobileNav" aria-hidden={!menu}>
        <div className="scrim" onClick={() => setMenu(false)} />
        <div className="panel" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="panel-head"><img src="/assets/img/logo-red.png" alt="Taste of BC" /><button className="icon-btn" aria-label="Close menu" onClick={() => setMenu(false)}><Icon name="x" /></button></div>
          <nav>
            {[["/", "Home"], ...NAV, ...MORE].map(([to, l]) => (
              <Link key={to} to={to} aria-current={loc.pathname === to ? "page" : undefined}>{l}<Icon name="arrow" /></Link>
            ))}
          </nav>
          <div className="panel-foot">
            <Link className="btn btn-block" to="/coupons"><Icon name="ticket" />Buy coupons</Link>
            <p className="small muted mb-0 center">Free entry · {E.datesShort} · {E.city}</p>
          </div>
        </div>
      </div>
    </>
  );
}

function Newsletter() {
  const { notify } = useStore();
  const onSubmit = (e) => {
    e.preventDefault(); const i = e.currentTarget.querySelector("input");
    if (!i.checkValidity()) { i.focus(); notify("Please enter a valid email address.", "info"); return; }
    i.value = ""; notify("You’re on the list. See you in August!");
  };
  return (
    <form className="newsletter" noValidate onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="nl-email">Email address</label>
      <input id="nl-email" type="email" placeholder="Your email address" required autoComplete="email" />
      <button className="btn" type="submit">Subscribe</button>
    </form>
  );
}

function Footer() {
  return (
    <>
      <section className="newsletter-band" aria-labelledby="nl-title"><div className="container">
        <div><h2 id="nl-title">Be first to hear the lineup.</h2><p>Restaurants, performers and BC wineries as they’re announced. One email a month, max.</p></div>
        <Newsletter />
      </div></section>
      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <img src="/assets/img/logo-white.png" alt="Taste of BC" width="150" height="77" loading="lazy" />
            <p>A not-for-profit community festival of food, beverage and entertainment. Local restaurants, BC wines and local artists. {E.datesShort} in {E.city}.</p>
            <SocialLinks />
          </div>
          <nav aria-label="Festival"><h4>Festival</h4><ul>
            <li><Link to="/whats-on">What’s on</Link></li><li><Link to="/menu">Menu</Link></li>
            <li><Link to="/entertainment">Entertainment & schedule</Link></li><li><Link to="/coupons">Food coupons</Link></li><li><Link to="/booklet">Info booklet</Link></li></ul></nav>
          <nav aria-label="Visit"><h4>Visit</h4><ul>
            <li><Link to="/getting-there">Getting there</Link></li><li><Link to="/map">Festival map</Link></li>
            <li><Link to="/accessibility">Accessibility</Link></li><li><Link to="/faq">FAQ</Link></li><li><Link to="/shop">Shop merch</Link></li></ul></nav>
          <nav aria-label="Join us"><h4>Join us</h4><ul>
            <li><Link to="/vendors">Become a vendor</Link></li><li><Link to="/volunteer">Volunteer</Link></li>
            <li><Link to="/perform">Perform</Link></li><li><Link to="/sponsorship">Sponsorship</Link></li><li><Link to="/legal#vendor-terms">Vendor terms</Link></li></ul></nav>
          <nav aria-label="About"><h4>About</h4><ul>
            <li><Link to="/about">Our story</Link></li><li><Link to="/contact">Contact</Link></li><li><Link to="/media">Media</Link></li>
            <li><a href={"mailto:" + E.email}>{E.email}</a></li></ul></nav>
        </div>
        <div className="footer-bottom"><div className="container">
          <span>© {E.year} Taste of BC · A not-for-profit community event</span>
          <span className="legal-links"><Link to="/legal#privacy">Privacy</Link>·<Link to="/legal#terms">Terms</Link>·<Link to="/legal#refunds">Refunds</Link></span>
          <span className="stripe-note"><Icon name="lock" />Payments secured by Stripe</span>
        </div></div>
      </footer>
    </>
  );
}

function CartDrawer() {
  const { items, setQty, remove, subtotal, cartOpen, setCartOpen } = useStore();
  const [promo, setPromo] = useState({ v: "", msg: "" });
  const closeRef = useRef(null);
  useEffect(() => {
    if (!cartOpen) return;
    const prev = document.activeElement;
    setTimeout(() => closeRef.current?.focus(), 60);
    document.body.style.overflow = "hidden";
    const k = (e) => e.key === "Escape" && setCartOpen(false);
    addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; removeEventListener("keydown", k); prev?.focus?.(); };
  }, [cartOpen, setCartOpen]);
  const coupons = items.filter((i) => i.id === "sheet" || i.id === "egift").reduce((s, i) => s + i.qty * 20, 0);
  const applyPromo = (e) => {
    e.preventDefault();
    setPromo((p) => ({ ...p, msg: p.v.trim() ? `“${p.v.trim()}” isn’t a valid code. Codes are applied in Stripe checkout.` : "Enter a promo code." }));
  };
  return (
    <div className={"drawer" + (cartOpen ? " open" : "")} aria-hidden={!cartOpen}>
      <div className="scrim" onClick={() => setCartOpen(false)} />
      <aside className="panel" role="dialog" aria-modal="true" aria-labelledby="cartTitle">
        <div className="drawer-head"><h2 id="cartTitle">Your cart</h2><button className="icon-btn" aria-label="Close cart" ref={closeRef} onClick={() => setCartOpen(false)}><Icon name="x" /></button></div>
        <div className="drawer-body">
          {!items.length ? (
            <div className="drawer-empty"><div className="icon-tile"><Icon name="cart" /></div><h3>Your cart is empty</h3><p className="muted">Entry is free. Grab a coupon sheet to start tasting.</p><Link className="btn" to="/coupons" onClick={() => setCartOpen(false)}>Buy coupons</Link></div>
          ) : items.map((i) => {
            const p = product(i.id);
            return (
              <div className="line-item" key={i.key}>
                <div className="thumb">{p.img ? <img src={p.img} alt="" /> : <Icon name={p.kind === "gift" ? "gift" : "ticket"} />}</div>
                <div><h4>{p.name}</h4><div className="sub">{i.opt ? i.opt + " · " : ""}{money(p.price)} each</div>
                  <div className="stepper sm" role="group" aria-label={"Quantity for " + p.name}>
                    <button type="button" aria-label="Decrease" onClick={() => setQty(i.key, i.qty - 1)}><Icon name="minus" /></button>
                    <QtyInput value={i.qty} onChange={(v) => setQty(i.key, v)} />
                    <button type="button" aria-label="Increase" onClick={() => setQty(i.key, i.qty + 1)}><Icon name="plus" /></button>
                  </div></div>
                <div><div className="lp">{money(p.price * i.qty)}</div><button className="rm" onClick={() => remove(i.key)}>Remove</button></div>
              </div>
            );
          })}
        </div>
        {items.length > 0 && (
          <div className="drawer-foot">
            <form className="promo" noValidate onSubmit={applyPromo}><label className="sr-only" htmlFor="promoIn">Promo code</label>
              <input className={"input" + (promo.msg ? " is-error" : "")} id="promoIn" placeholder="Promo code" autoComplete="off" value={promo.v} onChange={(e) => setPromo({ v: e.target.value, msg: "" })} />
              <button className="btn btn-secondary btn-sm" type="submit">Apply</button></form>
            <div className="promo-msg err" aria-live="polite">{promo.msg}</div>
            <div className="sum-row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
            {coupons > 0 && <div className="sum-row"><span>Coupons included</span><span>{coupons} × $1</span></div>}
            <div className="sum-row"><span>Taxes & fees</span><span>Calculated at checkout</span></div>
            <div className="sum-row total"><span>Total</span><span>{money(subtotal)}</span></div>
            <Link className="btn btn-block btn-lg" to="/checkout" onClick={() => setCartOpen(false)}><Icon name="lock" />Secure checkout</Link>
            <div className="secure"><Icon name="shield" />Payments processed securely by Stripe</div>
          </div>
        )}
      </aside>
    </div>
  );
}

/* Unique <title> + meta description per page */
const SITE = "Taste of BC 2027";
const META = {
  "/": [`${SITE} — BC’s Biggest Food, Beverage & Entertainment Festival`, `Free-admission food, beverage and entertainment festival in ${E.city}, ${E.datesShort}. Sample-size dishes for $1 coupons, BC wines, live music and local makers.`],
  "/whats-on": [`What’s On | ${SITE}`, "Local restaurants, the BC Wine Garden, live entertainment, local artists, chef demos and a Family Zone — four days, free admission."],
  "/menu": [`Menu | ${SITE}`, "Restaurants, food trucks and BC breweries, wineries and distilleries serving sample-size dishes for $1 coupons. Menus coming soon."],
  "/menu/restaurants": [`Restaurants Menu | ${SITE}`, "Sample-size dishes from local BC restaurants, paid with $1 festival coupons."],
  "/menu/food-trucks": [`Food Trucks Menu | ${SITE}`, "BC food trucks serving festival favourites, paid with $1 festival coupons."],
  "/menu/drinks": [`Breweries, Wineries & Distilleries | ${SITE}`, "BC craft beer, wine, cider and spirits in the 19+ BC Wine Garden."],
  "/entertainment": [`Entertainment & Schedule | ${SITE}`, "Live music, dance, comedy, chef demos and family fun across four days. Lineup announced soon."],
  "/coupons": [`Food & Drink Coupons | ${SITE}`, `How $1 festival coupons work, where to buy them and coupon bundles. Dishes range from ${E.couponRange} coupons.`],
  "/visit": [`Plan Your Visit | ${SITE}`, `Dates, hours, admission and tips for Taste of BC in ${E.city}, ${E.datesShort}.`],
  "/getting-there": [`Getting There | ${SITE}`, `Directions to Taste of BC in ${E.city}: transit, bike, walking, parking and rideshare drop-off.`],
  "/accessibility": [`Accessibility | ${SITE}`, "Accessible entrances, washrooms, seating, service animals, quiet area and accommodation requests."],
  "/map": [`Festival Map | ${SITE}`, "Find restaurants, food trucks, the BC Wine Garden, stages, Artisan Market, first aid and washrooms."],
  "/get-involved": [`Get Involved | ${SITE}`, "Become a vendor, volunteer, perform or sponsor Taste of BC."],
  "/vendors": [`Vendor Opportunities | ${SITE}`, "Apply as a restaurant, food truck, liquor or artisan vendor at Taste of BC. Vendor forms and terms."],
  "/perform": [`Perform at Taste of BC | ${SITE}`, "BC musicians, dancers, comedians and artists: apply to perform at Taste of BC."],
  "/volunteer": [`Volunteer | ${SITE}`, "Volunteer registration is open. Join the crew that makes Taste of BC happen."],
  "/sponsorship": [`Sponsorship Opportunities | ${SITE}`, "BC’s best outdoor food & beverage festival. Build a customized sponsorship package with Taste of BC."],
  "/media": [`Media | ${SITE}`, "Download Taste of BC logos and festival photos, and find press contacts."],
  "/faq": [`FAQ | ${SITE}`, "Answers about free admission, $1 coupons, payment, pets, alcohol, hours, weather and accessibility."],
  "/contact": [`Contact | ${SITE}`, "Contact Taste of BC: email, phone, office address, socials and a general contact form."],
  "/about": [`About | ${SITE}`, "Taste of BC is a not-for-profit, free-admission festival celebrating BC’s food community."],
  "/entertainers": [`Entertainer Portal | ${SITE}`, "Apply to perform or sign in to manage your Taste of BC booking."],
  "/shop": [`Shop | ${SITE}`, "Taste of BC coupon sheets, gift coupons and festival merchandise."],
  "/booklet": [`Info Booklet | ${SITE}`, "The Taste of BC info booklet: schedule, map and partners."],
  "/legal": [`Privacy, Terms & Policies | ${SITE}`, "Taste of BC privacy policy, terms of use, refund policy and vendor terms."],
  "/checkout": [`Checkout | ${SITE}`, "Secure checkout for Taste of BC coupons and merchandise."]
};
function MetaManager() {
  const { pathname } = useLocation();
  const [t, d] = META[pathname.replace(/\/$/, "") || "/"] || META["/"];
  useMeta(t, d);
  return null;
}

/* Scroll to top on page change, or to #hash target */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) { const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 50); return () => clearTimeout(t); }
    scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

/* Subtle fade-up of content blocks as they scroll into view */
const REVEAL = [
  "main .section-head", "main .split > *", "main .grid > *", "main .trio > *", "main .gallery figure",
  "main .steps-3 > li", "main .steps-row > li", "main .facts-list > li", "main .logo-wall > *",
  "main .band .container > *", "main .cta-band", "main .accordion", "main .stats > *", "main .map-layout > *", "main .pd > *",
  "main .feature-grid > *", "main .visit-grid > *", "main .partner-grid > *", "main .involve-grid > *", "main .info-grid > *",
  "main .coupon-cta", "main .partner-cta"
].join(",");
function useReveal(pathname) {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = [...document.querySelectorAll(REVEAL)].filter((el) => !el.closest(".reveal") && el.getBoundingClientRect().top > innerHeight * 0.9);
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target; el.classList.add("in"); io.unobserve(el);
      setTimeout(() => { el.classList.remove("reveal", "in"); el.style.transitionDelay = ""; }, 1200); // hand back to normal hover transitions
    }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => {
      const sibs = el.parentElement ? [...el.parentElement.children] : [];
      el.style.transitionDelay = Math.min(sibs.indexOf(el), 7) * 80 + "ms"; // stagger items in a row
      el.classList.add("reveal"); io.observe(el);
    });
    return () => { io.disconnect(); els.forEach((el) => { el.classList.remove("reveal", "in"); el.style.transitionDelay = ""; }); };
  }, [pathname]);
}

function RevealOnScroll() {
  const { pathname } = useLocation();
  useReveal(pathname);
  return null;
}

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <MetaManager />
      <RevealOnScroll />
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      <CartDrawer />
    </>
  );
}

export { products };
