import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { event as E, gallery, heroSlides, highlights } from "../data.js";
import { Countdown, Icon } from "../lib/ui.jsx";
import { Gallery } from "../components/Festival.jsx";
import { FAQ } from "../lib/faq.jsx";

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

const PARTNERS = [
  { tier: "Presenting Partner", lead: true },
  { tier: "Stage Partner" },
  { tier: "Wine Garden Partner" },
  { tier: "Sponsor" }, { tier: "Sponsor" }, { tier: "Sponsor" }, { tier: "Sponsor" }
];

const INVOLVE = [
  { k: "Vendors", title: "Food & Drink Vendors", text: "Bring your kitchen, winery or brewery.", to: "/get-involved#vendors", img: "/assets/img/stock/grilled-chicken.jpg", alt: "Chicken cooking on a hot grill", cta: "Apply for a booth" },
  { k: "Volunteers", title: "Volunteer", text: "Volunteer a shift and join the crew.", to: "/get-involved#volunteer", img: "/assets/img/stock/crowd-lawn.jpg", alt: "Festival crowd on a sunny lawn", cta: "Join the crew" },
  { k: "Entertainers", title: "Perform", text: "Perform on our stages or show your art.", to: "/entertainers", img: "/assets/img/stock/stage-lights.jpg", alt: "Band on an illuminated stage at night", cta: "Apply to perform" }
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* 4. Key info strip */}
      <section className="info" aria-label="Festival key facts">
        <div className="container">
          <div className="info-grid">
            <div><Icon name="calendar" /><div><strong>{E.datesShort}</strong><span>{E.days} days · {E.hours}</span></div></div>
            <div><Icon name="pin" /><div><strong>{E.city}</strong><span>Venue to be announced</span></div></div>
            <div><Icon name="arch" /><div><strong>Free entry</strong><span>All ages, every day</span></div></div>
            <div><Icon name="heart" /><div><strong>Not-for-profit</strong><span>A community event</span></div></div>
          </div>
          {!E.datesConfirmed && <p className="note"><Icon name="info" />Dates are tentative and will be confirmed soon.</p>}
        </div>
      </section>

      <Marquee />

      {/* 6. What's On */}
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

      {/* 7. Festival gallery */}
      <section className="section alt">
        <div className="container">
          <div className="section-head split">
            <div><span className="eyebrow">The festival</span><h2>Taste it. Hear it. Share it.</h2></div>
            <Link className="link-arrow" to="/entertainment">See the schedule</Link>
          </div>
          <Gallery items={gallery} />
        </div>
      </section>

      {/* 8. How coupons work */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Coupons</span>
            <h2>Skip the line, eat more.</h2>
            <p className="lead">Entry is free. Food and drinks are paid with $1 coupons: {E.couponsPerSheet} on a sheet for ${E.sheetPrice}.</p>
          </div>
          <ol className="steps-row">
            <li><span className="n" aria-hidden="true">01</span><h3>Buy $1 coupons online</h3><p>Grab a sheet of {E.couponsPerSheet} before you arrive and pick it up at any Coupon Booth.</p></li>
            <li><span className="n" aria-hidden="true">02</span><h3>Walk in free</h3><p>No ticket or registration. Entry is free on all {E.days} days at every entrance arch.</p></li>
            <li><span className="n" aria-hidden="true">03</span><h3>Trade coupons for food and drinks</h3><p>Every booth lists its prices in coupons. Tear off what you need and hand them over.</p></li>
          </ol>
          <div className="coupon-cta">
            <Link className="btn btn-lg" to="/coupons"><Icon name="ticket" />Buy Coupons</Link>
            <span className="stripe-line"><Icon name="lock" />Payments secured by Stripe</span>
          </div>
        </div>
      </section>

      {/* 9. Countdown (charcoal) */}
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
            <Link to="/visit"><Icon name="train" />Getting there</Link>
            <Link to="/entertainers"><Icon name="star" />Perform at the festival</Link>
            <Link to="/about#faq"><Icon name="info" />FAQ</Link>
          </nav>
        </div>
      </section>

      {/* 10. Plan your visit */}
      <section className="section alt">
        <div className="container">
          <div className="section-head split">
            <div><span className="eyebrow">Plan your visit</span><h2>Everything you need before you go.</h2></div>
            <Link className="link-arrow" to="/visit">Visitor guide</Link>
          </div>
          <div className="visit-grid">
            <Link className="v-card" to="/visit">
              <div className="icon-tile"><Icon name="train" /></div>
              <h3>Getting There</h3>
              <p>SkyTrain and buses, on-site and nearby parking, and a rideshare drop-off at the North Gate.</p>
              <span className="more">Transit & parking</span>
            </Link>
            <Link className="v-card" to="/visit#accessibility">
              <div className="icon-tile"><Icon name="access" /></div>
              <h3>Accessibility</h3>
              <p>Step-free main walkways, accessible washrooms, reserved seating and a quiet space.</p>
              <span className="more">Access information</span>
            </Link>
            <Link className="v-card" to="/map">
              <div className="icon-tile"><Icon name="map" /></div>
              <h3>Festival Map</h3>
              <p>Find every gate, booth, stage, Coupon Booth and washroom on the field.</p>
              <span className="more">Open the map</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 11. Sponsors */}
      <section className="section">
        <div className="container">
          <div className="section-head split">
            <div><span className="eyebrow">Our partners</span><h2>Free entry, made possible by our sponsors.</h2></div>
            <Link className="link-arrow" to="/sponsors#packages">Sponsorship packages</Link>
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
            <Link className="btn btn-secondary" to="/sponsors">Become a Sponsor</Link>
          </div>
        </div>
      </section>

      {/* 12. Get involved */}
      <section className="section alt">
        <div className="container">
          <div className="section-head split">
            <div><span className="eyebrow">Get involved</span><h2>It takes a community to throw a festival.</h2></div>
            <Link className="link-arrow" to="/get-involved">All the ways to join</Link>
          </div>
          <div className="involve-grid">
            {INVOLVE.map((t) => (
              <Link className="i-tile" to={t.to} key={t.title}>
                <img src={t.img} alt={t.alt} loading="lazy" decoding="async" width="960" height="640" />
                <span className="k">{t.k}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                <span className="go"><i><Icon name="arrow" /></i>{t.cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="section" id="faq">
        <div className="container faq-layout">
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently asked questions</h2>
            <p>General questions, media requests or accessibility needs — we’re happy to help.</p>
            <Link className="btn btn-secondary" to="/about#contact">Contact us</Link>
          </div>
          <div className="accordion">
            {FAQ.map(({ q, a, todo }, n) => (
              <details key={q} open={n === 0}>
                <summary><span>{q}{todo && <span className="todo">To confirm</span>}</span><span className="pm"><Icon name="plus" /></span></summary>
                <div className="a-body"><p>{a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
