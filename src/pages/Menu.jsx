import { Link, Navigate, useParams } from "react-router-dom";
import { DIET_LABELS, event as E, menuAnnounce, menuCategories } from "../data.js";
import { Icon, PageHero, Tbc } from "../lib/ui.jsx";

/* "Buy your coupons in advance" banner, shared by the menu pages */
function CouponBanner({ flush = true }) {
  return (
    <section className="section" style={flush ? { paddingTop: 0 } : undefined}>
      <div className="container">
        <div className="cta-band">
          <div><h2>Buy your coupons in advance and skip the line.</h2>
            <p>$1 festival coupons, redeemable at every vendor booth. Dishes range from {E.couponRange} coupons.</p></div>
          <div className="actions"><Link className="btn btn-light btn-lg" to="/coupons"><Icon name="ticket" />Buy Food Coupons</Link></div>
        </div>
      </div>
    </section>
  );
}

function CategoryTiles({ exclude }) {
  return (
    <div className="feature-grid three-up">
      {menuCategories.filter((c) => c.slug !== exclude).map((c) => (
        <Link className="f-card" to={`/menu/${c.slug}`} key={c.slug}>
          <div className="ph"><img src={c.img} alt={c.alt} loading="lazy" decoding="async" width="960" height="640" /></div>
          <div className="body"><h3>{c.title}</h3><p>{c.text}</p><span className="more">View menu<Icon name="arrow" /></span></div>
        </Link>
      ))}
    </div>
  );
}

const DietLegend = () => (
  <div className="diet-legend" aria-label="Dietary tags">
    {Object.entries(DIET_LABELS).map(([k, l]) => <span key={k}><span className="diet">{k === "Nuts" ? "N" : k}</span>{l}</span>)}
  </div>
);

function VendorCard({ v }) {
  return (
    <article className="vendor-card">
      <div className="vc-head">
        <div className="vc-logo">{v.logo ? <img src={v.logo} alt={`${v.name} logo`} loading="lazy" /> : <Icon name="store" />}</div>
        <h3>{v.name}</h3>
      </div>
      <ul aria-label={`${v.name} menu`}>
        {v.dishes.map((d) => (
          <li key={d.name}>
            <span className="dish">{d.name}</span>
            <span className="cost">{d.coupons} <small className="muted" style={{ fontWeight: 600 }}>coupons</small></span>
            {d.diet?.length > 0 && <span className="tags">{d.diet.map((t) => <span className="diet" title={DIET_LABELS[t]} key={t}>{t === "Nuts" ? "N" : t}</span>)}</span>}
          </li>
        ))}
      </ul>
    </article>
  );
}

function ComingSoon() {
  return (
    <div className="coming-soon">
      <div className="icon-tile"><Icon name="utensils" /></div>
      <h3>Menus announced {menuAnnounce || <Tbc>Month</Tbc>}</h3>
      <p>We’re lining up BC’s best restaurants, food trucks and beverage producers. Join the newsletter to hear first when menus drop.</p>
      <div className="row"><a className="btn" href="#nl-email">Get menu updates</a><Link className="btn btn-secondary" to="/vendors">Become a vendor</Link></div>
    </div>
  );
}

export function MenuLanding() {
  return (
    <>
      <PageHero img="/assets/img/stock/grilled-salmon.jpg" crumb="Menu" eyebrow="The menu" title="Menus are coming soon."
        lead="Sample-size dishes from local restaurants, food trucks and BC beverage producers, all paid with $1 festival coupons." />
      <CouponBanner flush={false} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head"><span className="eyebrow">Browse by category</span><h2>Restaurants, trucks and BC drinks.</h2></div>
          <CategoryTiles />
        </div>
      </section>
    </>
  );
}

export function MenuCategory() {
  const { slug } = useParams();
  const cat = menuCategories.find((c) => c.slug === slug);
  if (!cat) return <Navigate to="/menu" replace />;
  return (
    <>
      <PageHero img={cat.img} crumb="Menu" eyebrow="The menu" title={cat.title} lead={cat.text} />
      <section className="section">
        <div className="container">
          <div className="section-head split">
            <div><span className="eyebrow">{cat.vendors.length ? `${cat.vendors.length} vendors` : "Lineup"}</span><h2>{cat.vendors.length ? "On the menu." : "Coming soon."}</h2></div>
            <DietLegend />
          </div>
          {cat.vendors.length ? <div className="vendor-grid">{cat.vendors.map((v) => <VendorCard v={v} key={v.name} />)}</div> : <ComingSoon />}
          {slug === "drinks" && <p className="small muted mt-6 mb-0">Alcohol is served in the BC Wine Garden to guests 19+ with valid ID.</p>}
        </div>
      </section>
      <CouponBanner />
      <section className="section alt">
        <div className="container">
          <div className="section-head"><span className="eyebrow">More menus</span><h2>Keep exploring.</h2></div>
          <div className="grid grid-2">
            {menuCategories.filter((c) => c.slug !== slug).map((c) => (
              <Link className="v-card" to={`/menu/${c.slug}`} key={c.slug}>
                <div className="icon-tile"><Icon name={c.slug === "drinks" ? "wine" : "utensils"} /></div>
                <h3>{c.title}</h3><p>{c.text}</p><span className="more">View menu</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
