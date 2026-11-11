import { Link } from "react-router-dom";
import { event as E } from "../data.js";
import { Icon, OrTbc, PageHero, Tbc } from "../lib/ui.jsx";
import { Checks, Field, ValidatedForm } from "../lib/forms.jsx";
import { BeverageVendorForm, FoodVendorForm } from "../components/ApplicationForms.jsx";
import { RESTAURANT_GOAL } from "../components/Promo.jsx";

/* Partner media kit: hub, restaurant kit, beverage kit and donor page.
   Figures are planning targets from the festival plan, shown as goals, not confirmed results. */

const VISITOR_GOAL = "50,000+";

export const GLANCE = [
  [RESTAURANT_GOAL, "restaurants & food and beverage businesses we’re inviting"],
  [VISITOR_GOAL, "visitors expected over the festival"],
  [String(E.days), "days of food, drink and live entertainment"],
  ["Free", "entry for all ages, so everyone comes through the gates"]
];

const AUDIENCE = [
  ["users", "Families & local residents"], ["utensils", "Food lovers"], ["pin", "Tourists & day-trippers"],
  ["store", "Hospitality professionals"], ["megaphone", "Media, food writers & creators"], ["heart", "Community groups & businesses"]
];

const ZONES = [
  ["utensils", "BC Restaurant Village", "Sample-size signature dishes from local restaurants and food trucks."],
  ["wine", "Beverage Garden (19+)", "BC wine, craft beer, cider, spirits and non-alcoholic drinks, with responsible-service controls."],
  ["flag", "Chef’s Theatre", "Chef demonstrations, chef interviews, local ingredient showcases and culinary competitions."],
  ["music", "Main & Community Stages", "BC musicians, bands, DJs, cultural performers and fashion shows."],
  ["heart", "Family Discovery Area", "Interactive activities, food education, crafts and games for kids."],
  ["sparkle", "Live Art Zone", "Local painters and artists creating work on the field."]
];

/* Every channel we use to promote partners */
const CHANNELS = [
  ["star", "Website & vendor directory", "Your name, logo, story and menu on tasteofbc.ca and the online menu."],
  ["instagram", "Social media features", "Vendor and chef features plus a weekly countdown introducing new partners."],
  ["mail", "Email newsletter", "Lineup announcements sent to festival subscribers."],
  ["book", "Info booklet & map", "Listed in the printed guide handed out at every gate."],
  ["banner", "On-site signage", "A Taste of BC booth banner with your name and menu, plus wayfinding signs."],
  ["megaphone", "Stage & media mentions", "MC shout-outs, vendor spotlights and media announcements."]
];

/* Recognition timeline, adapted from the festival planning timeline */
const TIMELINE = [
  ["6 months before", "Founding partners confirmed and the partner information kit shared."],
  ["4 months before", "Festival announced. Partner logos go on the website and launch posts."],
  ["3 months before", "Vendor and menu reveals begin. Weekly countdown features each partner."],
  ["1–3 months before", "Schedule published. Partners appear in the booklet, map and media releases."],
  ["Festival days", "Booth banners, stage mentions, signage and on-site activations."],
  ["After the festival", "Thank-you posts and a summary of attendance, engagement and feedback."]
];

const PrintButton = () => (
  <button type="button" className="btn btn-outline-light btn-lg" onClick={() => window.print()}><Icon name="download" />Save as PDF</button>
);

const Glance = () => (
  <div className="stats">
    {GLANCE.map(([n, l]) => <div className="stat" key={l}><div className="n">{n}</div><div className="l">{l}</div></div>)}
  </div>
);

const InfoCards = ({ items, cols = 3 }) => (
  <div className={`grid grid-${cols}`}>
    {items.map(([icon, t, d]) => (
      <div className="info-card" key={t}><div className="icon-tile"><Icon name={icon} /></div><h3>{t}</h3>{d && <p>{d}</p>}</div>
    ))}
  </div>
);

const Ticks = ({ items }) => <ul className="ticks">{items.map((t) => <li key={t}><Icon name="check" />{t}</li>)}</ul>;

