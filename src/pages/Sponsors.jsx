import { event as E } from "../data.js";
import { Link } from "react-router-dom";
import { Icon, OrTbc, PageHero, Tbc } from "../lib/ui.jsx";
import { Checks, Field, ValidatedForm } from "../lib/forms.jsx";
import { GLANCE } from "./Partners.jsx";

const OPPS = [
  ["Most visible", "Entrance arches", "Naming rights for a festival entrance. Every visitor walks through one."],
  ["In every hand", "Back of the coupon sheet", "Your logo on the reverse of every coupon sheet, held and shared all day."],
  ["On stage", "Live Music Stage or Community Stage", "Naming rights, MC mentions and on-screen branding during performances."],
  ["Beverage Garden", "Beverage Garden partner", "Brand the 19+ garden and its guided tastings."],
  ["Kept all day", "Info booklet ads", "Cover, full, half and quarter pages next to the map and menus."],
  ["All around", "Perimeter banners", "Branded banners around the field, visible from every booth and seat."]
];

/* TBC: confirm benefits and pricing for each tier */
const TIERS = [
  ["Presenting Partner", "Exclusive · custom investment", ["“Taste of BC presented by…” naming", "Largest logo on coupon sheet back", "Back cover of booklet", "Live Music Stage recognition", "Executive hospitality", "First right of renewal"], true],
  ["Platinum Partner", "Major investment", ["Branding across the site", "Dedicated activation space", "Coupon sheet back logo", "PA and stage recognition", "Hospitality passes", "Media announcements"]],
  ["Gold Partner", "Mid-level investment", ["Branding in one festival zone", "Selected signage", "Full or half-page booklet ad", "Social media recognition", "Hospitality passes"]],
  ["Community Partner", "Entry-level or in-kind", ["Website and partner signage listing", "Selected social media mentions", "Community-focused activation", "Booklet listing"]]
];

/* Zones and experiences a sponsor can own */
const ZONES = [
  ["music", "Stage sponsor", "Musicians, DJs, cultural performers and headliners."],
  ["wine", "Beverage Garden partner", "Brand the 19+ garden and its guided tastings."],
  ["flag", "Chef’s Theatre sponsor", "Chef demos, interviews and culinary competitions."],
  ["heart", "Family Discovery Area sponsor", "Kids’ activities, crafts, games and food education."],
  ["reset", "Hydration sponsor", "Free water refill stations around the field."],
  ["shield", "Sustainability sponsor", "Composting, recycling and reusable serviceware."],
  ["access", "Accessibility partner", "Accessible entrances, viewing areas and visitor services."],
  ["car", "Transportation partner", "Transit, rideshare, cycling and parking information."],
  ["star", "People’s Choice awards", "Present the food, beverage and presentation awards."],
  ["map", "Visitor information partner", "Maps, wayfinding, info booths and live updates."]
];

const BENEFITS = [
  "Use of an approved “Proud partner of Taste of BC” designation",
  "Logo on selected signage, digital assets and printed materials",
  "Mentions in social media, newsletters and selected media releases",
  "On-site sampling, demos, contests or interactive brand activations",
  "Hospitality passes for clients, employees or community guests",
  "Branded items, subject to festival approval",
  "Recognition before, during and after the festival",
  "Post-event summary of attendance, engagement and reach"
];

const ZONE_OPTIONS = ["Entrance arches", "Coupon sheet back", "Stage", "Beverage Garden", "Chef’s Theatre", "Family Discovery Area", "Hydration stations", "Sustainability", "Accessibility", "Transportation", "People’s Choice awards", "Info booklet ads", "Perimeter banners"];
const GOALS = ["Brand awareness", "Product sampling", "Client hospitality", "Community impact", "Employee engagement", "Lead generation", "Media exposure"];

