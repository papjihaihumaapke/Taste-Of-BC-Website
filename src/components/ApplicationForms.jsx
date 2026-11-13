import { Link } from "react-router-dom";
import { event as E } from "../data.js";
import { Checks, Field, ValidatedForm } from "../lib/forms.jsx";

/* Application forms sent to Netlify Forms.
   IMPORTANT: if you add, rename or remove a field here, update the matching form in public/__forms.html. */

const DAYS = ["Thursday", "Friday", "Saturday", "Sunday"];
const sent = (who) => ({ title: "Application received.", text: `Thanks! Our ${who} team reviews every application and will reply by email.` });

/* Shared contact block: business/act name, contact person, email, phone, website */
function ContactFields({ p, orgLabel, orgName = "business_name" }) {
  return (
    <>
      <div className="form-row">
        <Field id={p + "-org"} label={orgLabel} required error="Please fill this in."><input className="input" id={p + "-org"} name={orgName} required autoComplete="organization" /></Field>
        <Field id={p + "-name"} label="Contact name" required error="Please enter a contact name."><input className="input" id={p + "-name"} name="contact_name" required autoComplete="name" /></Field>
      </div>
      <div className="form-row">
        <Field id={p + "-email"} label="Email" required error="Enter a valid email address."><input className="input" id={p + "-email"} name="email" type="email" required autoComplete="email" /></Field>
        <Field id={p + "-phone"} label="Phone" required error="Please enter a phone number."><input className="input" id={p + "-phone"} name="phone" type="tel" required autoComplete="tel" /></Field>
      </div>
      <Field id={p + "-web"} label="Website or social media" hint="Website, Instagram or Facebook page."><input className="input" id={p + "-web"} name="website" placeholder="https://" /></Field>
    </>
  );
}

/* Section label inside long forms */
const Group = ({ children }) => <p className="eyebrow mt-6 mb-0">{children}</p>;

/* Business details + promotion profile. Builds the partner database record and feeds
   the website listing, social features and booklet. */
function ProfileFields({ p, kind }) {
  const food = kind === "food";
  return (
    <>
      <Group>Business details</Group>
      <Field id={p + "-addr"} label={food ? "Restaurant address" : "Winery, brewery or tasting-room address"} hint="Street address and city.">
        <input className="input" id={p + "-addr"} name="address" autoComplete="street-address" />
      </Field>
      <div className="form-row">
        <Field id={p + "-years"} label="Years in business">
          <select className="select" id={p + "-years"} name="years_in_business" defaultValue=""><option value="">Select…</option><option>Opening soon</option><option>Under 1 year</option><option>1–3 years</option><option>4–10 years</option><option>10+ years</option></select>
        </Field>
        <Field id={p + "-locs"} label="Number of locations"><input className="input" id={p + "-locs"} name="locations" type="number" min="0" placeholder="e.g. 1" /></Field>
      </div>
      <div className="form-row">
        <Field id={p + "-ig"} label="Instagram"><input className="input" id={p + "-ig"} name="instagram" placeholder="@yourhandle" /></Field>
        <Field id={p + "-fb"} label="Facebook or TikTok"><input className="input" id={p + "-fb"} name="other_social" placeholder="Page name or link" /></Field>
      </div>

      <Group>Your promotion profile</Group>
      <Field id={p + "-about"} label={food ? "About your restaurant" : "About your label"} required error="Please add a short description."
        hint="2–4 sentences. We use this for your website listing and social features.">
        <textarea className="textarea" id={p + "-about"} name="about" required style={{ minHeight: 100 }} />
      </Field>
      <Field id={p + "-hero"} label={food ? "Signature dish to feature" : "Flagship product to feature"} hint="The one item you want visitors to remember.">
        <input className="input" id={p + "-hero"} name={food ? "signature_dish" : "flagship_product"} />
      </Field>
      <Field id={p + "-assets"} label="Logo and photos" hint="Paste a Google Drive, Dropbox or website link to your logo and 3–5 high-res photos.">
        <input className="input" id={p + "-assets"} name="logo_photos_link" placeholder="https://" />
      </Field>
      <Field id={p + "-offer"} label="Offer for festival visitors (optional)" hint={food ? "e.g. 10% off your next visit, a loyalty card or a QR code." : "e.g. tasting-room discount, club sign-up or a QR code."}>
        <input className="input" id={p + "-offer"} name="visitor_offer" />
      </Field>
      <Checks label="We’d like to take part in" name="promo_interests" options={food
        ? ["Chef demo", "Culinary competition", "People’s Choice awards", "Vendor spotlight", "Restaurant collaboration dish", "Sponsorship or booklet ad"]
        : ["People’s Choice awards", "Vendor spotlight", "Pairing with a restaurant", "Sponsorship or booklet ad"]} />
      <Field id={p + "-staff"} label="Staff on site per shift"><input className="input" id={p + "-staff"} name="staff_on_site" type="number" min="1" placeholder="e.g. 4" /></Field>
    </>
  );
}

