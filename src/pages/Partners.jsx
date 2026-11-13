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

/* Vendor guide: collapsible sections built from the organizer's vendor participation documents */
const VendorGuide = ({ items }) => (
  <div className="accordion">
    {items.map(([q, body], n) => (
      <details key={q} open={n === 0}><summary>{q}<span className="pm"><Icon name="plus" /></span></summary><div className="a-body">{body}</div></details>
    ))}
  </div>
);

const GuideSection = ({ items, who, alt }) => (
  <section className={"section" + (alt ? " alt" : "")} id="guide">
    <div className="container faq-layout">
      <div className="section-head">
        <span className="eyebrow">Vendor guide</span>
        <h2>Everything you need to plan your booth.</h2>
        <p>What we ask of every {who}, from menu submission to teardown. Questions? We’re happy to help.</p>
        <ContactCard />
      </div>
      <VendorGuide items={items} />
    </div>
  </section>
);

const SCHEDULE = [
  ["Vendor check-in", "Report to the vendor check-in point."],
  ["Load-in and setup", "Follow the instructions provided by event staff."],
  ["Final booth inspection", "Confirm your booth is ready before guests arrive."],
  ["Event service", "Remain open for the full service period."],
  ["Teardown", "Do not dismantle your booth before the approved teardown time."]
];

const Schedule = () => (
  <>
    <ul className="kbd-list">{SCHEDULE.map(([t, d], i) => <li key={t}><Icon name="clock" /><div><strong>{i + 1}. {t}</strong><span>{d}</span></div></li>)}</ul>
    <p className="small muted mt-4">Exact times and the check-in location are sent with your booth confirmation.</p>
  </>
);

const NoCash = () => (
  <div className="callout mt-6"><Icon name="nocash" />
    <div><strong>Tasty Bucks only. No cash, ever.</strong>
      <p>Guests buy Tasty Bucks only at designated Taste of BC booths. Vendors must not accept cash or process cash transactions. A vendor found taking cash is shut down immediately and permanently banned from future Taste of BC events.</p></div>
  </div>
);

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
  "Submit all required registration and business information by the stated deadline.",
  "Provide a proposed menu and identify all major allergens.",
  "Bring enough food, ingredients, serving supplies, utensils and packaging for the expected attendance. Sample portions only.",
  "Provide trained staff to prepare and serve food safely and professionally.",
  "Supply any equipment not specifically provided by the event organizer.",
  "Keep your vendor area clean, organized and free of waste throughout the event.",
  "Follow the organizer’s arrival, setup, service, teardown and departure procedures.",
  "Maintain appropriate insurance and permits, as required by the venue or relevant authorities."
];

const R_GUIDE = [
  ["Menu submission", <><p>Offer one to six signature items that can be prepared and served efficiently, in tasting portions only. Send us:</p>
    <Ticks items={["Restaurant name and logo, if applicable", "Menu item names and descriptions", "Ingredient and allergen information", "Tasty Bucks redemption details for each item"]} /></>],
  ["Booth and equipment", <><p>Choose and book the tent size that fits your operation: {E.tentSizes.join(" or ")}. Confirm your space and equipment needs with us before the event. Unless we confirm otherwise in writing, bring everything you need to run your station:</p>
    <Ticks items={["Table covering (we provide one table per booth)", "Menu signage and price displays", "Food-preparation and serving equipment", "Approved food-storage and transportation containers", "Serving dishes, cups, cutlery and napkins. All service ware must be biodegradable", "Handwashing or sanitizing supplies, as required", "Garbage, recycling and compost-collection supplies", "Extension cords or other equipment, only where approved by the venue", "Personal protective equipment and cleaning supplies, where appropriate"]} /></>],
  ["Setup and teardown", <Schedule />],
  ["Food safety and allergens", <><p>All food must be prepared, transported, stored and served in line with food-safety requirements. Keep food at safe temperatures, prevent cross-contamination and make sure every staff member follows safe food-handling practices.</p>
    <p>Allergen information must be accurate and available to guests on request. Be ready to explain ingredients and identify cross-contact risks. If an item can’t be guaranteed allergen-free, tell guests clearly.</p></>],
  ["Staffing", <><p>Bring enough staff to handle food preparation, service, Tasty Bucks redemption, guest questions, restocking and cleanup. Staff should wear clean, suitable attire and represent your restaurant courteously and professionally.</p>
    <p>Your staff list should name an on-site lead, a food-service lead and any additional staff, with contact details for each.</p></>],
  ["Marketing information", <><p>Send us the following so we can promote you:</p>
    <Ticks items={["Restaurant name and location", "A short description of about 50–75 words", "Logo and approved photographs", "Website and social media links", "Your featured menu item for the event", "Any dietary, regional or culinary highlights"]} /></>],
  ["Vendor checklist", <Ticks items={["Registration form completed", "Menu submitted and approved", "Allergen information provided", "Insurance and permits confirmed", "Staff list submitted", "Equipment and power requirements confirmed", "Food quantities planned", "Signage and promotional materials prepared", "Transportation and loading arrangements confirmed", "Tasty Bucks redemption process confirmed"]} />],
  ["Vendor confirmation", <p>By taking part in Taste of BC, your restaurant confirms that it has reviewed the event information, understands its responsibilities and will follow the organizer’s instructions, venue requirements and food-safety standards. An authorized representative signs the confirmation when your booth is booked.</p>]
];