const ContactCard = () => (
  <ul className="contact-list">
    <li><Icon name="mail" /><div><strong>Email</strong><a href={"mailto:" + E.email}>{E.email}</a></div></li>
    <li><Icon name="phone" /><div><strong>Phone</strong>{E.phone ? <a href={"tel:+1" + E.phone.replace(/\D/g, "")}>{E.phone}</a> : <OrTbc value={null} label="Phone" />}</div></li>
  </ul>
);

/* ---------- /partners — media kit hub ---------- */
const PATHS = [
  { k: "Restaurants", title: "Restaurants & food trucks", text: "Serve your signature dishes to festival crowds.", to: "/partners/restaurants", img: "/assets/img/stock/grilled-salmon.jpg", alt: "Grilled salmon with vegetables", cta: "Restaurant media kit" },
  { k: "Beverage", title: "Wineries, breweries & distillers", text: "Pour in the 19+ Beverage Garden.", to: "/partners/beverage", img: "/assets/img/stock/wine-tasting.jpg", alt: "Wine glasses at a tasting bar", cta: "Beverage media kit" },
  { k: "Sponsors", title: "Sponsors & media partners", text: "Put your brand at the heart of the festival.", to: "/sponsorship", img: "/assets/img/stock/concert.jpg", alt: "Crowd enjoying a live concert", cta: "Sponsorship packages" },
  { k: "Donors", title: "Donors & supporters", text: "Help keep the gates free for every family.", to: "/donate", img: "/assets/img/stock/crowd-lawn.jpg", alt: "Families on a sunny festival lawn", cta: "Ways to give" }
];