const PromoConsent = () => (
  <Field><label className="check"><input type="checkbox" name="promo_consent" value="Yes" /><span>Taste of BC may use our name, logo, photos and description to promote the festival.</span></label></Field>
);

const Confirm = ({ name, children }) => (
  <Field error="Please confirm before submitting."><label className="check"><input type="checkbox" name={name} value="Yes" required /><span>{children}</span></label></Field>
);

/* ---------- Restaurants & food trucks ---------- */
export function FoodVendorForm() {
  return (
    <ValidatedForm name="food-vendor-application" submitLabel="Submit application" success={sent("vendor")}>
      <ContactFields p="fv" orgLabel="Business name" />
      <div className="form-row">
        <Field id="fv-type" label="Vendor type" required error="Choose a vendor type.">
          <select className="select" id="fv-type" name="vendor_type" required defaultValue="">
            <option value="">Select…</option><option>Restaurant</option><option>Food truck</option><option>Food trailer / cart</option>
            <option>Caterer</option><option>Bakery / desserts</option><option>Non-alcoholic drinks</option><option>Other</option>
          </select>
        </Field>
        <Field id="fv-cuisine" label="Cuisine" required error="Please tell us your cuisine."><input className="input" id="fv-cuisine" name="cuisine" required placeholder="e.g. Punjabi, Korean, BBQ" /></Field>
      </div>
      <Field id="fv-city" label="City"><input className="input" id="fv-city" name="city" placeholder="e.g. Surrey" /></Field>
      <ProfileFields p="fv" kind="food" />
      <Group>Festival menu & booth</Group>
      <Field id="fv-menu" label="Proposed sample-size menu" required error="Please share your proposed menu."
        hint={`3–5 items with your suggested price in $1 Tasty Bucks (dishes range from ${E.couponRange} Tasty Bucks).`}>
        <textarea className="textarea" id="fv-menu" name="menu" required placeholder="Dish name – Tasty Bucks" />
      </Field>
      <Checks label="Dietary options you’ll offer" name="dietary_options" options={["Vegetarian", "Vegan", "Gluten-free", "Halal", "Contains nuts"]} />
      <Checks label="Days you can attend" name="days_available" options={DAYS} />
      <div className="form-row">
        <Field id="fv-setup" label="Booth setup">
          <select className="select" id="fv-setup" name="booth_setup" defaultValue="Not sure"><option>Tent / booth</option><option>Food truck</option><option>Trailer</option><option>Not sure</option></select>
        </Field>
        <Field id="fv-power" label="Power needs">
          <select className="select" id="fv-power" name="power_needs" defaultValue="Not sure"><option>None</option><option>Standard outlets</option><option>High power (cooking equipment)</option><option>Own generator</option><option>Not sure</option></select>
        </Field>
      </div>
      <Field id="fv-notes" label="Anything else we should know?"><textarea className="textarea" id="fv-notes" name="notes" style={{ minHeight: 90 }} /></Field>
      <PromoConsent />
      <Confirm name="permits_and_terms">I’ve read the <Link to="/legal#vendor-terms">Vendor Terms & Conditions</Link> and hold (or will obtain) a valid temporary food permit.</Confirm>
    </ValidatedForm>
  );
}

/* ---------- Wineries, breweries, cideries & distilleries ---------- */
export function BeverageVendorForm() {
  return (
    <ValidatedForm name="beverage-vendor-application" submitLabel="Submit application" success={sent("beverage")}>
      <ContactFields p="bv" orgLabel="Company name" orgName="company_name" />
      <div className="form-row">
        <Field id="bv-type" label="Producer type" required error="Choose a producer type.">
          <select className="select" id="bv-type" name="producer_type" required defaultValue="">
            <option value="">Select…</option><option>Winery</option><option>Brewery</option><option>Cidery</option><option>Distillery</option>
            <option>Meadery</option><option>Non-alcoholic craft beverages</option><option>Other</option>
          </select>
        </Field>
        <Field id="bv-region" label="Region in BC" required error="Choose your region.">
          <select className="select" id="bv-region" name="region" required defaultValue="">
            <option value="">Select…</option><option>Okanagan</option><option>Similkameen</option><option>Fraser Valley</option><option>Lower Mainland</option>
            <option>Vancouver Island & Gulf Islands</option><option>Kootenays</option><option>Thompson / Shuswap</option><option>Northern BC</option><option>Other</option>
          </select>
        </Field>
      </div>
      <ProfileFields p="bv" kind="beverage" />
      <Group>Festival pours</Group>
      <Field id="bv-products" label="Products you’d like to pour" required error="Please list the products you’d pour."
        hint="Name, style and suggested price in $1 Tasty Bucks per pour or flight.">
        <textarea className="textarea" id="bv-products" name="products" required />
      </Field>
      <Field id="bv-licence" label="BC manufacturer licence number" hint="If you have one. Licensed vendors need a special event liquor permit.">
        <input className="input" id="bv-licence" name="licence_number" />
      </Field>
      <Checks label="Days you can attend" name="days_available" options={DAYS} />
      <Checks label="Also interested in" name="interests" options={["Hosting a guided tasting", "Food & drink pairing session", "Sponsoring the Beverage Garden"]} />
      <Field id="bv-notes" label="Anything else we should know?"><textarea className="textarea" id="bv-notes" name="notes" style={{ minHeight: 90 }} /></Field>
      <PromoConsent />
      <Confirm name="serving_it_right">Our pouring staff hold valid Serving It Right certification, and I’ve read the <Link to="/legal#vendor-terms">Vendor Terms & Conditions</Link>.</Confirm>
    </ValidatedForm>
  );
}