const STEPS = (who) => [
  ["Apply", `Fill in the ${who} profile below. It goes straight into our partner database.`],
  ["Confirm", "We review, then confirm your booth, menu, Tasty Bucks prices and power needs."],
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
        lead={`Restaurants are at the centre of Taste of BC. Serve one to six signature items, meet ${VISITOR_GOAL} hungry visitors and turn them into regulars.`}>
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
            <li><Icon name="utensils" /><div><strong>Signature menu</strong><span>One to six signature items, sample portions only, not your full menu.</span></div></li>
            <li><Icon name="store" /><div><strong>Tent sizes</strong><span>{E.tentSizes.join(" or ")}, covering all {E.days} days. One table provided per booth.</span></div></li>
            <li><Icon name="ticket" /><div><strong>Tasty Bucks only</strong><span>Every sample is redeemed with Tasty Bucks, which guests buy at Taste of BC booths. No cash at booths.</span></div></li>
            <li><Icon name="nocash" /><div><strong>Settlement</strong><span>Hand in your Tasty Bucks at close each day. We settle them with you after the festival at the rate in your vendor agreement <Tbc />.</span></div></li>
            <li><Icon name="heart" /><div><strong>Every diet welcome</strong><span>Vegetarian, vegan, halal, gluten-aware and allergen-labelled options help more visitors choose you.</span></div></li>
          </ul>
        </div>
      </section>

      <section className="section alt">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">What we ask</span>
            <h2>Vendor responsibilities.</h2>
            <p className="lead">Each vendor plans and delivers its menu, staffs its booth, brings its equipment and serves food safely.</p>
            <NoCash />
          </div>
          <Ticks items={R_REQUIREMENTS} />
        </div>
      </section>

      <GuideSection items={R_GUIDE} who="restaurant" />

      <section className="section alt">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Next steps</span><h2>Three steps to your booth.</h2></div>
          <Steps who="restaurant" />
        </div>
      </section>

      <section className="section" id="profile">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Restaurant profile</span>
            <h2>Tell us about your restaurant.</h2>
            <p className="lead">This becomes your partner record. We use it to plan your booth and write your website listing and social features.</p>
            <ContactCard />
          </div>
          <div className="card" style={{ padding: "clamp(24px,3vw,40px)", background: "var(--cream)", border: 0 }}><FoodVendorForm /></div>
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
  "Submit all required registration, business, licensing and product information by the stated deadline.",
  "Provide a proposed beverage menu with product names, descriptions, serving sizes, alcohol content where applicable, and allergen information.",
  "Bring enough beverages, ingredients, ice, cups, serving supplies, equipment and packaging for the expected attendance.",
  "Offer tasting portions only, unless larger servings are approved by the organizer and permitted by applicable requirements.",
  "Provide trained staff to serve beverages safely, responsibly and professionally.",
  "Supply any equipment not specifically provided by the event organizer.",
  "Keep your vendor area clean, organized and free of waste throughout the event.",
  "Follow the organizer’s arrival, setup, service, teardown and departure procedures.",
  "Maintain all required insurance, licences, permits, registrations and certifications.",
  "Serve alcohol only in line with liquor laws, responsible-service requirements and venue rules."
];

