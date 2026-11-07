import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon, PageHero, money } from "../lib/ui.jsx";
import { product, useStore } from "../lib/store.jsx";

/*
  PRODUCTION NOTE — Stripe integration
  Replace the demo redirect below with a call to your server, e.g.
    const res = await fetch("/api/create-checkout-session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items }) });
    const { url } = await res.json(); location.href = url;   // Stripe-hosted Checkout
  Set success_url to /thank-you?session_id={CHECKOUT_SESSION_ID} and cancel_url to /coupons.
  Never trust prices from the browser: look them up on the server by product id.
*/
export function Checkout() {
  const { items, subtotal, clear } = useStore();
  const nav = useNavigate();
  const [total] = useState(subtotal);
  useEffect(() => {
    if (!items.length) return;
    const order = {
      no: "TOBC-" + Math.random().toString(36).slice(2, 8).toUpperCase(), date: new Date().toISOString(),
      items: items.map((i) => { const p = product(i.id); return { name: p.name, opt: i.opt, qty: i.qty, price: p.price }; }), total: subtotal
    };
    try { sessionStorage.setItem("tobc-last-order", JSON.stringify(order)); } catch { /* storage blocked */ }
    const t = setTimeout(() => { clear(); nav("/thank-you"); }, 3200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="center-screen" style={{ background: "var(--sand)" }}>
      <div className="redirect-card">
        {!items.length && !total ? (
          <><span className="eyebrow">Checkout</span><h1 style={{ fontSize: "2rem" }}>Your cart is empty</h1><p className="muted">Add a coupon sheet or some merch to continue.</p><Link className="btn mt-4" to="/coupons">Buy coupons</Link></>
        ) : (
          <>
            <div className="loader" aria-hidden="true" />
            <span className="eyebrow">Secure checkout</span>
            <h1 style={{ fontSize: "2rem" }}>Redirecting to secure Stripe checkout…</h1>
            <p className="muted">You’ll pay <strong>{money(total)}</strong> on Stripe’s secure page. Don’t close this window.</p>
            <div className="progress"><span /></div>
            <p className="secure mt-6"><Icon name="lock" />256-bit encryption · Card, Apple Pay, Google Pay</p>
            <button className="btn btn-ghost btn-sm mt-4" onClick={() => nav(-1)}>Cancel and return</button>
          </>
        )}
      </div>
    </section>
  );
}

export function ThankYou() {
  let o = null; try { o = JSON.parse(sessionStorage.getItem("tobc-last-order")); } catch { /* ignore */ }
  if (!o) o = { no: "TOBC-SAMPLE", date: new Date().toISOString(), items: [{ name: "Coupon sheet (20 × $1)", qty: 2, price: 20 }, { name: "Logo tee — Red", opt: "Size M", qty: 1, price: 30 }], total: 70 };
  return (
    <>
      <PageHero eyebrow="Order confirmed" title="Thank you — see you in August!" lead="A receipt and your pickup QR code are on the way to your inbox." />
      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <div className="card" style={{ padding: "clamp(24px,3vw,40px)" }}>
            <div className="row" style={{ justifyContent: "space-between" }}><h3 className="mb-0">Order summary</h3><span className="badge success"><Icon name="check" />Paid</span></div>
            <p className="small muted mt-4">Order {o.no} · {new Date(o.date).toLocaleDateString("en-CA", { dateStyle: "long" })}</p>
            <table className="order-table mt-4">
              <thead><tr><th>Item</th><th>Qty</th><th>Amount</th></tr></thead>
              <tbody>{o.items.map((i) => <tr key={i.name + i.opt}><td>{i.name}{i.opt && <><br /><span className="small muted">{i.opt}</span></>}</td><td>{i.qty}</td><td>{money(i.qty * i.price)}</td></tr>)}</tbody>
              <tfoot><tr><td>Total</td><td /><td>{money(o.total)}</td></tr></tfoot>
            </table>
          </div>
          <div>
            <span className="eyebrow">What’s next</span>
            <h2>Picking up your order</h2>
            <ul className="kbd-list mt-6">
              <li><Icon name="mail" /><div><strong>Check your email</strong><span>Your receipt includes a QR code for pickup.</span></div></li>
              <li><Icon name="arch" /><div><strong>Coupon sheets</strong><span>Show your QR at any Coupon Booth — North, East or West Gate.</span></div></li>
              <li><Icon name="store" /><div><strong>Merch</strong><span>Collect from the Info Booth by the North Gate.</span></div></li>
            </ul>
            <div className="row mt-6"><Link className="btn" to="/food-and-drink">Plan what to eat</Link><Link className="btn btn-secondary" to="/entertainment">See the schedule</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
