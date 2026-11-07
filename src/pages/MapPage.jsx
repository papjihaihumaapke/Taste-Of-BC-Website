import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { restaurants } from "../data.js";
import { Icon, PageHero } from "../lib/ui.jsx";
import { RestaurantCard, SiteMap } from "../components/Festival.jsx";

const LEGEND = [
  [{ background: "#BC0214", borderRadius: 13, width: 40 }, "GATE", "Entrance arch (free entry)"],
  [{ background: "#BC0214", borderRadius: "50%" }, "C", "Coupon Booth (card & tap)"],
  [{ background: "#BC0214" }, "A1", "Food & drink booth"],
  [{ background: "#7A0410" }, "BG", "Licensed booth (19+)"],
  [{ background: "#1A1A1A", borderRadius: "50%" }, "i", "Info booth & lost and found"],
  [{ background: "#1E7A46", borderRadius: "50%" }, "+", "First aid"],
  [{ background: "#3D3A38", borderRadius: "50%" }, "W", "Washrooms (accessible)"],
  [{ background: "#3D3A38", borderRadius: "50%" }, "♿", "Accessible drop-off"],
  [{ background: "transparent", border: "2px dotted #BC0214" }, "", "Sponsor banners (perimeter)"]
];

export default function MapPage() {
  const [params] = useSearchParams();
  const [booth, setBooth] = useState(params.get("booth"));
  const r = restaurants.find((x) => x.booth === booth);
  return (
    <>
      <PageHero crumb="Festival Map" eyebrow="Site layout" title="Festival map."
        lead="Three entrance arches, a Coupon Booth at every gate, two stages, the BC Wine Garden and every food booth by number. Tap a booth to see its menu." />

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container map-layout">
          <div className="map-frame"><SiteMap interactive active={booth} onSelect={setBooth} /></div>
          <aside className="map-panel">
            {r ? <RestaurantCard r={r} full footLink={<Link to="/food-and-drink">All menus <Icon name="arrow" /></Link>} />
              : booth ? <div className="card"><h3>Booth {booth}</h3><p className="muted mb-0">Vendor to be announced.</p></div>
              : <div className="card"><div className="icon-tile"><Icon name="pin" /></div><h3>Select a booth</h3><p className="muted mb-0">Tap any red booth on the map to see its menu.</p></div>}
            <div className="card">
              <h4>Legend</h4>
              <div className="legend">
                {LEGEND.map(([st, ch, l]) => <div className="legend-item" key={l}><i style={st}>{ch}</i>{l}</div>)}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section white">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Entrances</span><h2>Pick any arch. They’re all free.</h2></div>
          <div className="grid grid-3">
            <div className="card"><span className="badge solid">Main entrance</span><h3 className="mt-4">North Gate</h3><p className="muted">Closest to parking, rideshare and transit drop-off. Info Booth and Coupon Booth just inside.</p></div>
            <div className="card"><span className="badge neutral">Side entrance</span><h3 className="mt-4">West Gate</h3><p className="muted">Accessible drop-off and the fastest route to the Community Stage and Family Zone.</p></div>
            <div className="card"><span className="badge neutral">Side entrance</span><h3 className="mt-4">East Gate</h3><p className="muted">Straight to the BC Wine Garden (19+, ID required) and the Artisan Market.</p></div>
          </div>
          <p className="small muted mt-6">Layout shown is a planning draft and may change before the event. The final map is printed in the info booklet.</p>
        </div>
      </section>
    </>
  );
}
