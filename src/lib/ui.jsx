import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICONS } from "./icons.js";
import { event as E } from "../data.js";

export const money = (n) => "$" + n.toFixed(2);

export function Icon({ name, className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICONS[name] || "" }} />
  );
}

/* Wave motif from the logo */
export function Wave({ className = "wave" }) {
  return (
    <svg className={className} viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 26C60 4 120 4 200 22s140 18 200-6" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M190 36c60-12 120-14 200-4" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

export function WavesBg({ className = "waves-bg" }) {
  return (
    <span className={className}>
      <svg viewBox="0 0 600 260" fill="none" stroke="currentColor" strokeLinecap="round" aria-hidden="true">
        <path d="M0 120C110 60 220 60 330 105s200 45 270 0" strokeWidth="22" />
        <path d="M200 175c110-30 250-30 400 0" strokeWidth="14" />
        <path d="M0 230c140-40 300-40 600 0" strokeWidth="8" />
      </svg>
    </span>
  );
}

/* Wraps children with a leading icon — replaces the old data-icon attribute */
export const WithIcon = ({ icon, children }) => <><Icon name={icon} />{children}</>;

export function Countdown() {
  const target = new Date(E.start).getTime();
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const d = Math.max(0, target - now);
  const parts = [Math.floor(d / 864e5), Math.floor(d / 36e5) % 24, Math.floor(d / 6e4) % 60, Math.floor(d / 1e3) % 60];
  return (
    <div className="countdown">
      {["Days", "Hours", "Mins", "Secs"].map((l, i) => (
        <div className="unit" key={l}><span className="num">{String(parts[i]).padStart(2, "0")}</span><span className="lbl">{l}</span></div>
      ))}
    </div>
  );
}

export function PageHero({ crumb, eyebrow, title, lead, children, img = "/assets/img/stock/crowd-lawn.jpg", imgPos = "center" }) {
  return (
    <section className="page-hero banner">
      <img className="banner-img" src={img} alt="" style={{ objectPosition: imgPos }} />
      <div className="container">
        {crumb && <nav className="crumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>{crumb}</span></nav>}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

export const DatesNote = () => E.datesConfirmed ? null : (
  <span className="pill-note"><Icon name="info" />Dates are tentative and will be confirmed soon.</span>
);

/* Number input that can be cleared while typing; commits only valid values, restores on blur */
export function QtyInput({ value, onChange, min = 1, max = 99, label = "Quantity" }) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);
  return (
    <input type="number" inputMode="numeric" value={draft} min={min} max={max} aria-label={label}
      onChange={(e) => {
        setDraft(e.target.value);
        const v = parseInt(e.target.value, 10);
        if (v >= min) onChange(Math.min(max, v));
      }}
      onBlur={() => setDraft(String(value))} />
  );
}
