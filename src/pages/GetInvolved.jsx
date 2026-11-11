import { Link, useLocation } from "react-router-dom";
import { event as E } from "../data.js";
import { Icon, PageHero, Tbc } from "../lib/ui.jsx";
import { Field, ValidatedForm } from "../lib/forms.jsx";
import { Tabs } from "../components/Festival.jsx";
import { BeverageVendorForm, EntertainerForm, FoodVendorForm } from "../components/ApplicationForms.jsx";
import { PROMO_BENEFITS, RESTAURANT_GOAL } from "../components/Promo.jsx";

export const INVOLVE = [
  { k: "Vendors", title: "Become a Vendor", text: "Bring your kitchen, food truck, winery, brewery or distillery.", to: "/vendors", img: "/assets/img/stock/grilled-chicken.jpg", alt: "Chicken cooking on a hot grill", cta: "Vendor opportunities" },
  { k: "Volunteers", title: "Volunteer", text: "Volunteer a shift and join the crew.", to: "/volunteer", img: "/assets/img/stock/crowd-lawn.jpg", alt: "Festival crowd on a sunny lawn", cta: "Volunteer registration" },
  { k: "Entertainers", title: "Perform at Taste of BC", text: "Perform on our stages or show your art.", to: "/perform", img: "/assets/img/stock/stage-lights.jpg", alt: "Band on an illuminated stage at night", cta: "Apply to perform" },
  { k: "Partners", title: "Sponsor", text: "Keep the gates free and put your brand at the heart of the festival.", to: "/sponsorship", img: "/assets/img/stock/concert.jpg", alt: "Crowd enjoying a live concert", cta: "Sponsorship opportunities" }
];

export const InvolveTiles = () => (
  <div className="involve-grid four">
    {INVOLVE.map((t) => (
      <Link className="i-tile" to={t.to} key={t.title}>
        <img src={t.img} alt={t.alt} loading="lazy" decoding="async" width="960" height="640" />
        <span className="k">{t.k}</span><h3>{t.title}</h3><p>{t.text}</p>
        <span className="go"><i><Icon name="arrow" /></i>{t.cta}</span>
      </Link>
    ))}
  </div>
);

/* Simple "Name, Email, Message" contact form used on several pages */
export function QuickContactForm({ id, name, submitLabel = "Send message", extra, success }) {
  return (
    <ValidatedForm name={name} submitLabel={submitLabel} success={success || { title: "Message sent.", text: "Thanks! We reply within two business days." }}>
      <div className="form-row">
        <Field id={id + "-name"} label="Name" required error="Please enter your name."><input className="input" id={id + "-name"} name="name" required autoComplete="name" /></Field>
        <Field id={id + "-email"} label="Email" required error="Enter a valid email address."><input className="input" id={id + "-email"} name="email" type="email" required autoComplete="email" /></Field>
      </div>
      {extra}
      <Field id={id + "-msg"} label="Message" required error="Please write a message."><textarea className="textarea" id={id + "-msg"} name="message" required /></Field>
    </ValidatedForm>
  );
}

/* ---------- /get-involved — hub ---------- */
export default function GetInvolved() {
  return (
    <>
      <PageHero img="/assets/img/stock/festival-crowd.jpg" crumb="Get Involved" eyebrow="Get involved" title="It takes a community to throw a festival."
        lead="Taste of BC is a not-for-profit event run with local restaurants, performers, volunteers and partners. There’s a place for you." />
      <section className="section">
        <div className="container"><InvolveTiles />
          <p className="small muted mt-6 mb-0">Want the full picture? Read the <Link to="/partners">partner media kit</Link>, or <Link to="/donate">support the festival with a donation</Link>.</p></div>
      </section>
    </>
  );
}

/* ---------- /vendors ---------- */
/* TBC: replace "#" with links to the real documents (PDF or online forms) */
const RESOURCES = [
  ["store", "Vendor Applications", "Restaurants & food trucks, wine/beer/spirits", "#apply"],
  ["utensils", "Vendor Menu Form", "Submit your sample-size menu and coupon prices", "#"],
  ["flag", "Power Requirements Form", "Tell us what power your booth needs", "#"],
  ["shield", "Vendor Terms & Conditions", "Read before you apply", "/legal#vendor-terms"]
];

