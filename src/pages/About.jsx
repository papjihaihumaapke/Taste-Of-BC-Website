import { event as E } from "../data.js";
import { Icon, PageHero } from "../lib/ui.jsx";
import { Field, ValidatedForm } from "../lib/forms.jsx";
import { FAQ } from "../lib/faq.jsx";


export default function About() {
  return (
    <>
      <PageHero img="/assets/img/stock/festival-crowd.jpg" crumb="About" eyebrow="About Taste of BC" title="A not-for-profit celebration of BC’s food community."
        lead="Taste of BC brings local restaurants, BC wineries, performers and artists together for four days in Surrey, with free entry so everyone can come and taste." />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container trio">
          <div className="t"><Icon name="users" /><h3>Community first</h3><p className="muted">A not-for-profit event with free entry, so every neighbour can join in.</p></div>
          <div className="t"><Icon name="store" /><h3>Local makers</h3><p className="muted">BC restaurants, bakers, brewers, winemakers and artists, from big names to first-timers.</p></div>
          <div className="t"><Icon name="music" /><h3>Entertainment for all</h3><p className="muted">Two stages of local talent, chef demos, live art and a Family Zone.</p></div>
        </div>
      </section>

      <section className="section alt" id="faq">
        <div className="container narrow">
          <span className="eyebrow">FAQ</span>
          <h2>Frequently asked questions</h2>
          <div className="accordion mt-6">
            {FAQ.map(({ q, a, todo }, n) => (
              <details key={q} open={n === 0}><summary><span>{q}{todo && <span className="todo">To confirm</span>}</span><span className="pm"><Icon name="plus" /></span></summary><div className="a-body"><p>{a}</p></div></details>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Contact</span>
            <h2>Get in touch.</h2>
            <p className="lead">General questions, media requests or accessibility needs — we’re happy to help.</p>
            <ul className="kbd-list mt-6">
              <li><Icon name="mail" /><div><strong>General</strong><span><a href={"mailto:" + E.email}>{E.email}</a></span></div></li>
              <li><Icon name="megaphone" /><div><strong>Partnerships</strong><span><a href="mailto:partners@tasteofbc.ca">partners@tasteofbc.ca</a></span></div></li>
              <li><Icon name="phone" /><div><strong>Phone</strong><span>{E.phone}</span></div></li>
              <li><Icon name="pin" /><div><strong>Festival site</strong><span>{E.address}</span></div></li>
            </ul>
          </div>
          <div className="card" style={{ padding: "clamp(24px,3vw,40px)", background: "var(--sand)", border: 0 }}>
            <ValidatedForm submitLabel="Send message" success={{ title: "Message sent.", text: "We reply within two business days." }}>
              <div className="form-row">
                <Field id="c-name" label="Name" required error="Please enter your name."><input className="input" id="c-name" required autoComplete="name" /></Field>
                <Field id="c-email" label="Email" required error="Enter a valid email address."><input className="input" id="c-email" type="email" required autoComplete="email" /></Field>
              </div>
              <Field id="c-topic" label="Topic">
                <select className="select" id="c-topic"><option>General question</option><option>Coupons & orders</option><option>Accessibility</option><option>Media</option><option>Vendors</option><option>Entertainers</option><option>Sponsorship</option></select>
              </Field>
              <Field id="c-msg" label="Message" required error="Please write a message."><textarea className="textarea" id="c-msg" required /></Field>
            </ValidatedForm>
          </div>
        </div>
      </section>
    </>
  );
}