const B_GUIDE = [
  ["Beverage submission", <><p>Offer one to six featured beverages that can be prepared, poured and served efficiently, in tasting sizes that meet applicable requirements. Clearly distinguish alcoholic and non-alcoholic products. Send us:</p>
    <Ticks items={["Business or vendor name and logo, if applicable", "Beverage names, descriptions and product categories", "Ingredients and allergen information", "Serving size and Tasty Bucks redemption details", "Alcohol-by-volume percentage for each alcoholic beverage", "Liquor licences, permits, registrations and responsible-service certifications, where applicable", "Any preparation, refrigeration, dispensing, mixing, carbonation or storage equipment you need", "Confirmation that each product is approved for service at the event"]} /></>],
  ["Booth and equipment", <><p>Choose and book the tent size that fits your operation: {E.tentSizes.join(" or ")}. Confirm your space and equipment needs with us before the event. Unless we confirm otherwise in writing, bring everything you need to run your station:</p>
    <Ticks items={["Table covering (we provide one table per booth)", "Menu signage, product information and price displays", "Approved dispensing, pouring, mixing, blending or serving equipment", "Approved food-grade storage and transportation containers", "Cups, tasting glasses, stirrers, straws, napkins and other service ware. Biodegradable where required by the event", "Ice, coolers, refrigeration or other temperature-control equipment", "Water and handwashing or sanitizing supplies, as required", "Garbage, recycling and compost-collection supplies", "Spill-control materials and cleaning supplies", "Extension cords or other electrical equipment, only where approved by the venue", "Personal protective equipment and other safety supplies, where appropriate", "For alcohol vendors: any age-verification, service-control and product-identification materials required"]} /></>],
  ["Setup and teardown", <Schedule />],
  ["Safety and allergens", <><p>All beverages must be prepared, transported, stored and served in line with health, safety, liquor and venue requirements. Maintain temperature control and protect products from contamination, tampering and cross-contact throughout the event.</p>
    <p>Allergen information must be accurate and available on request, including ingredients in mixers, syrups, garnishes, flavourings, juices, concentrates and ready-to-serve drinks. If a beverage can’t be guaranteed allergen-free, tell guests clearly.</p></>],
  ["Responsible service", <><p>Vendors serving alcohol must follow every event procedure for age verification, responsible service, refusal of service, portion control and preventing service to intoxicated guests. Never serve anyone who is underage, appears intoxicated or can’t show acceptable proof of age when asked.</p>
    <p>All pouring staff hold valid Serving It Right certification, and licensed producers need a special event liquor permit. We’ll guide you through it.</p></>],
  ["Staffing", <><p>Bring enough staff to handle preparation, pouring, dispensing, Tasty Bucks redemption, age verification where applicable, guest questions, restocking, spill response and cleanup. Staff should wear clean, suitable attire and represent your business courteously and professionally.</p>
    <p>Your staff list should name an on-site lead, a beverage-service lead, a responsible-service lead if you serve alcohol, and any additional staff, with contact details for each.</p></>],
  ["Marketing information", <><p>Send us the following so we can promote you:</p>
    <Ticks items={["Vendor name and location", "A short description of about 50–75 words", "Logo and approved photographs", "Website and social media links", "Your featured beverage or product for the event", "Product category: wine, beer, spirits, cider, cocktails, mocktails, juice, coffee, tea, kombucha, soda or another non-alcoholic drink", "Any dietary, regional, production, sustainability or culinary highlights"]} /></>],
  ["Vendor checklist", <Ticks items={["Registration form completed", "Beverage menu submitted and approved", "Ingredient, allergen and alcohol-content information provided", "Licences, permits, registrations, insurance and responsible-service credentials confirmed", "Staff list submitted", "Equipment, refrigeration, ice, water and power requirements confirmed", "Beverage quantities planned", "Age-verification and responsible-service procedures confirmed, where applicable", "Signage and promotional materials prepared", "Transportation and loading arrangements confirmed", "Tasty Bucks redemption process confirmed", "Spill response, waste management and cleanup procedures prepared"]} />],
  ["Vendor confirmation", <p>By taking part in Taste of BC, your business confirms that it has reviewed the event information, understands its responsibilities and will comply with the organizer’s instructions, venue requirements, health and safety standards, liquor laws, responsible-service requirements and all licensing and permit conditions. An authorized representative signs the confirmation when your booth is booked.</p>]
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
            <span className="eyebrow">What we ask</span>
            <h2>Vendor responsibilities.</h2>
            <p className="lead">Wineries, breweries, distilleries, cideries, distributors, specialty drink makers and non-alcoholic beverage companies are all welcome. Responsible service is a core festival value.</p>
            <NoCash />
          </div>
          <Ticks items={B_REQUIREMENTS} />
        </div>
      </section>

      <GuideSection items={B_GUIDE} who="beverage vendor" alt />

      <section className="section">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Next steps</span><h2>Three steps to your station.</h2></div>
          <Steps who="producer" />
          <p className="small muted mt-6 mb-0">Want to brand the whole garden? See the <Link to="/sponsorship#packages">Beverage Garden partnership</Link>.</p>
        </div>
      </section>

      <section className="section alt" id="profile">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Producer profile</span>
            <h2>Tell us about your label.</h2>
            <p className="lead">This becomes your partner record. We use it to plan your station and write your listing and features.</p>
            <ContactCard />
          </div>
          <div className="card" style={{ padding: "clamp(24px,3vw,40px)" }}><BeverageVendorForm /></div>
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
