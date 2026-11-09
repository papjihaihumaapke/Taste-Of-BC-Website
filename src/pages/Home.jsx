import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { event as E, gallery, heroSlides, highlights, menuCategories } from "../data.js";
import { Countdown, Icon, Tbc } from "../lib/ui.jsx";
import { Gallery } from "../components/Festival.jsx";
import { FAQ } from "../lib/faq.jsx";
import { FaqList } from "./Faq.jsx";
import { InvolveTiles } from "./GetInvolved.jsx";
import { RestaurantPromo } from "../components/Promo.jsx";

const SLIDE_MS = 6000;

/* 3. Full-bleed hero slider: crossfade + slow Ken Burns zoom */
function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % heroSlides.length), SLIDE_MS);
    return () => clearInterval(t);
  }, [paused]);
  return (
    <section className={"hero" + (paused ? " paused" : "")} aria-labelledby="hero-title">
      {heroSlides.map((s, n) => (
        <div className={"slide" + (n === i ? " on" : "")} key={s.img} aria-hidden={n !== i}>
          <img src={s.img} alt={s.alt} width="1024" height="683" decoding="async"
            fetchPriority={n === 0 ? "high" : undefined} loading={n === 0 ? undefined : "lazy"} />
        </div>
      ))}
      <div className="container">
        <div className="hero-copy">
          <span className="eyebrow">{E.datesShort} · {E.city} · Free entry</span>
          <h1 id="hero-title">BC’s biggest food, beverage &amp; entertainment festival.</h1>
          <p className="sub">Four days of local restaurants, BC wines, live music and local artists — a not-for-profit celebration for the whole community.</p>
          <div className="hero-actions">
            <Link className="btn btn-lg" to="/coupons"><Icon name="ticket" />Buy Food Coupons</Link>
            <Link className="btn btn-lg btn-outline-light" to="/whats-on">See What’s On</Link>
          </div>
          <p className="hero-join">Restaurant, winery or beverage maker? <Link to="/vendors">Join the festival →</Link></p>
        </div>
        <div className="hero-meta">
          <p className="hero-caption mb-0" aria-live="polite">{heroSlides[i].title}</p>
          <div className="hero-dots" role="group" aria-label="Choose hero photo">
            {heroSlides.map((s, n) => (
              <button key={s.img + n} aria-label={`Photo ${n + 1} of ${heroSlides.length}: ${s.title}`} aria-current={n === i ? "true" : undefined}
                onClick={() => { setI(n); setPaused(true); }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 5. Infinite marquee (duplicated group for a seamless loop; the copy is hidden from screen readers) */
const MARQUEE = ["Local Restaurants", "BC Wine Garden", "Live Music", "Chef Demos", "Food Trucks", "Local Artists", "Family Zone"];
function Marquee() {
  const group = (hidden) => (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {MARQUEE.flatMap((t) => [<span key={t}>{t}</span>, <span className="sep" key={t + "-sep"}>✦</span>])}
    </div>
  );
  return (
    <div className="marquee">
      <p className="sr-only">{MARQUEE.join(" · ")}</p>
      <div className="marquee-track" aria-hidden="true">{group(true)}{group(true)}</div>
    </div>
  );
}

export const VISIT_CARDS = [
  { to: "/getting-there", title: "Getting There", text: "SkyTrain and transit, biking and walking, parking and rideshare drop-off.", more: "Directions", img: "/assets/img/stock/festival-crowd.jpg", alt: "Friends arriving at an outdoor festival" },
  { to: "/accessibility", title: "Accessibility", text: "Accessible entrances, washrooms, seating, service animals and a quiet area.", more: "Access information", img: "/assets/img/stock/crowd-lawn.jpg", alt: "Families relaxing on a sunny festival lawn" },
  { to: "/map", title: "Festival Map", text: "Find restaurants, food trucks, stages, the Wine Garden, first aid and washrooms.", more: "Open the map", img: "/assets/img/stock/picnic-pizza.jpg", alt: "Food shared on the grass at a festival" }
];

/* Photo-topped link cards (same style as What's On) */
export const PhotoCards = ({ items, cols = "three-up" }) => (
  <div className={"feature-grid " + cols}>
    {items.map((c) => (
      <Link className="f-card" to={c.to} key={c.title}>
        <div className="ph"><img src={c.img} alt={c.alt} loading="lazy" decoding="async" width="960" height="640" />{c.tag && <span className="tag">{c.tag}</span>}</div>
        <div className="body"><h3>{c.title}</h3><p>{c.text}</p><span className="more">{c.more || "Learn more"}<Icon name="arrow" /></span></div>
      </Link>
    ))}
  </div>
);

const PARTNERS = [
  { tier: "Presenting Partner", lead: true },
  { tier: "Stage Partner" },
  { tier: "Wine Garden Partner" },
  { tier: "Sponsor" }, { tier: "Sponsor" }, { tier: "Sponsor" }, { tier: "Sponsor" }
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Key info strip */}
      <section className="info" aria-label="Festival key facts">
        <div className="container">
          <div className="info-grid">
            <div><Icon name="calendar" /><div><strong>{E.datesShort}</strong><span>Thu–Sun · {E.hours}</span></div></div>
            <div><Icon name="pin" /><div><strong>{E.city}</strong><span>{E.venue || <>Venue <Tbc /></>}</span></div></div>
            <div><Icon name="arch" /><div><strong>Free admission</strong><span>All ages, subject to capacity</span></div></div>
            <div><Icon name="heart" /><div><strong>Not-for-profit</strong><span>A community event</span></div></div>
          </div>
          {!E.datesConfirmed && <p className="note"><Icon name="info" />Dates are tentative and will be confirmed soon.</p>}
        </div>
      </section>

      {/* Intro statement */}
      <section className="intro" aria-labelledby="intro-title">
        <div className="container">
          <span className="eyebrow" id="intro-title">About the festival</span>
          <div>
            <p className="statement">Taste of BC is the province’s most appetizing festival. Sample <em>BC’s best food, drinks, music and local makers</em>, all in one place.</p>
            <p className="more">Restaurants and beverage producers serve sample-size dishes from cuisines around the world, alongside live local musicians, artists and interactive activities.</p>
          </div>
        </div>
      </section>

      <Marquee />

      {/* Restaurant & maker recruitment */}
      <RestaurantPromo />

      {/* What's On */}
      <section className="section">
        <div className="container">
          <div className="section-head split">
            <div><span className="eyebrow">What’s on</span><h2>Food. Beverage. Entertainment.</h2></div>
            <Link className="link-arrow" to="/whats-on">Explore the festival</Link>
          </div>
          <div className="feature-grid">
            {highlights.map((h) => (
              <Link className="f-card" to={h.to} key={h.title}>
                <div className="ph">
                  <img src={h.img} alt={h.alt} loading="lazy" decoding="async" width="960" height="640" />
                  {h.tag && <span className="tag">{h.tag}</span>}
                </div>
                <div className="body">
                  <h3>{h.title}</h3>
                  <p>{h.text}</p>
                  <span className="more">Learn more<Icon name="arrow" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section alt">
        <div className="container">
          <div className="section-head split">
            <div>
              <span className="eyebrow">How it works</span>
              <h2>Skip the line, eat more.</h2>
              <p className="lead">Admission is free. Food and drinks are paid with $1 festival coupons.</p>
            </div>
            <Link className="link-arrow" to="/coupons">How coupons work</Link>
          </div>
          <ol className="steps-row">
            <li><span className="n" aria-hidden="true">01</span><h3>Walk in free</h3><p>General admission is free for all ages on all {E.days} days, subject to capacity.</p></li>
            <li><span className="n" aria-hidden="true">02</span><h3>Grab $1 coupons online or onsite</h3><p>Buy ahead online to skip the line, or pick some up at the festival <Tbc />.</p></li>
            <li><span className="n" aria-hidden="true">03</span><h3>Trade {E.couponRange} coupons per dish</h3><p>Every vendor booth lists its sample-size dishes in coupons <Tbc />. Tear off what you need and hand them over.</p></li>
          </ol>
          <div className="coupon-cta">
            <Link className="btn btn-lg" to="/coupons"><Icon name="ticket" />Buy Food Coupons</Link>
            <span className="stripe-line"><Icon name="lock" />Payments secured by Stripe</span>
          </div>
        </div>
      </section>

      {/* Menu teaser */}
      <section className="section">
        <div className="container">
          <div className="section-head split">
            <div><span className="eyebrow">The menu</span><h2>Menus are coming soon.</h2></div>
            <Link className="link-arrow" to="/menu">Browse the menu</Link>
          </div>
          <div className="feature-grid three-up">
            {menuCategories.map((c) => (
              <Link className="f-card" to={`/menu/${c.slug}`} key={c.slug}>
                <div className="ph"><img src={c.img} alt={c.alt} loading="lazy" decoding="async" width="960" height="640" /></div>
                <div className="body"><h3>{c.title}</h3><p>{c.text}</p><span className="more">View menu<Icon name="arrow" /></span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Festival gallery */}
      <section className="section alt">
        <div className="container">
          <div className="section-head split">
            <div><span className="eyebrow">The festival</span><h2>Taste it. Hear it. Share it.</h2></div>
            <Link className="link-arrow" to="/entertainment">See the schedule</Link>
          </div>
          <Gallery items={gallery} />
        </div>
      </section>


      {/* Countdown (charcoal) */}
      <section className="band" aria-labelledby="cd-title">
        <div className="container">
          <div>
            <span className="eyebrow">Countdown</span>
            <h2 id="cd-title">The gates open in…</h2>
            <p>Walk in free and pay for food and drinks with $1 festival coupons. Buy online to skip the line.</p>
            <div className="mt-8"><Countdown /></div>
          </div>
          <nav className="icon-links" aria-label="Festival information">
            <Link to="/entertainment"><Icon name="music" />Entertainment schedule</Link>
            <Link to="/coupons"><Icon name="ticket" />How coupons work</Link>
            <Link to="/map"><Icon name="map" />Festival map</Link>
            <Link to="/getting-there"><Icon name="train" />Getting there</Link>
            <Link to="/perform"><Icon name="star" />Perform at the festival</Link>
            <Link to="/faq"><Icon name="info" />FAQ</Link>
          </nav>
        </div>
      </section>

      {/* Plan your visit */}
      <section className="section alt">
        <div className="container">
          <div className="section-head split">
            <div><span className="eyebrow">Plan your visit</span><h2>Everything you need before you go.</h2></div>
            <Link className="link-arrow" to="/visit">Visitor guide</Link>
          </div>
          <PhotoCards items={VISIT_CARDS} />
        </div>
      </section>

      {/* Sponsors */}
      <section className="section">
        <div className="container">
          <div className="section-head split">
            <div><span className="eyebrow">Our partners</span><h2>Free entry, made possible by our sponsors.</h2></div>
            <Link className="link-arrow" to="/sponsorship#packages">Sponsorship packages</Link>
          </div>
          <div className="partner-grid">
            {PARTNERS.map((p, n) => (
              <div className={"partner-slot" + (p.lead ? " lead-tier" : "")} key={n}>
                <span className="tier-name">{p.tier}</span>
                <span className="logo-ph"><i aria-hidden="true" />Partner opportunity available</span>
              </div>
            ))}
          </div>
          <div className="partner-cta">
            <p>Four days, free entry and a big, diverse crowd from across the Lower Mainland. As a not-for-profit event, sponsorship is what keeps the gates free.</p>
            <Link className="btn btn-secondary" to="/sponsorship">Become a Sponsor</Link>
          </div>
        </div>
      </section>

      {/* Get involved */}
      <section className="section alt">
        <div className="container">
          <div className="section-head split">
            <div><span className="eyebrow">Get involved</span><h2>It takes a community to throw a festival.</h2></div>
            <Link className="link-arrow" to="/get-involved">All the ways to join</Link>
          </div>
          <InvolveTiles />
        </div>
      </section>

      {/* Good to know */}
      <section className="info" aria-label="Good to know" style={{ borderBottom: 0, paddingBottom: 0 }}>
        <div className="container">
          <span className="eyebrow">Good to know</span>
          <div className="info-grid mt-4">
            <div><Icon name="arch" /><div><strong>Free admission</strong><span>All ages, subject to capacity</span></div></div>
            <div><Icon name="heart" /><div><strong>Leashed pets welcome</strong><span>Keep pets on a leash</span></div></div>
            <div><Icon name="card" /><div><strong>Tap to pay <Tbc /></strong><span>For coupons onsite</span></div></div>
            <div><Icon name="wine" /><div><strong>All ages</strong><span>19+ in the BC Wine Garden</span></div></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container faq-layout">
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently asked questions</h2>
            <p>General questions, media requests or accessibility needs — we’re happy to help.</p>
            <div className="row"><Link className="btn btn-secondary" to="/faq">All FAQs</Link><Link className="btn btn-secondary" to="/contact">Contact us</Link></div>
          </div>
          <FaqList items={FAQ.slice(0, 7)} />
        </div>
      </section>
    </>
  );
}
