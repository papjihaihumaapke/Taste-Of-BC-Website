import { useState } from "react";
import { event as E } from "../data.js";
import { Icon, PageHero } from "../lib/ui.jsx";
import { Checks, Field, ValidatedForm } from "../lib/forms.jsx";

function ApplyForm() {
  return (
    <ValidatedForm submitLabel="Submit application"
      success={{ title: "Application received.", text: "Thanks! Our entertainment team reviews every application and will email you within two weeks." }}>
      <div className="form-row">
        <Field id="e-act" label="Act / artist name" required error="Please enter your act name."><input className="input" id="e-act" required /></Field>
        <Field id="e-name" label="Contact name" required error="Please enter a contact name."><input className="input" id="e-name" required autoComplete="name" /></Field>
      </div>
      <div className="form-row">
        <Field id="e-email" label="Email" required error="Enter a valid email address."><input className="input" id="e-email" type="email" required autoComplete="email" /></Field>
        <Field id="e-phone" label="Phone" required error="Please enter a phone number."><input className="input" id="e-phone" type="tel" required autoComplete="tel" /></Field>
      </div>
      <div className="form-row">
        <Field id="e-type" label="Type of act" required error="Choose a type of act.">
          <select className="select" id="e-type" required defaultValue="">
            <option value="">Select…</option><option>Band / musician</option><option>DJ</option><option>Dance group</option>
            <option>Comedy</option><option>Visual / live artist</option><option>Kids entertainer</option><option>Chef / cooking demo</option><option>Other</option>
          </select>
        </Field>
        <Field id="e-size" label="Number of performers"><input className="input" id="e-size" type="number" min="1" placeholder="e.g. 4" /></Field>
      </div>
      <Checks label={`Available days (${E.datesShort})`} options={["Thursday", "Friday", "Saturday", "Sunday"]} />
      <Field id="e-link" label="Link to your work" required error="Please add a link (website, video or social)." hint="YouTube, Instagram, Spotify, website or portfolio.">
        <input className="input" id="e-link" type="url" required placeholder="https://" />
      </Field>
      <Field id="e-about" label="Tell us about your act" required error="Please tell us a little about your act.">
        <textarea className="textarea" id="e-about" required placeholder="Style, set length, technical needs…" />
      </Field>
      <Field error="Please confirm before submitting.">
        <label className="check"><input type="checkbox" required />I’m based in BC, or performing with a BC-based group.</label>
      </Field>
    </ValidatedForm>
  );
}

function SignInForm() {
  const [mode, setMode] = useState("signin");
  if (mode === "reset") {
    return (
      <>
        <ValidatedForm submitLabel="Send reset link" success={{ title: "Check your email.", text: "If that address has an entertainer account, a reset link is on its way." }}>
          <Field id="r-email" label="Email" required error="Enter a valid email address."><input className="input" id="r-email" type="email" required autoComplete="email" /></Field>
        </ValidatedForm>
        <button className="btn btn-ghost btn-sm mt-4" onClick={() => setMode("signin")}>Back to sign in</button>
      </>
    );
  }
  return (
    <>
      {/* TODO before launch: connect to the entertainer portal / authentication backend. */}
      <ValidatedForm submitLabel="Sign in" success={{ title: "Portal opening soon.", text: "The entertainer portal opens once bookings are confirmed. We’ll email your login details." }}>
        <Field id="s-email" label="Email" required error="Enter a valid email address."><input className="input" id="s-email" type="email" required autoComplete="email" /></Field>
        <Field id="s-pass" label="Password" required error="Please enter your password."><input className="input" id="s-pass" type="password" required autoComplete="current-password" /></Field>
      </ValidatedForm>
      <button className="btn btn-ghost btn-sm mt-4" onClick={() => setMode("reset")}>Forgot password?</button>
    </>
  );
}

export default function Entertainers() {
  const [tab, setTab] = useState("apply");
  return (
    <>
      <PageHero img="/assets/img/stock/stage-lights.jpg" crumb="Entertainers" eyebrow="Calling all local talent" title="Perform at Taste of BC."
        lead="We’re booking BC musicians, dancers, comedians, DJs and artists for four days on two stages and around the field. Apply to perform, or sign in to manage your booking." />

      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Why perform</span>
            <h2>A big, friendly crowd for local talent.</h2>
            <ul className="kbd-list mt-6">
              <li><Icon name="music" /><div><strong>Professional stages</strong><span>Main Stage and Community Stage with sound, lighting and crew.</span></div></li>
              <li><Icon name="users" /><div><strong>Thousands of visitors</strong><span>Free entry brings families, foodies and music fans from across BC.</span></div></li>
              <li><Icon name="megaphone" /><div><strong>Promotion</strong><span>Your act on the schedule, in the info booklet and on our socials.</span></div></li>
              <li><Icon name="ticket" /><div><strong>Performer perks</strong><span>Food coupons, parking and a green room for every booked act.</span></div></li>
            </ul>
            <p className="small muted mt-6">Taste of BC is a not-for-profit event. Performance fees vary by slot and are confirmed when booking.</p>
          </div>

          <div className="card" style={{ padding: "clamp(24px,3vw,40px)" }}>
            <div className="tabs mb-6" role="tablist" aria-label="Entertainers">
              <button role="tab" id="t-apply" aria-selected={tab === "apply"} aria-controls="p-apply" onClick={() => setTab("apply")}>Apply to perform</button>
              <button role="tab" id="t-signin" aria-selected={tab === "signin"} aria-controls="p-signin" onClick={() => setTab("signin")}>Entertainer sign in</button>
            </div>
            <div role="tabpanel" id="p-apply" aria-labelledby="t-apply" hidden={tab !== "apply"}><ApplyForm /></div>
            <div role="tabpanel" id="p-signin" aria-labelledby="t-signin" hidden={tab !== "signin"}><SignInForm /></div>
          </div>
        </div>
      </section>
    </>
  );
}
