import { event as E } from "../data.js";
import { Icon, OrTbc, PageHero, Tbc } from "../lib/ui.jsx";
import { Field, ValidatedForm } from "../lib/forms.jsx";

const OPPS = [
  ["Most visible", "Entrance arches", "Naming rights for a festival entrance. Every visitor walks through one."],
  ["In every hand", "Back of the coupon sheet", "Your logo on the reverse of every coupon sheet, held and shared all day."],
  ["On stage", "Main Stage or Community Stage", "Naming rights, MC mentions and on-screen branding during performances."],
  ["Wine Garden", "BC Wine Garden partner", "Brand the 19+ garden and its guided tastings."],
  ["Kept all day", "Info booklet ads", "Cover, full, half and quarter pages next to the map and menus."],
  ["All around", "Perimeter banners", "Branded banners around the field, visible from every booth and seat."]
];

/* TBC: confirm benefits and pricing for each tier */
const TIERS = [
  ["Presenting Partner", "Exclusive", ["Name in event title", "Largest logo on coupon sheet back", "Back cover of booklet", "Main Stage mentions"], true],
  ["Stage Partner", "Limited", ["Naming rights for one stage", "Coupon sheet back logo", "Full-page booklet ad", "Perimeter banners"]],
  ["Wine Garden Partner", "Exclusive", ["Brand the 19+ BC Wine Garden", "Guided tasting mentions", "Coupon sheet back logo", "Perimeter banners"]],
  ["Sponsor", "Local businesses", ["Booklet ad", "Perimeter banner", "Website listing"]]
];

export default function Sponsors() {
  return (
    <>
      <PageHero img="/assets/img/stock/stage-lights.jpg" crumb="Sponsorship" eyebrow={`${E.datesShort} · ${E.city}`} title="Sponsorship Opportunities"
        lead="BC’s Best Outdoor Food & Beverage Festival. We have many ways to participate in Taste of BC. Tell us about yourself and we’ll build a customized package to fit your needs.">
        <div className="row mt-6"><a className="btn btn-light btn-lg" href="#inquire">Start a conversation</a><a className="btn btn-lg btn-outline-light" href="#packages">See packages</a></div>
      </PageHero>

      <section className="section" id="packages">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Sponsorship tiers</span><h2>Find the right fit.</h2>
            <p className="lead">Every package can be tailored. Benefits and pricing below are being finalised <Tbc />.</p></div>
          <div className="grid grid-4" style={{ alignItems: "stretch" }}>
            {TIERS.map(([n, sub, perks, feat]) => (
              <article className={"card tier" + (feat ? " featured" : "")} key={n}>
                {feat && <span className="ribbon badge solid">{sub}</span>}
                <h3>{n}</h3><div className="t-price">$<Tbc /></div><p className="small muted">{feat ? "“Taste of BC presented by…”" : sub}</p>
                <ul className="ticks">{perks.map((p) => <li key={p}><Icon name="check" />{p}</li>)}</ul>
                <a className={"btn btn-block" + (feat ? "" : " btn-secondary")} href="#inquire">Enquire</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="advertise">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Opportunities</span><h2>Where your brand shows up.</h2><p className="lead">Mix and match placements, or take a package above.</p></div>
          <div className="grid grid-3">
            {OPPS.map(([b, t, d]) => (
              <article className="card" key={t}><span className="badge">{b}</span><h3 className="mt-4">{t}</h3><p className="muted mb-0">{d}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="inquire">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Get in touch</span>
            <h2>Let’s build your package.</h2>
            <p className="lead">Tell us a little about your brand and goals, and we’ll put together a customized sponsorship package.</p>
            <ul className="kbd-list mt-6">
              <li><Icon name="mail" /><div><strong>Partnerships</strong><span><a href="mailto:partners@tasteofbc.ca">partners@tasteofbc.ca</a></span></div></li>
              <li><Icon name="phone" /><div><strong>Phone</strong><span><OrTbc value={E.phone} label="Phone" /></span></div></li>
            </ul>
          </div>
          <div className="card" style={{ padding: "clamp(24px,3vw,40px)" }}>
            <ValidatedForm submitLabel="Send enquiry" success={{ title: "Thanks — enquiry received.", text: "Our partnerships team will be in touch within two business days." }}>
              <div className="form-row">
                <Field id="s-name" label="Name" required error="Please enter your name."><input className="input" id="s-name" required autoComplete="name" /></Field>
                <Field id="s-co" label="Company" required error="Please enter your company."><input className="input" id="s-co" required autoComplete="organization" /></Field>
              </div>
              <Field id="s-email" label="Email" required error="Enter a valid email address."><input className="input" id="s-email" type="email" required autoComplete="email" /></Field>
              <Field id="s-msg" label="Message" required error="Please write a message."><textarea className="textarea" id="s-msg" required placeholder="Your goals, audience and timing…" /></Field>
            </ValidatedForm>
          </div>
        </div>
      </section>
    </>
  );
}
