import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { event as E, products } from "../data.js";
import { Icon, money } from "../lib/ui.jsx";
import { useStore, product } from "../lib/store.jsx";

const NAV = [
  ["/whats-on", "What’s On"],
  ["/food-and-drink", "Food & Drink"],
  ["/entertainment", "Entertainment"],
  ["/coupons", "Coupons"],
  ["/visit", "Plan Your Visit"],
  ["/get-involved", "Get Involved"],
  ["/sponsors", "Sponsors"]
];
const MORE = [["/entertainers", "Entertainers — apply or sign in"], ["/map", "Festival Map"], ["/shop", "Shop"], ["/about", "About, FAQ & Contact"]];

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
      <header className={"site-header" + (scrolled ? " scrolled" : "")}><div className="container">
        <Link className="brand" to="/" aria-label="Taste of BC home"><img src="/assets/img/logo-red.png" alt="Taste of BC" width="78" height="40" /></Link>
        <nav className="nav" aria-label="Main">
          {NAV.map(([to, l]) => <NavLink key={to} to={to} aria-current={loc.pathname === to ? "page" : undefined}>{l}</NavLink>)}
        </nav>
        <div className="header-actions">
          <span className="lang">FREE ENTRY · {E.datesShort.toUpperCase()}</span>
          <button className="icon-btn ring" aria-label="Open cart" onClick={() => setCartOpen(true)}>
            <Icon name="cart" /><span className="cart-count" data-n={count}>{count}</span>
          </button>
          <Link className="btn btn-sm" to="/coupons"><Icon name="ticket" />Buy coupons</Link>
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
    <footer className="site-footer">
      <div className="footer-cta"><div className="container">
        <div><h3>Be first to hear the lineup.</h3><p>Restaurants, performers and BC wineries as they’re announced. One email a month, max.</p></div>
        <Newsletter />
      </div></div>
      <div className="container footer-main">
        <div className="footer-brand">
          <img src="/assets/img/logo-red.png" alt="Taste of BC" width="190" height="97" />
          <p>A not-for-profit community festival of food, beverage and entertainment. Local restaurants, BC wines and local artists. {E.datesShort} in {E.city}.</p>
          <div className="socials">
            {["instagram", "facebook", "tiktok", "youtube"].map((s) => <a key={s} href="#" aria-label={s[0].toUpperCase() + s.slice(1)}><Icon name={s} /></a>)}
          </div>
        </div>
        <div><h4>Festival</h4><ul>
          <li><Link to="/whats-on">What’s on</Link></li><li><Link to="/food-and-drink">Food & drink</Link></li>
          <li><Link to="/entertainment">Entertainment & schedule</Link></li><li><Link to="/coupons">Food coupons</Link></li><li><Link to="/booklet">Info booklet</Link></li></ul></div>
        <div><h4>Visit</h4><ul>
          <li><Link to="/visit">Getting there</Link></li><li><Link to="/map">Festival map</Link></li>
          <li><Link to="/visit#accessibility">Accessibility</Link></li><li><Link to="/about#faq">FAQ</Link></li><li><Link to="/shop">Shop merch</Link></li></ul></div>
        <div><h4>Join us</h4><ul>
          <li><Link to="/entertainers">Entertainers</Link></li><li><Link to="/get-involved#vendors">Food & drink vendors</Link></li>
          <li><Link to="/get-involved#volunteer">Volunteer</Link></li><li><Link to="/sponsors">Sponsorship</Link></li></ul></div>
        <div><h4>About</h4><ul>
          <li><Link to="/about">Our story</Link></li><li><Link to="/about#contact">Contact</Link></li>
          <li><a href={"mailto:" + E.email}>{E.email}</a></li></ul></div>
      </div>
      <div className="footer-bottom"><div className="container">
        <span>© {E.year} Taste of BC · A not-for-profit community event · <Link to="/legal#privacy">Privacy</Link> · <Link to="/legal#terms">Terms</Link> · <Link to="/legal#refunds">Refunds</Link></span>
        <span className="stripe-note"><Icon name="lock" />Payments secured by Stripe</span>
      </div></div>
    </footer>
  );
}

function CartDrawer() {
  const { items, setQty, remove, subtotal, cartOpen, setCartOpen } = useStore();
  const [promo, setPromo] = useState({ v: "", msg: "" });
  useEffect(() => {
    if (!cartOpen) return;
    document.body.style.overflow = "hidden";
    const k = (e) => e.key === "Escape" && setCartOpen(false);
    addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; removeEventListener("keydown", k); };
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
        <div className="drawer-head"><h2 id="cartTitle">Your cart</h2><button className="icon-btn" aria-label="Close cart" onClick={() => setCartOpen(false)}><Icon name="x" /></button></div>
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
                    <input type="number" value={i.qty} min="1" max="99" aria-label="Quantity" onChange={(e) => setQty(i.key, Math.max(0, parseInt(e.target.value) || 0))} />
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

/* Scroll to top on page change, or to #hash target */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) { const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 50); return () => clearTimeout(t); }
    scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      <CartDrawer />
    </>
  );
}

export { products };
