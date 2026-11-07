import { useState } from "react";
import { Link } from "react-router-dom";
import { event as E } from "../data.js";
import { Icon, PageHero, QtyInput, money } from "../lib/ui.jsx";
import { useStore } from "../lib/store.jsx";
import { CouponSheet } from "../components/Festival.jsx";

const STEPS = [
  { icon: "ticket", title: "Buy a coupon sheet", text: `$${E.sheetPrice} gets you ${E.couponsPerSheet} coupons worth $1 each. Buy online or at any entrance.` },
  { icon: "banner", title: "Pick your food or drink", text: "Every booth lists its prices in coupons. Tacos cost 9 coupons, for example." },
  { icon: "scissors", title: "Tear off and pay", text: "Tear off the coupons you need and hand them to the vendor. That’s it." }
];

const FACTS = [
  ["calendar", `Valid on all ${E.days} festival days`],
  ["card", "Coupon Booths take debit, credit and tap"],
  ["nocash", "No cash is accepted at food booths"],
  ["info", "Coupons have no cash value and can’t be replaced if lost"]
];

export default function Coupons() {
  const { add } = useStore();
  const [qty, setQty] = useState(1);
  const q = Math.max(1, Math.min(50, qty || 1));

  return (
    <>
      <PageHero img="/assets/img/stock/picnic-pizza.jpg" crumb="Coupons" eyebrow="Food & drink coupons" title="One sheet. Every booth."
        lead={`Entry is free. Food and drinks are paid with $1 coupons: ${E.couponsPerSheet} on a sheet for $${E.sheetPrice}.`}>
        <div className="row mt-6"><a className="btn btn-light" href="#buy">Buy coupons</a></div>
      </PageHero>

      {/* 1. How it works */}
      <section className="section">
        <div className="container">
          <div className="section-head center"><span className="eyebrow">How it works</span><h2>Three simple steps.</h2></div>
          <ol className="steps-3">
            {STEPS.map((s, n) => (
              <li key={s.title}>
                <span className="num">{n + 1}</span>
                <Icon name={s.icon} />
                <h3>{s.title}</h3>
                <p className="muted mb-0">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 2. Buy */}
      <section className="section alt" id="buy">
        <div className="container coupon-buy">
          <div className="coupon-preview"><CouponSheet /></div>

          <div className="buy-box">
            <span className="eyebrow">Buy online, skip the line</span>
            <h2 style={{ fontSize: "2rem" }}>Coupon sheet</h2>
            <p className="muted">{E.couponsPerSheet} × $1 coupons. Show your order QR code at any Coupon Booth to pick up your sheets.</p>

            <div className="row mt-6" style={{ justifyContent: "space-between" }}>
              <div><div className="label" style={{ fontWeight: 700 }}>How many sheets?</div><div className="small muted">{q * E.couponsPerSheet} coupons in total</div></div>
              <div className="stepper" role="group" aria-label="Number of sheets">
                <button type="button" aria-label="Fewer sheets" disabled={q <= 1} onClick={() => setQty(q - 1)}><Icon name="minus" /></button>
                <QtyInput value={q} max={50} label="Sheets" onChange={setQty} />
                <button type="button" aria-label="More sheets" disabled={q >= 50} onClick={() => setQty(q + 1)}><Icon name="plus" /></button>
              </div>
            </div>

            <div className="total-line"><span>Total</span><span className="amt">{money(q * E.sheetPrice)}</span></div>
            <button className="btn btn-lg btn-block" onClick={() => add("sheet", q, "", { open: true })}><Icon name="cart" />Add to cart</button>
            <div className="secure"><Icon name="lock" />Secure checkout with Stripe</div>
            <p className="small center mt-4 mb-0">Buying for someone else? <button className="link-btn" onClick={() => add("egift", 1, "", { open: true })}>Send a gift sheet by email</button></p>
          </div>
        </div>
      </section>

      {/* 3. Good to know */}
      <section className="section">
        <div className="container narrow">
          <div className="section-head center"><span className="eyebrow">Good to know</span><h2>The fine print, made simple.</h2></div>
          <ul className="facts-list">
            {FACTS.map(([i, t]) => <li key={t}><Icon name={i} />{t}</li>)}
          </ul>
          <p className="center small muted mt-6 mb-0">More questions? See the <Link to="/about#faq">FAQ</Link> or our <Link to="/legal#refunds">refund policy</Link>.</p>
        </div>
      </section>
    </>
  );
}
