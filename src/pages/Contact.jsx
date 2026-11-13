import { event as E, socials } from "../data.js";
import { Icon, OrTbc, PageHero } from "../lib/ui.jsx";
import { Field, ValidatedForm } from "../lib/forms.jsx";

export const SocialLinks = ({ className = "socials" }) => (
  <div className={className}>
    {/* TBC: social URLs live in data.js → socials */}
    {socials.map((s) => <a key={s.id} href={s.url || "#"} aria-label={s.label} {...(s.url ? { target: "_blank", rel: "noopener noreferrer" } : {})}><Icon name={s.id} /></a>)}
  </div>
);

export default function Contact() {
  return (
    <>
      <PageHero img="/assets/img/stock/festival-crowd.jpg" crumb="Contact" eyebrow="Contact" title="Get in touch."
        lead="General questions, media requests or accessibility needs — we’re happy to help." />
      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <ul className="contact-list">
              <li><Icon name="mail" /><div><strong>Email</strong><a href={"mailto:" + E.email}>{E.email}</a></div></li>
              <li><Icon name="megaphone" /><div><strong>Partnerships</strong><a href={"mailto:" + E.email}>{E.email}</a></div></li>
              <li><Icon name="phone" /><div><strong>Phone</strong>{E.phone ? <a href={"tel:+1" + E.phone.replace(/\D/g, "")}>{E.phone}</a> : <OrTbc value={null} label="Phone" />}</div></li>
              <li><Icon name="pin" /><div><strong>Office</strong><OrTbc value={E.office} label="Office address" /></div></li>
            </ul>
            <h4 className="mt-8">Follow along</h4>
            <SocialLinks className="socials light" />
          </div>
          <div className="card" style={{ padding: "clamp(24px,3vw,40px)", background: "var(--cream)", border: 0 }}>
            <ValidatedForm name="contact" submitLabel="Send message" success={{ title: "Message sent.", text: "We reply within two business days." }}>
              <div className="form-row">
                <Field id="c-name" label="Name" required error="Please enter your name."><input className="input" id="c-name" name="name" required autoComplete="name" /></Field>
                <Field id="c-email" label="Email" required error="Enter a valid email address."><input className="input" id="c-email" name="email" type="email" required autoComplete="email" /></Field>
              </div>
              <Field id="c-topic" label="Topic">
                <select className="select" id="c-topic" name="topic"><option>General question</option><option>Tasty Bucks & orders</option><option>Accessibility</option><option>Media</option><option>Vendors</option><option>Entertainers</option><option>Volunteering</option><option>Sponsorship</option></select>
              </Field>
              <Field id="c-msg" label="Message" required error="Please write a message."><textarea className="textarea" id="c-msg" name="message" required /></Field>
            </ValidatedForm>
          </div>
        </div>
      </section>
    </>
  );
}
