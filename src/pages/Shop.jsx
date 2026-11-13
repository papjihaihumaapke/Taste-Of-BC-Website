import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data.js";
import { Icon, PageHero, QtyInput, money } from "../lib/ui.jsx";
import { useStore } from "../lib/store.jsx";

const COLOURS = [["tee-r", "Red", "#C8102E"], ["tee-w", "White", "#fff"]];
const SIZES = ["S", "M", "L", "XL", "XXL"];

export default function Shop() {
  const { add } = useStore();
  const [c, setC] = useState(0);
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [kind, setKind] = useState("all");
  const tee = products.find((p) => p.id === COLOURS[c][0]);
  const shown = products.filter((p) => kind === "all" || (kind === "merch" ? p.kind === "merch" : p.kind !== "merch"));

  return (
    <>
      <PageHero img="/assets/img/stock/../merch-tote-mug.jpg" crumb="Shop" eyebrow="Official shop" title="Take a taste home."
        lead="Festival totes, mugs and tees, plus Tasty Bucks sheets and e-gifts. Merch ordered online is picked up at the Info Booth by the North Gate." />

      <section className="section">
        <div className="container pd">
          <div>
            <div className="media"><img src={tee.img} alt={tee.name} /></div>
            <div className="thumbs" role="group" aria-label="Choose colour">
              {COLOURS.map(([id, l], n) => {
                const p = products.find((x) => x.id === id);
                return <button key={id} aria-pressed={c === n} onClick={() => setC(n)}><img src={p.img} alt={l + " tee"} /></button>;
              })}
            </div>
          </div>
          <div>
            <span className="badge solid">Bestseller</span>
            <h2 className="mt-4">{tee.name}</h2>
            <div className="price-row"><span className="price">${tee.price}</span><span className="muted">CAD</span></div>
            <p className="lead">Soft, heavyweight cotton with the full Taste of BC logo. Unisex fit.</p>
            <div className="field mt-6"><span className="label">Colour</span>
              <div className="swatches">{COLOURS.map(([id, l, bg], n) => <button key={id} className={"swatch" + (c === n ? " on" : "")} style={{ background: bg }} aria-label={l} aria-pressed={c === n} onClick={() => setC(n)} />)}</div></div>
            <div className="field mt-6"><span className="label">Size</span>
              <div className="sizes" role="radiogroup" aria-label="Size">
                {SIZES.map((s) => <label key={s}><input type="radio" name="size" value={s} checked={size === s} onChange={() => setSize(s)} /><span>{s}</span></label>)}
              </div></div>
            <div className="row mt-6">
              <div className="stepper" role="group" aria-label="Quantity">
                <button type="button" aria-label="Decrease" disabled={qty <= 1} onClick={() => setQty(qty - 1)}><Icon name="minus" /></button>
                <QtyInput value={qty} max={20} onChange={setQty} />
                <button type="button" aria-label="Increase" disabled={qty >= 20} onClick={() => setQty(qty + 1)}><Icon name="plus" /></button>
              </div>
              <button className="btn btn-lg" style={{ flex: 1 }} onClick={() => add(tee.id, qty, "Size " + size)}><Icon name="cart" />Add to cart</button>
            </div>
            <ul className="kbd-list mt-6 small">
              <li><Icon name="store" /><div><strong>Pick up at the festival</strong><span>Collect from the Info Booth, North Gate</span></div></li>
              <li><Icon name="lock" /><div><strong>Secure checkout</strong><span>Payments processed by Stripe</span></div></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="container">
          <div className="section-head split"><div><span className="eyebrow">All products</span><h2>Merch & Tasty Bucks.</h2></div>
            <div className="chips row" role="group" aria-label="Filter products">
              {[["all", "All"], ["merch", "Merch"], ["coupon", "Tasty Bucks & gifts"]].map(([k, l]) => <button key={k} className="chip" aria-pressed={kind === k} onClick={() => setKind(k)}>{l}</button>)}
            </div></div>
          <div className="grid grid-4">
            {shown.map((p) => (
              <article className="p-card" key={p.id}>
                <div className="media">
                  {p.img ? <img src={p.img} alt={p.name} loading="lazy" /> : (
                    <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", background: p.kind === "gift" ? "var(--ink)" : "var(--red)" }}>
                      <div className="mini-coupon" style={{ transform: "scale(1.4)" }}><div><b>$1</b><small>× 20</small></div></div>
                    </div>)}
                  {p.kind !== "merch" && <span className="badge dark">No shipping</span>}
                </div>
                <div className="p-body"><h3>{p.name}</h3><span className="small muted">{p.note}</span><span className="p-price">{money(p.price)}</span>
                  <div className="p-actions"><button className="btn btn-sm btn-block" onClick={() => add(p.id)}><Icon name="cart" />Add to cart</button></div></div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
