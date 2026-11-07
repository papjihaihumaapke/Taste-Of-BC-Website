import { useState } from "react";
import { Link } from "react-router-dom";
import { restaurants } from "../data.js";
import { Icon, PageHero, WavesBg } from "../lib/ui.jsx";
import { RestaurantCard } from "../components/Festival.jsx";

const GROUPS = [["all", "All"], ["food", "Food"], ["sweets", "Sweets"], ["drinks", "Cold drinks"], ["licensed", "Beer & Wine 19+"]];
const DIETS = [["V", "Vegetarian"], ["VG", "Vegan"], ["GF", "Gluten-free"], ["Halal", "Halal"]];

export default function FoodDrink() {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("all");
  const [diets, setDiets] = useState([]);
  const term = q.trim().toLowerCase();
  const list = restaurants.filter((r) =>
    (group === "all" || r.group === group) && diets.every((d) => r.diet.includes(d)) &&
    (!term || (r.name + " " + r.cuisine + " " + r.menu.map((m) => m[0]).join(" ")).toLowerCase().includes(term)));
  const toggle = (d) => setDiets((x) => (x.includes(d) ? x.filter((y) => y !== d) : [...x, d]));
  const reset = () => { setQ(""); setGroup("all"); setDiets([]); };

  return (
    <>
      <PageHero crumb="Food & Drink" eyebrow="Local restaurants & BC wines" title="Food & drink."
        lead="Tasting-size dishes from local restaurants, plus BC wine, craft beer and cider. Every menu is priced in $1 coupons, exactly as it appears on the booth banner.">
        <div className="row mt-6"><span className="pill-note"><Icon name="info" />Sample menus shown. Participating restaurants will be announced soon.</span></div>
      </PageHero>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          <div className="filters">
            <div className="search">
              <Icon name="search" />
              <label className="sr-only" htmlFor="q">Search dishes</label>
              <input className="input" id="q" type="search" placeholder="Search dishes or cuisines" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <div className="chips" role="group" aria-label="Category">
              {GROUPS.map(([k, l]) => <button key={k} className="chip" aria-pressed={group === k} onClick={() => setGroup(k)}>{l}</button>)}
            </div>
          </div>
          <div className="row mb-6" role="group" aria-label="Dietary filters">
            <span className="small" style={{ fontWeight: 700, marginRight: 4 }}>Dietary:</span>
            {DIETS.map(([k, l]) => <button key={k} className="chip" aria-pressed={diets.includes(k)} onClick={() => toggle(k)}>{l}</button>)}
          </div>
          <p className="result-count" aria-live="polite">Showing {list.length} of {restaurants.length} booths</p>
          <div className="grid grid-3">{list.map((r) => <RestaurantCard key={r.id} r={r} full />)}</div>
          {!list.length && (
            <div className="empty"><div className="icon-tile" style={{ margin: "0 auto 14px" }}><Icon name="search" /></div><h3>No matches</h3><p>Try a different dish or clear your filters.</p><button className="btn btn-secondary btn-sm" onClick={reset}>Clear filters</button></div>
          )}
          <p className="small muted mt-6">Dietary labels are supplied by each vendor. Please ask at the booth about allergens.</p>
        </div>
      </section>

      <section className="section tight">
        <div className="container"><div className="cta-band"><WavesBg className="bgwave" />
          <div><h2>Run a BC restaurant, winery or brewery?</h2><p>Vendor applications are open. We supply the booth banner, menu board and coupon redemption.</p></div>
          <div className="actions"><Link className="btn btn-light btn-lg" to="/get-involved#vendors">Apply as a vendor</Link></div>
        </div></div>
      </section>
    </>
  );
}