export default function Sponsors() {
  return (
    <>
      <PageHero img="/assets/img/stock/stage-lights.jpg" crumb="Sponsorship" eyebrow={`${E.datesShort} · ${E.city}`} title="Sponsorship Opportunities"
        lead="BC’s Best Outdoor Food & Beverage Festival. We have many ways to participate in Taste of BC. Tell us about yourself and we’ll build a customized package to fit your needs.">
        <div className="row mt-6"><a className="btn btn-light btn-lg" href="#inquire">Start a conversation</a><a className="btn btn-lg btn-outline-light" href="#packages">See packages</a></div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="section-head split"><div><span className="eyebrow">Why sponsor</span><h2>Meet BC where it eats.</h2></div>
            <Link className="link-arrow" to="/partners">Full partner media kit</Link></div>
          <div className="stats">{GLANCE.map(([n, l]) => <div className="stat" key={l}><div className="n">{n}</div><div className="l">{l}</div></div>)}</div>
        </div>
      </section>

      <section className="section alt" id="packages">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Sponsorship tiers</span><h2>Find the right fit.</h2>
            <p className="lead">Every package can be tailored. Benefits and pricing below are being finalised <Tbc />.</p></div>
          <div className="grid grid-4" style={{ alignItems: "stretch" }}>
            {TIERS.map(([n, sub, perks, feat]) => (
              <article className={"card tier" + (feat ? " featured" : "")} key={n}>
                {feat && <span className="ribbon badge solid">{sub}</span>}
                <h3>{n}</h3><div className="t-price">$<Tbc /></div><p className="small muted">{sub}</p>
                <ul className="ticks">{perks.map((p) => <li key={p}><Icon name="check" />{p}</li>)}</ul>
                <a className={"btn btn-block" + (feat ? "" : " btn-secondary")} href="#inquire">Enquire</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="zones">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Sponsored zones & experiences</span><h2>Own a part of the festival.</h2>
            <p className="lead">Practical, memorable partnerships, not just a logo on a wall.</p></div>
          <div className="grid grid-4">
            {ZONES.map(([icon, t, d]) => <div className="info-card" key={t}><div className="icon-tile"><Icon name={icon} /></div><h3>{t}</h3><p>{d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container split" style={{ alignItems: "start" }}>
          <div><span className="eyebrow">Every package includes</span><h2>Benefits for all sponsors.</h2>
            <p className="lead">Media outlets, hotels, tourism groups and local businesses can partner too. Choose “Media partner” or “Community or business partner” in the form.</p></div>
          <ul className="ticks">{BENEFITS.map((b) => <li key={b}><Icon name="check" />{b}</li>)}</ul>
        </div>
      </section>

      <section className="section" id="advertise">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Opportunities</span><h2>Where your brand shows up.</h2><p className="lead">Mix and match placements, or take a package above.</p></div>
          <div className="grid grid-3">
            {OPPS.map(([b, t, d]) => (
              <article className="card" key={t}><span className="badge">{b}</span><h3 className="mt-4">{t}</h3><p className="muted mb-0">{d}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="inquire">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Get in touch</span>
            <h2>Let’s build your package.</h2>
            <p className="lead">Tell us a little about your brand and goals, and we’ll put together a customized sponsorship package.</p>
            <ul className="kbd-list mt-6">
              <li><Icon name="mail" /><div><strong>Partnerships</strong><span><a href={"mailto:" + E.email}>{E.email}</a></span></div></li>
              <li><Icon name="phone" /><div><strong>Phone</strong><span>{E.phone ? <a href={"tel:+1" + E.phone.replace(/\D/g, "")}>{E.phone}</a> : <OrTbc value={null} label="Phone" />}</span></div></li>
            </ul>
          </div>
          <div className="card" style={{ padding: "clamp(24px,3vw,40px)" }}>
            <ValidatedForm name="sponsorship-enquiry" submitLabel="Send enquiry" success={{ title: "Thanks — enquiry received.", text: "Our partnerships team will be in touch within two business days." }}>
              <div className="form-row">
                <Field id="s-name" label="Your name" required error="Please enter your name."><input className="input" id="s-name" name="name" required autoComplete="name" /></Field>
                <Field id="s-title" label="Job title"><input className="input" id="s-title" name="job_title" autoComplete="organization-title" /></Field>
              </div>
              <div className="form-row">
                <Field id="s-co" label="Company" required error="Please enter your company."><input className="input" id="s-co" name="company" required autoComplete="organization" /></Field>
                <Field id="s-ind" label="Industry"><input className="input" id="s-ind" name="industry" placeholder="e.g. Banking, auto, telecom" /></Field>
              </div>
              <div className="form-row">
                <Field id="s-email" label="Email" required error="Enter a valid email address."><input className="input" id="s-email" name="email" type="email" required autoComplete="email" /></Field>
                <Field id="s-phone" label="Phone"><input className="input" id="s-phone" name="phone" type="tel" autoComplete="tel" /></Field>
              </div>
              <Field id="s-web" label="Website"><input className="input" id="s-web" name="website" placeholder="https://" /></Field>
              <div className="form-row">
                <Field id="s-type" label="Partnership type" required error="Please choose one.">
                  <select className="select" id="s-type" name="partnership_type" required defaultValue="">
                    <option value="">Select…</option><option>Sponsor</option><option>Media partner</option><option>Community or business partner</option><option>In-kind partner</option>
                  </select>
                </Field>
                <Field id="s-tier" label="Package of interest">
                  <select className="select" id="s-tier" name="tier_interest" defaultValue="Not sure yet">
                    {TIERS.map(([n]) => <option key={n}>{n}</option>)}<option>Custom package</option><option>Not sure yet</option>
                  </select>
                </Field>
              </div>
              <Field id="s-budget" label="Budget range">
                <select className="select" id="s-budget" name="budget_range" defaultValue="Prefer to discuss">
                  <option>Under $2,500</option><option>$2,500 – $10,000</option><option>$10,000 – $25,000</option><option>$25,000 – $50,000</option><option>$50,000+</option><option>In-kind only</option><option>Prefer to discuss</option>
                </select>
              </Field>
              <Checks label="Placements or zones you’re interested in" name="zones_of_interest" options={ZONE_OPTIONS} />
              <Checks label="Your goals" name="goals" options={GOALS} />
              <Field id="s-msg" label="Tell us more" required error="Please write a message."><textarea className="textarea" id="s-msg" name="message" required placeholder="Your audience, activation ideas and timing…" /></Field>
            </ValidatedForm>
          </div>
        </div>
      </section>
    </>
  );
}
