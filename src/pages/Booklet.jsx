import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { event as E, restaurants as R, schedule } from "../data.js";
import { Icon, PageHero } from "../lib/ui.jsx";
import { SiteMap } from "../components/Festival.jsx";

const Dir = ({ rs }) => (
  <ul className="dir">{rs.map((r) => <li key={r.id}><div className="h">{r.name}<span>{r.booth}</span></div><div className="m">{r.menu.map((m) => `${m[0]} · ${m[1]}`).join("  /  ")}</div></li>)}</ul>
);
const Mini = ({ rows }) => <div className="mini-sched">{rows.map((s) => <div key={s[0]}><b>{s[0]}</b><span>{s[1]}</span></div>)}</div>;

const SPREADS = [
  [<div className="bpage cover"><span className="tagline" style={{ color: "#fff" }}>Official festival guide · {E.year}</span><img src="/assets/img/logo-white.png" alt="Taste of BC" style={{ width: "80%", margin: "auto" }} /><div><h3>{E.datesShort}</h3><p className="mb-0" style={{ opacity: 0.9 }}>{E.city} · Free entry</p></div></div>,
   <div className="bpage"><div className="ad-slot full"><div>Inside front cover<b>Presenting Partner</b>Full-page advertisement</div></div><span className="pno">2</span></div>],
  [<div className="bpage"><h4 className="bh">Welcome</h4><p className="small">Welcome to Taste of BC — four days of local food, BC wines, live entertainment and local artists. A not-for-profit community event.</p><h4 className="bh mt-4" style={{ fontSize: "1.1rem" }}>How coupons work</h4><ul className="kbd-list small"><li><Icon name="check" /><span>Entry is free at every arch.</span></li><li><Icon name="check" /><span>Buy a sheet of 20 × $1 coupons ($20) at any Coupon Booth.</span></li><li><Icon name="check" /><span>Menus are priced in coupons. No cash at booths.</span></li></ul><span className="pno">3</span></div>,
   <div className="bpage"><h4 className="bh">Contents</h4><ol className="toc">{[["Welcome & coupons", 3], ["Site map", 5], ["Food & drink", 6], ["Our partners", 8], ["Entertainment", 9], ["Thank you", 10]].map(([t, p]) => <li key={t}><span>{t}</span><span /><span>{p}</span></li>)}</ol><div className="ad-slot mt-6" style={{ height: 120 }}>Half-page ad</div><span className="pno">4</span></div>],
  [<div className="bpage"><h4 className="bh">Site map</h4><div style={{ flex: 1, display: "grid", placeItems: "center" }}><SiteMap /></div><span className="pno">5</span></div>,
   <div className="bpage"><h4 className="bh">Food & drink</h4><Dir rs={R.slice(0, 8)} /><span className="pno">6</span></div>],
  [<div className="bpage"><h4 className="bh">Food & drink (cont.)</h4><Dir rs={R.slice(8, 16)} /><span className="pno">7</span></div>,
   <div className="bpage"><h4 className="bh">Our partners</h4><div className="ads"><div className="ad-slot">Half page · Stage partner</div><div className="ad-slot">Quarter page</div><div className="ad-slot">Quarter page</div><div className="ad-slot">Quarter page</div><div className="ad-slot">Quarter page</div></div><span className="pno">8</span></div>],
  [<div className="bpage"><h4 className="bh">Entertainment</h4><p className="small" style={{ fontWeight: 800 }}>Thursday & Friday</p><Mini rows={[...schedule.Thursday.slice(1, 4), ...schedule.Friday.slice(1, 4)]} /><p className="small mt-4" style={{ fontWeight: 800 }}>Saturday & Sunday</p><Mini rows={[...schedule.Saturday.slice(1, 4), ...schedule.Sunday.slice(1, 4)]} /><span className="pno">9</span></div>,
   <div className="bpage cover" style={{ justifyContent: "center", textAlign: "center", gap: 20 }}><h3>Thank you</h3><p style={{ opacity: 0.9 }}>to our partners, restaurants, performers and volunteers.</p><div className="ad-slot" style={{ background: "#fff", border: 0, color: "var(--red)", height: 120 }}>Back cover · Presenting partner</div><img src="/assets/img/logo-white.png" alt="" style={{ width: "46%", margin: "0 auto" }} /></div>]
];

export default function Booklet() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const k = (e) => { if (e.key === "ArrowRight") setI((n) => Math.min(SPREADS.length - 1, n + 1)); if (e.key === "ArrowLeft") setI((n) => Math.max(0, n - 1)); };
    addEventListener("keydown", k); return () => removeEventListener("keydown", k);
  }, []);
  return (
    <>
      <PageHero img="/assets/img/stock/wine-cheese.jpg" crumb="Info Booklet" eyebrow="Official festival guide" title="The info booklet."
        lead="Free at every gate. Every food and drink booth with its menu, the site map, the entertainment schedule and the partners who keep entry free.">
        <div className="row mt-6"><button className="btn" disabled><Icon name="download" />PDF available in August</button><a className="btn btn-secondary" href="#advertise">Advertise in the booklet</a></div>
      </PageHero>

      <section className="section alt">
        <div className="container">
          <div className="booklet-stage" aria-live="polite">{SPREADS[i][0]}{SPREADS[i][1]}</div>
          <div className="booklet-nav">
            <button className="round-btn" aria-label="Previous spread" disabled={i === 0} onClick={() => setI(i - 1)}><Icon name="arrowL" /></button>
            <span className="pg">Spread {i + 1} of {SPREADS.length}</span>
            <button className="round-btn" aria-label="Next spread" disabled={i === SPREADS.length - 1} onClick={() => setI(i + 1)}><Icon name="arrow" /></button>
          </div>
        </div>
      </section>

      <section className="section" id="advertise">
        <div className="container split">
          <div>
            <span className="eyebrow">Advertise</span>
            <h2>Put your brand in every visitor’s hands.</h2>
            <p className="lead">The booklet is handed out at every gate and kept all day for the map, menus and schedule. Ad space is limited.</p>
            <Link className="btn mt-4" to="/partners">View the media kit</Link>
          </div>
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <table className="order-table" style={{ margin: 0 }}>
              <thead><tr><th style={{ paddingLeft: 24 }}>Placement</th><th style={{ paddingRight: 24 }}>Rate</th></tr></thead>
              <tbody>{["Back cover", "Inside front cover", "Full page", "Half page", "Quarter page"].map((p) => <tr key={p}><td style={{ paddingLeft: 24 }}>{p}</td><td style={{ paddingRight: 24 }}>$XX</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
