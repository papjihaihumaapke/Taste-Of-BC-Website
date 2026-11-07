import { event as E } from "../data.js";
import { Icon, PageHero } from "../lib/ui.jsx";
import { Checks, Field, ValidatedForm } from "../lib/forms.jsx";

const OPPS = [
  ["Most visible", "Entrance arches", "Naming rights for the North, East or West Gate. Every visitor walks through one."],
  ["In every hand", "Back of the coupon sheet", "Your logo on the reverse of every 20 × $1 coupon sheet, held and shared all day."],
  ["On stage", "Main Stage or Community Stage", "Naming rights, MC mentions and on-screen branding during performances."],
  ["Wine Garden", "BC Wine Garden partner", "Brand the 19+ garden and its guided tastings."],
  ["Kept all day", "Info booklet ads", "Cover, full, half and quarter pages next to the map and menus."],
  ["All around", "Perimeter banners", "Branded banners around the field, visible from every booth and seat."]
];
const TIERS = [
  ["Presenting", "Exclusive · 1 available", ["Name in event title", "Largest logo on coupon sheet back", "Back cover of booklet", "Main Stage mentions"], true],
  ["Stage Partner", "2 available", ["Naming rights for one stage", "Coupon sheet back logo", "Full-page booklet ad", "Perimeter banners"]],
  ["Gold", "Limited", ["Coupon sheet back logo", "Half-page booklet ad", "2 perimeter banners", "Website logo"]],
  ["Community", "Local businesses", ["Quarter-page booklet ad", "1 perimeter banner", "Website listing"]]
];

export default function Sponsors() {
  return (
    <>
      <PageHero img="/assets/img/stock/stage-lights.jpg" crumb="Sponsors" eyebrow="Partner with us" title="Put your brand at the heart of BC’s biggest food festival."
        lead="Four days, free entry and a big, diverse crowd from across the Lower Mainland. As a not-for-profit event, sponsorship is what keeps the gates free.">
        <div className="row mt-6"><a className="btn btn-lg" href="#inquire">Request the sponsor deck</a><a className="btn btn-lg btn-secondary" href="#packages">See packages</a></div>
      </PageHero>


      <section className="section" id="advertise">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Opportunities</span><h2>Where your brand shows up.</h2><p className="lead">Mix and match placements, or take a package below.</p></div>
          <div className="grid grid-3">
            {OPPS.map(([b, t, d]) => (
              <article className="card" key={t}><span className="badge">{b}</span><h3 className="mt-4">{t}</h3><p className="muted mb-0">{d}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section white" id="packages">
        <div className="container">
          <div className="section-head center"><span className="eyebrow">Packages</span><h2>Sponsorship packages.</h2><p className="lead">All packages can be tailored. Pricing is in the sponsor deck.</p></div>
          <div className="grid grid-4" style={{ alignItems: "stretch" }}>
            {TIERS.map(([n, sub, perks, feat]) => (
              <article className={"card tier" + (feat ? " featured" : "")} key={n}>
                {feat && <span className="ribbon badge solid">{sub}</span>}
                <h3>{n}</h3><div className="t-price">$XX</div><p className="small muted">{feat ? "“Taste of BC presented by…”" : sub}</p>
                <ul className="ticks">{perks.map((p) => <li key={p}><Icon name="check" />{p}</li>)}</ul>
                <a className={"btn btn-block" + (feat ? "" : " btn-secondary")} href="#inquire">Enquire</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="inquire">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Get in touch</span>
            <h2>Request the sponsor deck.</h2>
            <p className="lead">Tell us a little about your brand and we’ll send the deck with rates, audience details and placement specs within two business days.</p>
            <ul className="kbd-list mt-6">
              <li><Icon name="mail" /><div><strong>Partnerships</strong><span><a href="mailto:partners@tasteofbc.ca">partners@tasteofbc.ca</a></span></div></li>
              <li><Icon name="phone" /><div><strong>Phone</strong><span>{E.phone}</span></div></li>
            </ul>
          </div>
          <div className="card" style={{ padding: "clamp(24px,3vw,40px)" }}>
            <ValidatedForm submitLabel="Send request" success={{ title: "Thanks — request received.", text: "We’ll email the sponsor deck within two business days." }}>
              <div className="form-row">
                <Field id="s-name" label="Full name" required error="Please enter your name."><input className="input" id="s-name" required autoComplete="name" /></Field>
                <Field id="s-co" label="Company" required error="Please enter your company."><input className="input" id="s-co" required autoComplete="organization" /></Field>
              </div>
              <div className="form-row">
                <Field id="s-email" label="Work email" required error="Enter a valid email address."><input className="input" id="s-email" type="email" required autoComplete="email" /></Field>
                <Field id="s-phone" label="Phone"><input className="input" id="s-phone" type="tel" autoComplete="tel" /></Field>
              </div>
              <Checks label="Interested in" options={["Entrance arch", "Coupon sheet back", "Stage", "Wine Garden", "Booklet ad", "Perimeter banners"]} />
              <Field id="s-msg" label="Message"><textarea className="textarea" id="s-msg" placeholder="Goals, audience, timing…" /></Field>
            </ValidatedForm>
          </div>
        </div>
      </section>
    </>
  );
}