export function Vendors() {
  const { hash } = useLocation();
  return (
    <>
      <PageHero img="/assets/img/stock/grilled-chicken.jpg" crumb="Vendor Opportunities" eyebrow={`Vendor opportunities · ${RESTAURANT_GOAL} restaurants wanted`} title="Show off your best food."
        lead="Taste of BC is a promotion for BC’s restaurants, wineries, brewers, distillers and beverage makers. Interested in becoming a vendor? Review the options below.">
        <div className="row mt-6"><a className="btn btn-light btn-lg" href="#apply">Apply as a restaurant</a><a className="btn btn-outline-light btn-lg" href="#apply-beverage">Wineries & beverage makers</a></div>
      </PageHero>

      <section className="section alt">
        <div className="container">
          <div className="section-head split">
            <div><span className="eyebrow">Why join</span><h2>We’re inviting {RESTAURANT_GOAL} BC restaurants.</h2></div>
            <a className="link-arrow" href="#apply">Apply now</a>
          </div>
          <div className="grid grid-4">
            {PROMO_BENEFITS.map(([icon, t, d]) => (
              <div className="info-card" key={t}><div className="icon-tile"><Icon name={icon} /></div><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <div className="info-card">
            <div className="icon-tile"><Icon name="utensils" /></div>
            <h3>Restaurants, Food Trucks & Liquor Vendors</h3>
            <p>Serve sample-size dishes and drinks priced in $1 coupons ({E.couponRange} coupons per dish <Tbc />). Apply using the vendor application form below.</p>
            <span className="spacer" />
            <div className="row"><a className="btn" href="#apply">Food vendor application</a><a className="btn btn-secondary" href="#apply-beverage">Wine, beer & spirits</a></div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container narrow">
          <div className="section-head"><span className="eyebrow">Vendor resources</span><h2>Forms & documents.</h2></div>
          <ul className="resource-list">
            {RESOURCES.map(([icon, t, sub, href]) => (
              <li key={t}><Icon name={icon} />
                <div className="r-text"><strong>{t}{href === "#" && <Tbc />}</strong><span className="sub">{sub}</span></div>
                {href.startsWith("/") ? <Link className="btn btn-secondary" to={href}>View</Link> : <a className="btn btn-secondary" href={href}>{href === "#apply" ? "Apply" : "Download"}</a>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="apply">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Vendor application</span>
            <h2>Apply for a booth.</h2>
            <p className="lead">Choose the form that fits your business. We review every application and reply by email. New to the festival? Read the <Link to="/partners/restaurants">restaurant</Link> or <Link to="/partners/beverage">beverage</Link> media kit first.</p>
            <ul className="kbd-list mt-6">
              <li><Icon name="check" /><div><strong>Tent fees</strong><span>{E.boothFees.map(([s, p]) => `${s}: $${p.toLocaleString("en-CA")}`).join(" · ")}, covering all {E.days} days.</span></div></li>
              <li><Icon name="check" /><div><strong>How payment works</strong><span>Visitors pay you in $1 coupons. Hand in your coupons at close each day and we settle them with you after the festival, at the rate in your vendor agreement <Tbc />.</span></div></li>
              <li><Icon name="check" /><div><strong>Menu pricing</strong><span>Prices are set in whole coupons, {E.couponRange} per sample-size dish <Tbc />.</span></div></li>
              <li><Icon name="check" /><div><strong>Permits</strong><span>Food vendors need a valid temporary food permit. Licensed vendors need a special event liquor permit.</span></div></li>
            </ul>
          </div>
          <div className="card" style={{ padding: "clamp(24px,3vw,40px)", background: "var(--cream)", border: 0 }}>
            <span id="apply-beverage" />
            <Tabs key={hash} label="Vendor application type" initial={hash === "#apply-beverage" ? 1 : 0} tabs={[
              { id: "food", label: "Restaurants & food trucks", content: <div className="mt-6"><FoodVendorForm /></div> },
              { id: "beverage", label: "Wine, beer & spirits", content: <div className="mt-6"><BeverageVendorForm /></div> }
            ]} />
          </div>
        </div>
      </section>

      <section className="section alt" id="questions">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Vendor questions?</span>
            <h2>Ask the vendor team.</h2>
            <p className="lead">Power, permits or a custom booth size: send us a note and we’ll get back to you.</p>
          </div>
          <div className="card" style={{ padding: "clamp(24px,3vw,40px)" }}><QuickContactForm id="vq" name="vendor-questions" /></div>
        </div>
      </section>
    </>
  );
}

/* ---------- /perform ---------- */
export function Perform() {
  return (
    <>
      <PageHero img="/assets/img/stock/stage-lights.jpg" crumb="Perform" eyebrow="Calling all local talent" title="Perform at Taste of BC."
        lead="We’re booking BC musicians, dancers, comedians, DJs and artists for four days of live entertainment. Tell us about your act." />

      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Why perform</span>
            <h2>A big, friendly crowd for local talent.</h2>
            <ul className="kbd-list mt-6">
              <li><Icon name="music" /><div><strong>Live stages</strong><span>Live Music Stage and Community Stage with sound and crew <Tbc />.</span></div></li>
              <li><Icon name="users" /><div><strong>Free-admission crowds</strong><span>Free entry brings families, foodies and music fans from across BC.</span></div></li>
              <li><Icon name="megaphone" /><div><strong>Promotion</strong><span>Your act on the schedule and on our socials.</span></div></li>
              <li><Icon name="ticket" /><div><strong>Performer perks</strong><span>Details shared when booking <Tbc />.</span></div></li>
            </ul>
            <p className="small muted mt-6">Already booked? <Link to="/entertainers">Sign in to the entertainer portal</Link>.</p>
          </div>

          <div className="card" style={{ padding: "clamp(24px,3vw,40px)" }}>
            <h3 className="mb-6">Entertainment application</h3>
            <EntertainerForm />
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- /volunteer ---------- */
const SIGNUP_URL = ""; // TBC: volunteer sign-up platform link (e.g. SignUp.com)
const signupHref = SIGNUP_URL || `mailto:${E.email}?subject=Volunteer%20sign-up`; // falls back to email until the link exists
/* TBC: confirm volunteer roles */
const ROLES = [
  ["arch", "Gate welcome", "Greet guests and hand out maps at the entrances."],
  ["ticket", "Coupon Booth", "Help guests buy and pick up coupons."],
  ["info", "Info Booth", "Answer questions and look after lost and found."],
  ["music", "Stage crew", "Support performers and keep the stages on schedule."],
  ["heart", "Family Discovery Area", "Run games and activities for kids."],
  ["flag", "Setup & teardown", "Build the festival before the gates open, and pack it away after."]
];

export function Volunteer() {
  return (
    <>
      <PageHero img="/assets/img/stock/crowd-lawn.jpg" crumb="Volunteer" eyebrow="Volunteers" title="Volunteer registration is open."
        lead="Join the crew that makes Taste of BC happen. Welcome guests, help at Coupon Booths, support the stages and keep the field running smoothly.">
        <div className="row mt-6">
          <a className="btn btn-light" href={signupHref} {...(SIGNUP_URL ? { target: "_blank", rel: "noopener noreferrer" } : {})}>Sign up to volunteer</a>
          {!SIGNUP_URL && <span className="pill-note"><Icon name="info" />Sign-up link <Tbc /></span>}
        </div>
      </PageHero>

      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Why volunteer</span>
            <h2>Be part of the festival.</h2>
            <p className="lead">Taste of BC is a not-for-profit community event, and volunteers keep the gates free. Meet new people, see the festival from the inside and give back to your community.</p>
            <ul className="ticks">
              <li><Icon name="check" />Festival tee and lanyard <Tbc /></li><li><Icon name="check" />Meal coupons for every shift <Tbc /></li>
              <li><Icon name="check" />Volunteer-hours letter on request</li><li><Icon name="check" />Age requirements <Tbc /></li>
            </ul>
          </div>
          <div className="callout neutral" style={{ alignSelf: "stretch" }}>
            <Icon name="mail" />
            <div><strong>Prefer to sign up another way?</strong>
              <p>Volunteers can also contact the team directly to be signed up manually. Email <a href={"mailto:" + E.email}>{E.email}</a> or use our <Link to="/contact">contact form</Link>.</p></div>
          </div>
        </div>
      </section>

      <section className="section alt" id="roles">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Volunteer roles <Tbc /></span><h2>Find your shift.</h2></div>
          <div className="grid grid-3">
            {ROLES.map(([icon, t, d]) => (
              <div className="info-card" key={t}><div className="icon-tile"><Icon name={icon} /></div><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
          <div className="row mt-8">
            <a className="btn btn-lg" href={signupHref} {...(SIGNUP_URL ? { target: "_blank", rel: "noopener noreferrer" } : {})}>Sign up to volunteer</a>
          </div>
        </div>
      </section>
    </>
  );
}
