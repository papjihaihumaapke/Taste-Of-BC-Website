import { useState } from "react";
import { Link } from "react-router-dom";
import { event as E } from "../data.js";
import { Icon, PageHero, money } from "../lib/ui.jsx";
import { useStore } from "../lib/store.jsx";
import { CouponSheet } from "../components/Festival.jsx";

const FAQ = [
  ["Do I need a ticket to get in?", <>No. Entry is free for everyone, all four days. You only need coupons to buy food and drinks.</>],
  ["Can I pay a booth with cash or card directly?", <>No. Booths only accept Taste of BC coupons. Buy coupons online, or at a Coupon Booth by card or tap.</>],
  ["What happens to coupons I don’t use?", <>Coupons are valid on all four festival days. They have no cash value and can’t be exchanged for money after the event. See our <Link to="/legal#refunds">refund policy</Link>.</>],
  ["I lost my sheet. Can it be replaced?", <>Coupons work like cash, so lost or stolen coupons can’t be replaced.</>],
  ["Who are the logos on the back?", <>Our sponsors. Their support keeps entry free. <Link to="/sponsors">Want your brand on the back of every sheet?</Link></>]
];

export default function Coupons() {
  const { add } = useStore();
  const [torn, setTorn] = useState(new Set());
  const [flipped, setFlipped] = useState(false);
  const [kind, setKind] = useState("sheet");
  const [qty, setQty] = useState(1);
  const q = Math.max(1, Math.min(50, qty || 1));

  return (
    <>
      <PageHero crumb="Coupons" eyebrow="Food & drink coupons" title={<>Free to enter.<br /><span className="accent">$1 coupons</span> to taste.</>}
        lead="Taste of BC is a cashless event. Every restaurant, dessert stand and drinks bar takes the same $1 festival coupon. One sheet = 20 coupons = $20." />

      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <div className="sheet-wrap">
              <CouponSheet interactive torn={torn} flipped={flipped} onTear={(i) => setTorn(new Set(torn).add(i))} />
            </div>
            <div className="sheet-controls">
              <button className="btn btn-secondary btn-sm" onClick={() => setFlipped(!flipped)}><Icon name="flip" />{flipped ? "See the front" : "See the back"}</button>
              <button className="btn btn-ghost btn-sm" onClick={() => setTorn(new Set())}><Icon name="reset" />Reset coupons</button>
            </div>
            <p className="center small muted mt-4">Tip: tap a coupon to tear it off. <strong>{E.couponsPerSheet - torn.size}</strong> left on this sheet.</p>
          </div>

          <div className="buy-box" id="buy">
            <span className="badge solid"><Icon name="star" />Skip the line</span>
            <h2 className="mt-4" style={{ fontSize: "2rem" }}>Buy coupon sheets</h2>
            <p className="muted">Pre-buy online and collect your sheets at any Coupon Booth by showing your order QR code.</p>
            <fieldset style={{ border: 0, padding: 0, margin: "24px 0 0" }}>
              <legend className="label" style={{ fontWeight: 700, marginBottom: 12 }}>Choose a sheet type</legend>
              <label className="option"><input type="radio" name="kind" value="sheet" checked={kind === "sheet"} onChange={() => setKind("sheet")} />
                <span className="o-body"><strong>Coupon sheet</strong><span>20 × $1 coupons · pick up at the festival</span></span><span className="o-price">$20</span></label>
              <label className="option"><input type="radio" name="kind" value="egift" checked={kind === "egift"} onChange={() => setKind("egift")} />
                <span className="o-body"><strong>Gift coupon sheet</strong><span>Emailed to someone special with a pickup code</span></span><span className="o-price">$20</span></label>
            </fieldset>
            {kind === "egift" && (
              <div className="field mt-6">
                <label htmlFor="giftEmail">Recipient’s email</label>
                <input className="input" id="giftEmail" type="email" placeholder="name@example.com" />
                <span className="hint">We’ll send the gift on your chosen date in checkout.</span>
              </div>
            )}
            <div className="row mt-6" style={{ justifyContent: "space-between" }}>
              <div><div className="label" style={{ fontWeight: 700 }}>Number of sheets</div><div className="small muted">{q * E.couponsPerSheet} coupons total</div></div>
              <div className="stepper" role="group" aria-label="Number of sheets">
                <button type="button" aria-label="Fewer sheets" disabled={q <= 1} onClick={() => setQty(q - 1)}><Icon name="minus" /></button>
                <input type="number" value={qty} min="1" max="50" aria-label="Sheets" onChange={(e) => setQty(parseInt(e.target.value) || "")} />
                <button type="button" aria-label="More sheets" disabled={q >= 50} onClick={() => setQty(q + 1)}><Icon name="plus" /></button>
              </div>
            </div>
            <div className="total-line"><span>Total</span><span className="amt">{money(q * E.sheetPrice)}</span></div>
            <button className="btn btn-lg btn-block" onClick={() => add(kind, q, "", { open: true })}><Icon name="cart" />Add to cart</button>
            <div className="secure"><Icon name="lock" />Secure checkout with Stripe · Card, Apple Pay, Google Pay</div>
            <hr />
            <div className="callout neutral"><Icon name="info" /><div><strong>Buying for a group?</strong><p>Most visitors use 1–2 sheets each. Sheets are shareable — tear off and hand them out.</p></div></div>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="container">
          <div className="section-head center"><span className="eyebrow">How coupons work</span><h2>One currency for the whole festival.</h2></div>
          <div className="grid grid-4">
            <div className="card flat"><div className="icon-tile"><Icon name="ticket" /></div><h4>1 coupon = $1</h4><p className="muted mb-0">Each sheet has 20 perforated coupons. Tear off as many as the menu price shows.</p></div>
            <div className="card flat"><div className="icon-tile"><Icon name="banner" /></div><h4>Prices on every banner</h4><p className="muted mb-0">Every booth shows its Taste of BC banner with the menu priced in coupons.</p></div>
            <div className="card flat"><div className="icon-tile"><Icon name="nocash" /></div><h4>No cash on site</h4><p className="muted mb-0">Booths don’t handle money. Coupon Booths take debit, credit and tap.</p></div>
            <div className="card flat"><div className="icon-tile"><Icon name="calendar" /></div><h4>Good all {E.days} days</h4><p className="muted mb-0">Coupons are valid Thursday to Sunday. Bring leftovers back another day.</p></div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container narrow">
          <div className="section-head center"><span className="eyebrow">Coupon FAQ</span><h2>Good questions.</h2></div>
          <div className="accordion">
            {FAQ.map(([q2, a], n) => (
              <details key={q2} open={n === 0}><summary>{q2}<span className="pm"><Icon name="plus" /></span></summary><div className="a-body"><p>{a}</p></div></details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
