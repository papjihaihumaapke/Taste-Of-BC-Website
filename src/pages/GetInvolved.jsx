import { Link } from "react-router-dom";
import { Icon, PageHero } from "../lib/ui.jsx";
import { Checks, Field, ValidatedForm } from "../lib/forms.jsx";

export default function GetInvolved() {
  return (
    <>
      <PageHero crumb="Get Involved" eyebrow="Get involved" title="It takes a community to throw a festival."
        lead="Taste of BC is a not-for-profit event run with local restaurants, performers, volunteers and partners. There’s a place for you." />

      <section className="section tight">
        <div className="container trio">
          <div className="t"><Icon name="store" /><h3>Bring your kitchen, winery or brewery</h3><a className="link-arrow" href="#vendors">Vendor applications</a></div>
          <div className="t"><Icon name="star" /><h3>Perform on our stages or show your art</h3><Link className="link-arrow" to="/entertainers">Entertainers</Link></div>
          <div className="t"><Icon name="heart" /><h3>Volunteer a shift and join the crew</h3><a className="link-arrow" href="#volunteer">Volunteer</a></div>
        </div>
      </section>

      <section className="band" id="vendors">
        <div className="container">
          <div>
            <span className="eyebrow">For restaurants & drink makers</span>
            <h2>We handle the setup. You bring the flavour.</h2>
            <p>Every vendor gets the same professional look and a simple, cashless way to sell.</p>
          </div>
          <ul className="icon-links" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li><span className="a"><Icon name="store" />Booth space on the field</span></li>
            <li><span className="a"><Icon name="banner" />Taste of BC banner with your name</span></li>
            <li><span className="a"><Icon name="utensils" />Menu board with coupon prices</span></li>
            <li><span className="a"><Icon name="ticket" />Coupon redemption, paid out after</span></li>
            <li><span className="a"><Icon name="book" />Listing & menu in the booklet</span></li>
            <li><span className="a"><Icon name="map" />Booth on the festival map</span></li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Vendor application</span>
            <h2>Apply for a booth.</h2>
            <p className="lead">Tell us about your business and the menu you’d like to serve. We review every application and reply within five business days.</p>
            <ul className="kbd-list mt-6">
              <li><Icon name="check" /><div><strong>How payment works</strong><span>Visitors pay you in $1 coupons. Hand in your coupons at close each day and we pay out their value after the festival.</span></div></li>
              <li><Icon name="check" /><div><strong>Menu pricing</strong><span>Prices are set in whole coupons. We’ll help you price tasting-size portions.</span></div></li>
              <li><Icon name="check" /><div><strong>Permits</strong><span>Vendors need a valid temporary food permit. Licensed vendors need a special event liquor permit.</span></div></li>
            </ul>
          </div>
          <div className="card" style={{ padding: "clamp(24px,3vw,40px)", background: "var(--sand)", border: 0 }}>
            <ValidatedForm submitLabel="Submit application" success={{ title: "Application received.", text: "Thanks! We’ll be in touch within five business days." }}>
              <div className="form-row">
                <Field id="v-biz" label="Business name" required error="Please enter your business name."><input className="input" id="v-biz" required /></Field>
                <Field id="v-name" label="Contact name" required error="Please enter a contact name."><input className="input" id="v-name" required autoComplete="name" /></Field>
              </div>
              <div className="form-row">
                <Field id="v-email" label="Email" required error="Enter a valid email address."><input className="input" id="v-email" type="email" required autoComplete="email" /></Field>
                <Field id="v-phone" label="Phone" required error="Please enter a phone number."><input className="input" id="v-phone" type="tel" required autoComplete="tel" /></Field>
              </div>
              <div className="form-row">
                <Field id="v-type" label="Vendor type" required error="Choose a vendor type.">
                  <select className="select" id="v-type" required defaultValue=""><option value="">Select…</option><option>Restaurant / food</option><option>Food truck</option><option>Desserts / sweets</option><option>Cold drinks</option><option>BC winery</option><option>Brewery / cidery</option></select>
                </Field>
                <Field id="v-city" label="City"><input className="input" id="v-city" placeholder="e.g. Surrey" /></Field>
              </div>
              <Checks label="Dietary options you’ll offer" options={["Vegetarian", "Vegan", "Gluten-free", "Halal"]} />
              <Field id="v-menu" label="Proposed menu" required error="Please share your proposed menu."><textarea className="textarea" id="v-menu" required placeholder="3–5 items with your suggested coupon price" /></Field>
              <Field error="Please confirm before submitting."><label className="check"><input type="checkbox" required />I confirm we hold (or will obtain) the required permits.</label></Field>
            </ValidatedForm>
          </div>
        </div>
      </section>

      <section className="section alt" id="volunteer">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Volunteers</span>
            <h2>Join the red-lanyard crew.</h2>
            <p className="lead">Welcome guests at the arches, help at Coupon Booths, support the stages and keep the field running smoothly.</p>
            <ul className="ticks">
              <li><Icon name="check" />Festival tee and lanyard</li><li><Icon name="check" />Meal coupons for every shift</li>
              <li><Icon name="check" />Volunteer-hours letter on request</li><li><Icon name="check" />Ages 16+ (under 19 with guardian consent)</li>
            </ul>
          </div>
          <div className="card" style={{ padding: "clamp(24px,3vw,40px)" }}>
            <ValidatedForm submitLabel="Sign up to volunteer" success={{ title: "You’re on the crew list.", text: "We’ll email shift options in early summer." }}>
              <div className="form-row">
                <Field id="vo-name" label="Full name" required error="Please enter your name."><input className="input" id="vo-name" required autoComplete="name" /></Field>
                <Field id="vo-email" label="Email" required error="Enter a valid email address."><input className="input" id="vo-email" type="email" required autoComplete="email" /></Field>
              </div>
              <Checks label="Availability" options={["Thursday", "Friday", "Saturday", "Sunday"]} />
              <Field id="vo-role" label="Preferred role">
                <select className="select" id="vo-role"><option>No preference</option><option>Gate welcome</option><option>Coupon Booth</option><option>Info Booth</option><option>Stage crew</option><option>Family Zone</option><option>Setup / teardown</option></select>
              </Field>
            </ValidatedForm>
          </div>
        </div>
      </section>
    </>
  );
}
