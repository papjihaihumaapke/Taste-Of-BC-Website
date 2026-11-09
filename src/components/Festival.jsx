import { useState } from "react";
import { Link } from "react-router-dom";
import { event as E, restaurants } from "../data.js";
import { Icon, Wave } from "../lib/ui.jsx";

export const DIET = { V: "Vegetarian", VG: "Vegan", GF: "Gluten-free options", Halal: "Halal" };
export const GROUP = { food: "Food", sweets: "Sweets", drinks: "Cold drinks", licensed: "Beer & Wine (19+)" };

/* ---- Coupon sheet: front (20 × $1) + back (sponsors) ---- */
export function CouponSheet({ interactive = false, torn = new Set(), onTear, flipped = false, style }) {
  return (
    <div className={"sheet" + (flipped ? " flipped" : "")} style={style}>
      <div className="sheet-face front" aria-hidden={flipped}>
        <div className="sheet-top"><img src="/assets/img/logo-red.png" alt="Taste of BC" />
          <div className="meta"><b>20 × $1 COUPONS</b>{E.datesShort}<br />{E.city}</div></div>
        <div className="coupons">
          {Array.from({ length: E.couponsPerSheet }, (_, i) => (
            <button type="button" key={i} className={"coupon" + (torn.has(i) ? " torn" : "")} disabled={!interactive}
              tabIndex={interactive ? 0 : -1} aria-label={`Tear off $1 coupon ${i + 1}`} onClick={() => onTear?.(i)}>
              <img className="mk" src="/assets/img/mark-circle.png" alt="" />
              <span className="val">${E.couponValue}</span><span className="lbl">Taste of BC</span>
              <span className="no">No. {String(i + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <div className="sheet-foot"><span>Tear along perforation · Valid all {E.days} festival days</span><span>No cash value · Sheet #000000</span></div>
      </div>
      <div className="sheet-face back" aria-hidden={!flipped}>
        <div className="sheet-back-head"><span className="tagline">Food<span>•</span>Beverage<span>•</span>Entertainment</span><h4>Thank you to our partners</h4></div>
        <div className="sponsor-slots">
          <div className="sponsor-slot big">Presenting partner</div>
          <div className="sponsor-slot med">Gate partner</div><div className="sponsor-slot med">Stage partner</div>
          {Array.from({ length: 8 }, (_, i) => <div className="sponsor-slot" key={i}>Sponsor logo</div>)}
        </div>
        <div className="sheet-foot"><span>Advertise here: tasteofbc.ca/sponsorship</span><span>{E.email}</span></div>
      </div>
    </div>
  );
}

/* ---- Restaurant card (mirrors the on-site booth banner) ---- */
export function RestaurantCard({ r, full = false, footLink }) {
  return (
    <article className="r-card">
      <div className="r-banner">
        <span className="booth">Booth {r.booth}</span>
        <span className="cat">{r.cuisine}</span>
        <h3>{r.name}</h3>
        <p>{GROUP[r.group]}</p>
        <Wave className="w" />
      </div>
      <div className="r-body">
        <ul className="r-menu" aria-label="Menu">
          {(full ? r.menu : r.menu.slice(0, 3)).map(([n, p]) => (
            <li key={n}><span>{n}</span><span className="dots" /><span className="pr">{p} <small>coupons</small></span></li>
          ))}
        </ul>
        <div className="r-tags">
          {r.group === "licensed" && <span className="badge dark">19+</span>}
          {r.diet.map((d) => <span className="diet" title={DIET[d]} key={d}>{d}</span>)}
        </div>
        <div className="r-foot"><span>1 coupon = $1</span>
          {footLink || <Link to={`/map?booth=${r.booth}`}><Icon name="pin" />Find on map</Link>}
        </div>
      </div>
    </article>
  );
}

/* ---- Festival site map (SVG) ---- */
const BOOTHS = {
  A1: [120, 128], A2: [194, 128], A3: [268, 128], A4: [342, 128],
  B1: [594, 128], B2: [668, 128], B3: [742, 128], B4: [816, 128],
  C1: [120, 236], C2: [194, 236], C3: [268, 236], C4: [342, 236],
  D1: [652, 236], D2: [726, 236],
  BG1: [668, 382], BG2: [762, 382]
};
const Gate = ({ x, y, label, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x="-46" y="-13" width="92" height="26" rx="13" fill="#C8102E" />
    <path d="M-30 13V0c0-10 13-17 30-17s30 7 30 17v13" fill="none" stroke="#C8102E" strokeWidth="5" />
    <text x="0" y="5" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#fff" letterSpacing=".04em">{label}</text>
  </g>
);
const Poi = ({ x, y, ch, fill, lbl }) => (
  <g><circle cx={x} cy={y} r="13" fill={fill} /><text x={x} y={y + 4.5} textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">{ch}</text>
    {lbl && <text x={x} y={y + 28} textAnchor="middle" fontSize="10" fontWeight="700" fill="#3D3A38">{lbl}</text>}</g>
);
const Zone = ({ x, y, w, h, title, sub, fill = "#fff", stroke = "#D6CEC5", tc = "#1A1A1A" }) => (
  <g><rect x={x} y={y} width={w} height={h} rx="12" fill={fill} stroke={stroke} strokeWidth="1.5" />
    <text x={x + w / 2} y={y + h / 2 - (sub ? 2 : -4)} textAnchor="middle" fontSize="13" fontWeight="800" fill={tc}>{title}</text>
    {sub && <text x={x + w / 2} y={y + h / 2 + 15} textAnchor="middle" fontSize="10.5" fontWeight="600" fill={tc} opacity=".8">{sub}</text>}</g>
);
const RowLabel = ({ x, y, t }) => <text x={x} y={y} textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#5E5953" letterSpacing=".12em">{t}</text>;

export function SiteMap({ interactive = false, active, onSelect }) {
  const byBooth = Object.fromEntries(restaurants.map((r) => [r.booth, r]));
  const key = (id) => (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect?.(id); } };
  return (
    <svg className="map-svg" viewBox="0 0 1000 620" role="img" aria-label="Festival site map showing entrance arches, coupon booths, food booths, two stages, BC Wine Garden, live art zone, family zone and facilities">
      <rect width="1000" height="620" fill="#F4EDE4" rx="16" />
      <text x="500" y="30" textAnchor="middle" fontSize="12" fontWeight="800" fill="#5E5953" letterSpacing=".14em">PARKING · RIDESHARE · TRANSIT ↑</text>
      <rect x="60" y="70" width="880" height="490" rx="28" fill="#FCF8F3" stroke="#D6CEC5" strokeWidth="2" />
      <rect x="48" y="58" width="904" height="514" rx="36" fill="none" stroke="#C8102E" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />
      <text x="500" y="595" textAnchor="middle" fontSize="11" fontWeight="700" fill="#C8102E" letterSpacing=".12em">· · · SPONSOR BANNERS AROUND THE FIELD PERIMETER · · ·</text>
      <path d="M500 84V560M74 315H926" stroke="#EDE5DA" strokeWidth="34" strokeLinecap="round" />
      <Zone x={420} y={196} w={160} h={96} title="Shaded Dining" sub="Seating · water station" />
      <Zone x={400} y={440} w={200} h={90} title="MAIN STAGE" sub="Live music · headliners" fill="#1A1A1A" stroke="#1A1A1A" tc="#fff" />
      <Zone x={110} y={350} w={170} h={70} title="Community Stage" sub="Dance · comedy · demos" />
      <Zone x={110} y={448} w={190} h={86} title="Family Zone" sub="Games · face painting" />
      <Zone x={760} y={196} w={150} h={96} title="Live Art Zone" sub="Local artists" />
      <g><rect x="630" y="345" width="250" height="185" rx="14" fill="#FBEAEC" stroke="#C8102E" strokeWidth="2" strokeDasharray="7 5" />
        <text x="755" y="370" textAnchor="middle" fontSize="13" fontWeight="800" fill="#7A0410">BC Wine Garden · 19+</text>
        <text x="755" y="470" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#7A0410">Licensed seating · ID checked at entry</text></g>
      <RowLabel x={268} y={116} t="ROW A" /><RowLabel x={742} y={116} t="ROW B" /><RowLabel x={268} y={300} t="ROW C" /><RowLabel x={689} y={300} t="ROW D" />
      {Object.entries(BOOTHS).map(([id, [x, y]]) => {
        const r = byBooth[id];
        return (
          <g key={id} className={"booth-g" + (active === id ? " active" : "")}
            {...(interactive ? { tabIndex: 0, role: "button", "aria-label": `Booth ${id}${r ? ": " + r.name : ""}`, onClick: () => onSelect?.(id), onKeyDown: key(id) } : {})}>
            <rect className="booth-r" x={x} y={y} width="64" height="44" rx="8" fill={id.startsWith("BG") ? "#7A0410" : "#C8102E"} />
            <text x={x + 32} y={y + 27} textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff" pointerEvents="none">{id}</text>
          </g>
        );
      })}
      <Poi x={560} y={110} ch="i" fill="#1A1A1A" lbl="Info" />
      <Poi x={440} y={110} ch="C" fill="#C8102E" lbl="Coupons" />
      <Poi x={110} y={290} ch="C" fill="#C8102E" />
      <Poi x={890} y={290} ch="C" fill="#C8102E" />
      <Poi x={620} y={470} ch="+" fill="#1E7A46" lbl="First aid" />
      <Poi x={345} y={395} ch="W" fill="#3D3A38" lbl="Washrooms" />
      <Poi x={600} y={290} ch="W" fill="#3D3A38" lbl="Washrooms" />
      <Poi x={90} y={205} ch="♿" fill="#3D3A38" />
      <Gate x={500} y={70} label="NORTH GATE" />
      <Gate x={60} y={315} label="WEST GATE" rot={-90} />
      <Gate x={940} y={315} label="EAST GATE" rot={90} />
      <text x="500" y="46" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#C8102E">MAIN ENTRANCE</text>
    </svg>
  );
}

/* Schedule list for one day */
export const ScheduleList = ({ rows }) => (
  <div className="schedule">
    {rows.map((s) => (
      <div className="slot" key={s[0] + s[1]}><time>{s[0]}</time><div><h4>{s[1]}</h4>{s[2] && <p>{s[2]}</p>}</div><span className="badge neutral">{s[3]}</span></div>
    ))}
  </div>
);

/* Accessible tabs */
export function Tabs({ label, tabs, initial = 0 }) {
  const [i, setI] = useState(initial);
  const keys = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault(); const n = (i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length; setI(n);
    e.currentTarget.querySelectorAll("[role=tab]")[n].focus();
  };
  return (
    <>
      <div className="tabs" role="tablist" aria-label={label} onKeyDown={keys}>
        {tabs.map((t, n) => (
          <button key={t.id} role="tab" id={"t-" + t.id} aria-selected={i === n} aria-controls={"p-" + t.id} tabIndex={i === n ? 0 : -1} onClick={() => setI(n)}>{t.label}</button>
        ))}
      </div>
      {tabs.map((t, n) => (
        <div key={t.id} className="tab-panel" id={"p-" + t.id} role="tabpanel" aria-labelledby={"t-" + t.id} hidden={i !== n}>{t.content}</div>
      ))}
    </>
  );
}

/* Photo mosaic */
export const Gallery = ({ items }) => (
  <div className="gallery">
    {items.map((g) => (
      <figure key={g.img}><img src={g.img} alt={g.alt} loading="lazy" /><figcaption>{g.label}</figcaption></figure>
    ))}
  </div>
);