/* ---------- Entertainers: dancers, singers, musicians and more ---------- */
const ACTS = {
  "Music": ["Solo singer / vocalist", "Singer-songwriter", "Band", "Choir / vocal group", "Instrumental musician", "Traditional / cultural music", "DJ", "Rapper / hip-hop artist"],
  "Dance": ["Bhangra / Giddha", "Bollywood", "Folk / cultural dance", "Indigenous dance", "Hip-hop / street dance", "Latin / salsa", "Ballet / contemporary", "Dance school / youth troupe"],
  "Performance & family": ["Comedian", "Magician / illusionist", "Circus, acrobatics or fire", "Stilt walker / roving performer", "Busker / street performer", "Kids entertainer (balloons, face painting, storytelling)", "MC / host", "Spoken word / poetry"],
  "Art & food": ["Live painter / visual artist", "Cultural workshop", "Chef / cooking demo"],
  "Other": ["Other (tell us below)"]
};

export function EntertainerForm() {
  return (
    <ValidatedForm name="entertainer-application" submitLabel="Submit application" success={sent("entertainment")}>
      <div className="form-row">
        <Field id="en-name" label="Your name" required error="Please enter your name."><input className="input" id="en-name" name="contact_name" required autoComplete="name" /></Field>
        <Field id="en-act" label="Act / group name" required error="Please enter your act name."><input className="input" id="en-act" name="act_name" required /></Field>
      </div>
      <div className="form-row">
        <Field id="en-email" label="Email" required error="Enter a valid email address."><input className="input" id="en-email" name="email" type="email" required autoComplete="email" /></Field>
        <Field id="en-phone" label="Phone" required error="Please enter a phone number."><input className="input" id="en-phone" name="phone" type="tel" required autoComplete="tel" /></Field>
      </div>
      <div className="form-row">
        <Field id="en-type" label="Type of act" required error="Choose the type of act.">
          <select className="select" id="en-type" name="act_type" required defaultValue="">
            <option value="">Select…</option>
            {Object.entries(ACTS).map(([g, opts]) => <optgroup key={g} label={g}>{opts.map((o) => <option key={o}>{o}</option>)}</optgroup>)}
          </select>
        </Field>
        <Field id="en-genre" label="Genre / style" required error="Please describe your genre or style."><input className="input" id="en-genre" name="genre" required placeholder="e.g. Punjabi folk, indie rock, salsa" /></Field>
      </div>
      <div className="form-row">
        <Field id="en-size" label="Number of performers"><input className="input" id="en-size" name="performers" type="number" min="1" placeholder="e.g. 4" /></Field>
        <Field id="en-length" label="Set length">
          <select className="select" id="en-length" name="set_length" defaultValue="Flexible"><option>15 minutes</option><option>30 minutes</option><option>45 minutes</option><option>60 minutes</option><option>90+ minutes</option><option>Roving / all day</option><option>Flexible</option></select>
        </Field>
      </div>
      <Field id="en-city" label="Where are you based?"><input className="input" id="en-city" name="city" placeholder="e.g. Surrey" /></Field>
      <Checks label={`Available days (${E.datesShort})`} name="days_available" options={DAYS} />
      <Field id="en-links" label="Links to your music, videos or work" required error="Please add at least one link." hint="YouTube, Instagram, TikTok, Spotify, SoundCloud or website. One per line.">
        <textarea className="textarea" id="en-links" name="links" required style={{ minHeight: 90 }} placeholder="https://" />
      </Field>
      <Field id="en-tech" label="Technical needs" hint="Microphones, instruments, stage size, power, backline, dressing area…">
        <textarea className="textarea" id="en-tech" name="technical_needs" style={{ minHeight: 90 }} />
      </Field>
      <Field id="en-msg" label="Tell us about your act"><textarea className="textarea" id="en-msg" name="message" placeholder="Experience, past events, what makes your act a great fit…" /></Field>
      <Field><label className="check"><input type="checkbox" name="includes_minors" value="Yes" /><span>Our group includes performers under 19.</span></label></Field>
      <Confirm name="bc_based">I’m based in BC, or performing with a BC-based group.</Confirm>
    </ValidatedForm>
  );
}
