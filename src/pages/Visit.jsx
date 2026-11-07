import { Link } from "react-router-dom";
import { event as E } from "../data.js";
import { DatesNote, Icon, PageHero } from "../lib/ui.jsx";

export default function Visit() {
  return (
    <>
      <PageHero img="/assets/img/stock/crowd-lawn.jpg" crumb="Plan Your Visit" eyebrow="Plan your visit" title="Everything you need before you go."
        lead="Dates, getting to Surrey, accessibility and a few tips for a great summer day at the festival.">
        <div className="row mt-6"><DatesNote /></div>
      </PageHero>

      <section className="section tight">
        <div className="container grid grid-4">
          <div className="card"><div className="icon-tile"><Icon name="calendar" /></div><h4>When</h4><p className="mb-0">{E.datesLong}<br /><span className="muted">{E.hours}</span></p></div>
          <div className="card"><div className="icon-tile"><Icon name="pin" /></div><h4>Where</h4><p className="mb-0">{E.venue}<br /><span className="muted">{E.address}</span></p></div>
          <div className="card"><div className="icon-tile"><Icon name="ticket" /></div><h4>Entry</h4><p className="mb-0">Free, all {E.days} days.<br /><span className="muted">No ticket or registration.</span></p></div>
          <div className="card"><div className="icon-tile"><Icon name="card" /></div><h4>Paying</h4><p className="mb-0">$1 coupons only.<br /><span className="muted">Coupon Booths take card & tap.</span></p></div>
        </div>
      </section>

      <section className="section white">
        <div className="container">
          <div className="section-head split">
            <div><span className="eyebrow">Getting there</span><h2>Getting to the festival.</h2></div>
            <Link className="link-arrow" to="/map">View the festival map</Link>
          </div>
          <div className="grid grid-4">
            <div className="card"><div className="icon-tile"><Icon name="train" /></div><h4>Transit</h4><p className="muted mb-0">Take SkyTrain and connecting buses toward the venue. Use the TransLink trip planner for the fastest route.</p></div>
            <div className="card"><div className="icon-tile"><Icon name="car" /></div><h4>Driving & parking</h4><p className="muted mb-0">On-site and nearby parking. Lots fill up on weekend evenings, so carpool if you can.</p></div>
            <div className="card"><div className="icon-tile"><Icon name="pin" /></div><h4>Rideshare & taxi</h4><p className="muted mb-0">Drop-off and pick-up zone at the North Gate (main entrance).</p></div>
            <div className="card"><div className="icon-tile"><Icon name="access" /></div><h4>Accessible drop-off</h4><p className="muted mb-0">Dedicated accessible drop-off at the West Gate, with step-free access onto the field.</p></div>
          </div>
        </div>
      </section>

      <section className="section" id="accessibility">
        <div className="container split">
          <div>
            <span className="eyebrow">Accessibility</span>
            <h2>A festival for everyone.</h2>
            <p className="lead">We’re planning the site so everyone can get around comfortably. Questions or requests? <Link to="/about#contact">Contact us</Link> before the event.</p>
          </div>
          <ul className="kbd-list">
            <li><Icon name="check" /><div><strong>Step-free main walkways</strong><span>Matting on the main routes between gates, booths and seating.</span></div></li>
            <li><Icon name="check" /><div><strong>Accessible washrooms</strong><span>At every washroom location on the map.</span></div></li>
            <li><Icon name="check" /><div><strong>Accessible seating</strong><span>Reserved spaces in the shaded dining area and at both stages.</span></div></li>
            <li><Icon name="check" /><div><strong>Service animals welcome</strong><span>Pets are not permitted on site.</span></div></li>
            <li><Icon name="check" /><div><strong>Quiet space</strong><span>Ask at the Info Booth for the quiet area.</span></div></li>
          </ul>
        </div>
      </section>

    </>
  );
}
