import { Link } from "react-router-dom";
import { Icon, PageHero } from "../lib/ui.jsx";

export default function About() {
  return (
    <>
      <PageHero img="/assets/img/stock/festival-crowd.jpg" crumb="About" eyebrow="About Taste of BC" title="A not-for-profit celebration of BC’s food community."
        lead="Taste of BC brings local restaurants, BC wineries, performers and artists together for four days in Surrey, with free entry so everyone can come and taste." />

      <section className="section">
        <div className="container trio">
          <div className="t"><Icon name="users" /><h3>Community first</h3><p className="muted">A not-for-profit event with free entry, so every neighbour can join in.</p></div>
          <div className="t"><Icon name="store" /><h3>Local makers</h3><p className="muted">BC restaurants, bakers, brewers, winemakers and artists, from big names to first-timers.</p></div>
          <div className="t"><Icon name="music" /><h3>Entertainment for all</h3><p className="muted">Two stages of local talent, chef demos, live art and a Family Discovery Area.</p></div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head"><span className="eyebrow">More about us</span><h2>Questions, press & contact.</h2></div>
          <div className="visit-grid">
            <Link className="v-card" to="/faq"><div className="icon-tile"><Icon name="info" /></div><h3>FAQ</h3><p>Admission, coupons, pets, hours and more.</p><span className="more">Read the FAQ</span></Link>
            <Link className="v-card" to="/media"><div className="icon-tile"><Icon name="download" /></div><h3>Media</h3><p>Logos, festival photos and press contacts.</p><span className="more">Media resources</span></Link>
            <Link className="v-card" to="/contact"><div className="icon-tile"><Icon name="mail" /></div><h3>Contact</h3><p>Email, phone and a general contact form.</p><span className="more">Get in touch</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
