import { useState } from "react";
import { Link } from "react-router-dom";
import { event as E } from "../data.js";
import { Icon, PageHero, QtyInput, Tbc, money } from "../lib/ui.jsx";
import { useStore } from "../lib/store.jsx";
import { CouponSheet } from "../components/Festival.jsx";

const STEPS = [
  { icon: "ticket", title: "$1 each", text: "Every festival coupon is worth $1. Buy them online before you go, or onsite at the festival." },
  { icon: "utensils", title: <>{E.couponRange} coupons per dish <Tbc /></>, text: "Restaurants and beverage producers serve sample-size dishes, priced in coupons." },
  { icon: "scissors", title: "Redeem at any vendor booth", text: "Tear off the coupons you need and hand them to the vendor. That’s it." }
];

/* TBC: coupon bundles — set sizes and prices once confirmed */
const BUNDLES = [
  { name: "Starter bundle", note: "A quick taste for one" },
  { name: "Sharing bundle", note: "For two or a small group" },
  { name: "Family bundle", note: "For the whole crew" }
];

const FACTS = [
  ["calendar", `Valid on all ${E.days} festival days`],
  ["store", "Food and drink booths accept coupons only"],
  ["card", "Coupons can be bought with debit or credit"],
  ["info", "Coupons have no cash value and can’t be replaced if lost"]
];

/* TBC: answers to be confirmed by the festival team */
const COUPON_FAQ = [
  ["Do coupons expire?", <>Coupons are valid on all {E.days} festival days. <Tbc>Expiry policy</Tbc></>],
  ["Are coupons refundable?", <>Unused coupons bought online may be refunded up to <Tbc /> days before the festival. See the <Link to="/legal#refunds">refund policy</Link>.</>],
  ["Can I use leftover coupons next year?", <><Tbc>Policy</Tbc></>]
];

export default function Coupons() {
  const { add } = useStore();
  const [qty, setQty] = useState(1);
  const q = Math.max(1, Math.min(50, qty || 1));

  return (
    <>
      <PageHero img="/assets/img/stock/picnic-pizza.jpg" crumb="Coupons" eyebrow="Food & drink coupons" title="One coupon. Every booth."
        lead={`Admission is free. Food and drinks are paid with $1 festival coupons, and sample-size dishes range from ${E.couponRange} coupons.`}>
        <div className="row mt-6"><a className="btn btn-light" href="#buy">Buy Food Coupons</a><a className="btn btn-outline-light" href="#how">How it works</a></div>
      </PageHero>

      {/* How coupons work */}
      <section className="section" id="how">
        <div className="container">
          <div className="section-head"><span className="eyebrow">How it works</span><h2>Three simple steps.</h2></div>
          <ol className="steps-row">
            {STEPS.map((s, n) => (
              <li key={n}><span className="n" aria-hidden="true">{String(n + 1).padStart(2, "0")}</span><h3>{s.title}</h3><p>{s.text}</p></li>
            ))}
          </ol>
        </div>
      </section>

      {/* Buy online (Stripe) + onsite */}
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

      <section className="section">
        <div className="container">
          <div className="section-head split">
            <div><span className="eyebrow">Ways to buy</span><h2>Online or onsite.</h2></div>
            {/* TBC: link to the coupon balance checker once it exists */}
            <a className="link-arrow" href="#" onClick={(e) => e.preventDefault()}>Check your coupon balance <Tbc /></a>
          </div>
          <div className="grid grid-2">
            <div className="info-card">
              <div className="icon-tile"><Icon name="cart" /></div>
              <h3>Buy online</h3>
              <p>Order in advance with secure Stripe checkout, then pick up your coupons at any Coupon Booth. The fastest way in.</p>
              <span className="spacer" />
              <a className="btn" href="#buy">Buy Food Coupons</a>
            </div>
            <div className="info-card">
              <div className="icon-tile"><Icon name="store" /></div>
              <h3>Buy onsite <Tbc /></h3>
              <p>Coupon Booths at the festival entrances. Debit and credit accepted. Cash <Tbc />.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coupon bundles — TBC */}
      <section className="section alt" id="bundles">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Coupon bundles</span><h2>Bundles for every appetite.</h2>
            <p className="lead">Bundle sizes and prices will be announced before the festival.</p></div>
          <div className="grid grid-3">
            {BUNDLES.map((b) => (
              <div className="info-card" key={b.name}>
                <span className="eyebrow mb-0">{b.name}</span>
                <div className="price">$<Tbc /></div>
                <p><Tbc /> × $1 coupons · {b.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Good to know + small FAQ */}
      <section className="section">
        <div className="container faq-layout">
          <div className="section-head">
            <span className="eyebrow">Good to know</span>
            <h2>The fine print, made simple.</h2>
            <ul className="facts-list mt-6" style={{ gridTemplateColumns: "1fr" }}>
              {FACTS.map(([i, t]) => <li key={t}><Icon name={i} />{t}</li>)}
            </ul>
          </div>
          <div>
            <div className="accordion">
              {COUPON_FAQ.map(([q2, a], n) => (
                <details key={q2} open={n === 0}><summary>{q2}<span className="pm"><Icon name="plus" /></span></summary><div className="a-body"><p>{a}</p></div></details>
              ))}
            </div>
            <p className="small muted mt-6 mb-0">More questions? See the <Link to="/faq">FAQ</Link> or our <Link to="/legal#refunds">refund policy</Link>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
