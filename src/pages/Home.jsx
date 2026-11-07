import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { event as E, gallery, heroSlides, highlights } from "../data.js";
import { Countdown, Icon } from "../lib/ui.jsx";
import { Gallery } from "../components/Festival.jsx";

function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, [paused]);
  return (
    <section className="c-hero">
      <div className="slides">
        {heroSlides.map((s, n) => (
          <div className={"slide" + (n === i ? " on" : "")} key={s.img} aria-hidden={n !== i}>
            <img src={s.img} alt={s.alt} fetchPriority={n === 0 ? "high" : undefined} loading={n === 0 ? undefined : "lazy"} />
            <p className="cap"><b>{s.title}</b>{s.text}</p>
          </div>
        ))}
      </div>
      <div className="hero-dots" aria-label="Hero slides">
        {heroSlides.map((s, n) => (
          <button key={s.img} aria-label={`Slide ${n + 1}: ${s.title}`} aria-current={n === i ? "true" : undefined} onClick={() => { setI(n); setPaused(true); }} />
        ))}
      </div>
      <div className="panel">
        <span className="eyebrow">{E.datesShort} · {E.city} · Free entry</span>
        <h1>BC’s biggest food, beverage & entertainment festival.</h1>
        <p>Four days of local restaurants, BC wines, live music and local artists — a not-for-profit celebration for the whole community.</p>
        <div className="hero-actions"><Link className="btn btn-light" to="/whats-on">See what’s on</Link><Link className="link-line light" to="/coupons">Buy food coupons</Link></div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section tight">
        <div className="container">
          <div className="facts-row">
            <div><Icon name="calendar" /><div><strong>{E.datesShort}</strong><span>{E.days} days · {E.hours}</span></div></div>
            <div><Icon name="pin" /><div><strong>{E.city}</strong><span>{E.venue}</span></div></div>
            <div><Icon name="arch" /><div><strong>Free entry</strong><span>All ages, every day</span></div></div>
            <div><Icon name="heart" /><div><strong>Not-for-profit</strong><span>A community event</span></div></div>
          </div>
          {!E.datesConfirmed && <p className="small muted mt-4 mb-0">Dates are tentative and will be confirmed soon.</p>}
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head split" style={{ marginBottom: 32 }}>
            <div><span className="eyebrow">What’s on</span><h2>Food. Beverage. Entertainment.</h2></div>
            <Link className="link-arrow" to="/whats-on">Explore the festival</Link>
          </div>
          <div className="grid grid-3">
            {highlights.map((h) => (
              <div className="card" key={h.title}><div className="icon-tile"><Icon name={h.icon} /></div><h3>{h.title}</h3><p className="muted mb-0">{h.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head split" style={{ marginBottom: 32 }}>
            <div><span className="eyebrow">The festival</span><h2>Taste it. Hear it. Share it.</h2></div>
            <Link className="link-arrow" to="/entertainment">See the schedule</Link>
          </div>
          <Gallery items={gallery} />
        </div>
      </section>


      <section className="band">
        <div className="container">
          <div>
            <span className="eyebrow">Countdown</span>
            <h2>The gates open in…</h2>
            <p>Walk in free and pay for food and drinks with $1 festival coupons. Buy online to skip the line.</p>
            <div className="mt-6"><Countdown /></div>
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

      <section className="section">
        <div className="container">
          <div className="section-head split" style={{ marginBottom: 32 }}>
            <div><span className="eyebrow">Our partners</span><h2>Free entry, made possible by our sponsors.</h2></div>
            <Link className="link-arrow" to="/sponsors">Become a sponsor</Link>
          </div>
          <div className="logo-wall">
            {["Presenting", "Stage partner", "Wine Garden partner", "Sponsor", "Sponsor", "Sponsor"].map((l, n) => <div className="logo-slot" key={n}>{l}</div>)}
          </div>
        </div>
      </section>
    </>
  );
}