export function PartnersHub() {
  return (
    <>
      <PageHero img="/assets/img/stock/festival-crowd.jpg" crumb="Partner Media Kit" eyebrow={`Media kit · ${E.datesShort} · ${E.city}`} title="Partner with Taste of BC."
        lead={`A not-for-profit celebration of BC’s food, beverage and local talent. Connect with ${VISITOR_GOAL} visitors over ${E.days} free-entry days.`}>
        <div className="row mt-6"><a className="btn btn-light btn-lg" href="#paths">Find your package</a><PrintButton /></div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="section-head"><span className="eyebrow">At a glance</span><h2>The festival in numbers.</h2>
            <p className="lead">Planning targets for the {E.year} festival, not confirmed results.</p></div>
          <Glance />
        </div>
      </section>

      <section className="section alt">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Who comes</span>
            <h2>A wide, local audience.</h2>
            <p className="lead">Free admission brings in families, food lovers and visitors from across the province, not just ticket buyers.</p>
          </div>
          <ul className="facts-list">{AUDIENCE.map(([i, t]) => <li key={t}><Icon name={i} />{t}</li>)}</ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Festival zones</span><h2>Where partners show up.</h2></div>
          <InfoCards items={ZONES} />
        </div>
      </section>

      <section className="section alt" id="paths">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Ways to partner</span><h2>Choose your media kit.</h2></div>
          <div className="involve-grid four">
            {PATHS.map((t) => (
              <Link className="i-tile" to={t.to} key={t.title}>
                <img src={t.img} alt={t.alt} loading="lazy" decoding="async" width="960" height="640" />
                <span className="k">{t.k}</span><h3>{t.title}</h3><p>{t.text}</p>
                <span className="go"><i><Icon name="arrow" /></i>{t.cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><span className="eyebrow">How we promote you</span><h2>Seen before, during and after.</h2></div>
          <InfoCards items={CHANNELS} />
        </div>
      </section>

      <section className="section alt">
        <div className="container narrow">
          <div className="section-head"><span className="eyebrow">Recognition schedule</span><h2>When your brand appears.</h2></div>
          <div className="detail-list">
            {TIMELINE.map(([t, d]) => <div key={t}><div className="icon-tile"><Icon name="calendar" /></div><h3>{t}</h3><p>{d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Talk to us</span>
            <h2>Questions about partnering?</h2>
            <p className="lead">We’ll walk you through the options and build a package that fits.</p>
          </div>
          <ContactCard />
        </div>
      </section>
    </>
  );
}

/* ---------- /partners/restaurants ---------- */
const R_BENEFITS = [
  ["store", "Your own booth", "Dedicated space in the BC Restaurant Village with a Taste of BC banner showing your name and menu."],
  ["star", "Listed everywhere", "Official website, online menu, vendor directory, info booklet and festival map."],
  ["instagram", "Social features", "Your restaurant in our vendor features and weekly countdown posts."],
  ["utensils", "Signature moment", "Offer a signature dish, limited-edition item or festival-exclusive tasting."],
  ["flag", "Chef stage time", "Apply for chef demos, culinary competitions and vendor spotlights."],
  ["sparkle", "People’s Choice awards", "Eligible for awards in food, beverage and presentation."],
  ["tag", "Win regulars", "Hand out menus, loyalty offers, restaurant cards or QR codes to visitors."],
  ["book", "Post-event report", "Attendance, engagement and visitor-feedback summary after the festival."]
];

const R_REQUIREMENTS = [
  "Submit your menu, coupon prices, dietary information and service needs by the deadline.",
  "Provide accurate allergen and ingredient information for every item.",
  "Hold a valid temporary food permit and meet food-safety, insurance and waste requirements.",
  "Bring trained staff and enough product for your service hours.",
  "Use reusable or compostable serviceware where practical.",
  "Attend vendor orientation and your scheduled load-in and load-out."
];

const STEPS = (who) => [
  ["Apply", `Fill in the ${who} profile below. It goes straight into our partner database.`],
  ["Confirm", "We review, then confirm your booth, menu, coupon prices and power needs."],
  ["Get promoted", "Your listing goes live and we start featuring you in the countdown."]
];

const Steps = ({ who }) => (
  <ol className="steps-row">
    {STEPS(who).map(([t, d], i) => <li key={t}><span className="n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><h3>{t}</h3><p>{d}</p></li>)}
  </ol>
);

export function RestaurantKit() {
  return (
    <>
      <PageHero img="/assets/img/stock/grilled-salmon.jpg" crumb="Restaurant Media Kit" eyebrow={`Restaurant media kit · ${RESTAURANT_GOAL} restaurants wanted`} title="Bring your best dish to BC’s biggest table."
        lead={`Restaurants are at the centre of Taste of BC. Serve one to three showcase items, meet ${VISITOR_GOAL} hungry visitors and turn them into regulars.`}>
        <div className="row mt-6"><a className="btn btn-light btn-lg" href="#profile">Join as a restaurant</a><PrintButton /></div>
      </PageHero>

      <section className="section"><div className="container"><Glance /></div></section>

      <section className="section alt">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Why join</span><h2>What you get as a restaurant partner.</h2></div>
          <InfoCards items={R_BENEFITS} cols={4} />
        </div>
      </section>

      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">How it works</span>
            <h2>Small plates, big reach.</h2>
            <p className="lead">Visitors taste a little from a lot of booths, so a sample-size menu keeps lines short and puts your food in more hands.</p>
          </div>
          <ul className="kbd-list">
            <li><Icon name="utensils" /><div><strong>Showcase menu</strong><span>One to three showcase items, sample portions only, not your full menu.</span></div></li>
            <li><Icon name="store" /><div><strong>Tent fees</strong><span>{E.boothFees.map(([s, p]) => `${s}: $${p.toLocaleString("en-CA")}`).join(" · ")}, covering all {E.days} days.</span></div></li>
            <li><Icon name="ticket" /><div><strong>Coupon pricing</strong><span>Items are priced in $1 coupons, {E.couponRange} per dish <Tbc />. No cash at booths.</span></div></li>
            <li><Icon name="nocash" /><div><strong>Settlement</strong><span>Hand in your coupons at close each day. We settle them with you after the festival at the rate in your vendor agreement <Tbc />.</span></div></li>
            <li><Icon name="heart" /><div><strong>Every diet welcome</strong><span>Vegetarian, vegan, halal, gluten-aware and allergen-labelled options help more visitors choose you.</span></div></li>
          </ul>
        </div>
      </section>

      <section className="section alt">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">What we ask</span>
            <h2>Partner requirements.</h2>
            <p className="lead">The full list is in the <Link to="/legal#vendor-terms">Vendor Terms & Conditions</Link>.</p>
          </div>
          <Ticks items={R_REQUIREMENTS} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Next steps</span><h2>Three steps to your booth.</h2></div>
          <Steps who="restaurant" />
        </div>
      </section>

      <section className="section alt" id="profile">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Restaurant profile</span>
            <h2>Tell us about your restaurant.</h2>
            <p className="lead">This becomes your partner record. We use it to plan your booth and write your website listing and social features.</p>
            <ContactCard />
          </div>
          <div className="card" style={{ padding: "clamp(24px,3vw,40px)" }}><FoodVendorForm /></div>
        </div>
      </section>
    </>
  );
}

/* ---------- /partners/beverage ---------- */
const B_BENEFITS = [
  ["wine", "Pour in the Beverage Garden", "A station in the 19+ Beverage Garden, the festival’s social hub."],
  ["users", "Guided tastings", "Host a guided tasting or a food and drink pairing session."],
  ["star", "Listed everywhere", "Website, online menu, info booklet, map and Beverage Garden signage."],
  ["instagram", "Producer features", "Social posts and countdown features introducing your label."],
  ["sparkle", "People’s Choice awards", "Eligible for the beverage People’s Choice award."],
  ["tag", "Sell after the festival", "Hand out tasting-room offers, club sign-ups or QR codes to visitors."],
  ["megaphone", "Stage mentions", "MC shout-outs during the evening pairing sessions and headliners."],
  ["book", "Post-event report", "Attendance, engagement and visitor-feedback summary after the festival."]
];

const B_REQUIREMENTS = [
  "Licensed producers need a special event liquor permit. We’ll guide you through it.",
  "All pouring staff hold valid Serving It Right certification.",
  "Age is verified at the Beverage Garden entrance. Pours are served only inside the 19+ area.",
  "Serve set pour sizes and flights priced in $1 coupons.",
  "Non-alcoholic options are encouraged so every guest can join in.",
  "Attend vendor orientation and your scheduled load-in and load-out."
];

export function BeverageKit() {
  return (
    <>
      <PageHero img="/assets/img/stock/wine-tasting.jpg" crumb="Beverage Media Kit" eyebrow="Wineries · breweries · cideries · distilleries" title="Pour for BC’s biggest food crowd."
        lead="Introduce your wine, beer, cider, spirits or craft non-alcoholic drinks to thousands of guests in the 19+ Beverage Garden.">
        <div className="row mt-6"><a className="btn btn-light btn-lg" href="#profile">Join as a producer</a><PrintButton /></div>
      </PageHero>

      <section className="section"><div className="container"><Glance /></div></section>

      <section className="section alt">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Why join</span><h2>What you get as a beverage partner.</h2></div>
          <InfoCards items={B_BENEFITS} cols={4} />
        </div>
      </section>

      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Responsible service</span>
            <h2>Partner requirements.</h2>
            <p className="lead">Responsible beverage service is a core festival value. The full list is in the <Link to="/legal#vendor-terms">Vendor Terms & Conditions</Link>.</p>
          </div>
          <Ticks items={B_REQUIREMENTS} />
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Next steps</span><h2>Three steps to your station.</h2></div>
          <Steps who="producer" />
          <p className="small muted mt-6 mb-0">Want to brand the whole garden? See the <Link to="/sponsorship#packages">Beverage Garden partnership</Link>.</p>
        </div>
      </section>

      <section className="section" id="profile">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Producer profile</span>
            <h2>Tell us about your label.</h2>
            <p className="lead">This becomes your partner record. We use it to plan your station and write your listing and features.</p>
            <ContactCard />
          </div>
          <div className="card" style={{ padding: "clamp(24px,3vw,40px)", background: "var(--cream)", border: 0 }}><BeverageVendorForm /></div>
        </div>
      </section>
    </>
  );
}

/* ---------- /donate ---------- */
const FUNDS = [
  ["access", "Accessible visitor services", "Accessible entrances, seating, viewing areas and washrooms."],
  ["heart", "Family & community programming", "Family Discovery Area activities, food education and cultural programming."],
  ["music", "Local performers", "Fair pay for BC musicians, dancers and artists on our free stages."],
  ["shield", "Safety & first aid", "First aid, security and emergency-response planning."],
  ["map", "Wayfinding & information", "Maps, signs and the info booths that help everyone find their way."],
  ["reset", "Water & waste diversion", "Free water refill stations, recycling and composting."]
];

const WAYS = [
  ["gift", "Make a donation", "A one-time gift of any size toward the festival."],
  ["store", "Give in kind", "Goods or services such as tents, printing, transport or equipment."],
  ["star", "Donate a prize", "Dining experiences, hotel stays or products for raffles and the silent auction."],
  ["flag", "Fund a festival item", "Sponsor a water station, a family activity or a set of signs."]
];

const AREAS = ["Wherever it’s needed most", "Accessibility", "Family & community programming", "Local performers", "Safety & first aid", "Water & waste diversion"];

export function Donate() {
  return (
    <>
      <PageHero img="/assets/img/stock/crowd-lawn.jpg" crumb="Donate" eyebrow="Donors & supporters" title="Help keep the gates free."
        lead="Taste of BC is a not-for-profit community festival. Donations and in-kind support pay for the things that make it safe, accessible and free for every family.">
        <div className="row mt-6"><a className="btn btn-light btn-lg" href="#pledge">Make a pledge</a><a className="btn btn-outline-light btn-lg" href="#ways">Ways to give</a></div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Where it goes</span><h2>What your gift supports.</h2></div>
          <InfoCards items={FUNDS} />
        </div>
      </section>

      <section className="section alt" id="ways">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Ways to give</span><h2>Every kind of support counts.</h2></div>
          <InfoCards items={WAYS} cols={4} />
        </div>
      </section>

      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Recognition</span>
            <h2>We say thank you, publicly.</h2>
            <p className="lead">Unless you’d rather stay anonymous, supporters are recognized on our website, on the partner thank-you page of the info booklet and on social media.</p>
          </div>
          <div className="callout neutral" style={{ alignSelf: "stretch" }}>
            <Icon name="info" />
            <div><strong>Tax receipts</strong>
              <p>Whether donations qualify for a tax receipt is still being confirmed <Tbc />. We’ll tell you before you give.</p></div>
          </div>
        </div>
      </section>

      <section className="section alt" id="pledge">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Pledge form</span>
            <h2>Tell us how you’d like to help.</h2>
            <p className="lead">No payment is taken here. We’ll contact you to confirm your gift and how to send it.</p>
            <ContactCard />
          </div>
          <div className="card" style={{ padding: "clamp(24px,3vw,40px)" }}>
            <ValidatedForm name="donation-pledge" submitLabel="Send pledge" success={{ title: "Thank you!", text: "We’ve received your pledge and will be in touch within two business days." }}>
              <div className="form-row">
                <Field id="d-name" label="Your name" required error="Please enter your name."><input className="input" id="d-name" name="name" required autoComplete="name" /></Field>
                <Field id="d-org" label="Organization (optional)"><input className="input" id="d-org" name="organization" autoComplete="organization" /></Field>
              </div>
              <div className="form-row">
                <Field id="d-email" label="Email" required error="Enter a valid email address."><input className="input" id="d-email" name="email" type="email" required autoComplete="email" /></Field>
                <Field id="d-phone" label="Phone"><input className="input" id="d-phone" name="phone" type="tel" autoComplete="tel" /></Field>
              </div>
              <div className="form-row">
                <Field id="d-donor" label="I’m giving as" required error="Please choose one.">
                  <select className="select" id="d-donor" name="donor_type" required defaultValue="">
                    <option value="">Select…</option><option>Individual</option><option>Business</option><option>Foundation</option><option>Community group</option>
                  </select>
                </Field>
                <Field id="d-type" label="Type of support" required error="Please choose one.">
                  <select className="select" id="d-type" name="gift_type" required defaultValue="">
                    <option value="">Select…</option><option>Donation</option><option>In-kind goods or services</option><option>Raffle or auction prize</option><option>Fund a festival item</option>
                  </select>
                </Field>
              </div>
              <Field id="d-amount" label="Amount or description" required error="Please tell us the amount or what you’d like to give." hint="e.g. $500, or “200 printed maps”.">
                <input className="input" id="d-amount" name="amount_or_description" required />
              </Field>
              <Checks label="Direct my support to" name="fund_area" options={AREAS} />
              <Field id="d-recog" label="Recognition">
                <select className="select" id="d-recog" name="recognition" defaultValue="Use my name"><option>Use my name</option><option>Use my organization’s name</option><option>Keep me anonymous</option></select>
              </Field>
              <Field id="d-msg" label="Message"><textarea className="textarea" id="d-msg" name="message" style={{ minHeight: 90 }} /></Field>
            </ValidatedForm>
          </div>
        </div>
      </section>
    </>
  );
}
