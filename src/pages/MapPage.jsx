import { Link } from "react-router-dom";
import { Icon, PageHero, Tbc } from "../lib/ui.jsx";

/* Legend colours reuse the brand palette. TBC: replace the placeholder with the final site map image. */
const LEGEND = [
  ["#C8102E", "utensils", "Restaurants"],
  ["#C8102E", "store", "Food Trucks"],
  ["#7A0A1C", "wine", "BC Wine Garden (19+)"],
  ["#141414", "music", "Main Stage"],
  ["#3A3633", "sparkle", "Artisan Market"],
  ["#3A3633", "heart", "Family Zone"],
  ["#3A3633", "flag", "Chef Demo Kitchen"],
  ["#1E7A46", "plus", "First Aid"],
  ["#5F5A55", "access", "Washrooms"],
  ["#141414", "info", "Info Booth"]
];

export default function MapPage() {
  return (
    <>
      <PageHero img="/assets/img/stock/crowd-lawn.jpg" crumb="Festival Map" eyebrow="Plan your visit" title="Festival map."
        lead="Find restaurants, food trucks, the stages, the BC Wine Garden, the Artisan Market and every facility on site." />

      <section className="section">
        <div className="container map-layout">
          <div className="map-placeholder">
            <div>
              <Icon name="map" />
              <h3>Site map coming soon <Tbc /></h3>
              <p className="mb-0">The full festival layout will be posted once the venue is confirmed.</p>
            </div>
          </div>
          <aside className="map-panel">
            <div className="card">
              <h4>Legend</h4>
              <div className="legend">
                {LEGEND.map(([bg, icon, l]) => <div className="legend-item" key={l}><i style={{ background: bg }}><Icon name={icon} /></i>{l}</div>)}
              </div>
            </div>
            <div className="card">
              <h4>Getting around</h4>
              <p className="muted">Directions, parking and accessibility details for the festival site.</p>
              <div className="row"><Link className="link-arrow" to="/getting-there">Getting there</Link><Link className="link-arrow" to="/accessibility">Accessibility</Link></div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
