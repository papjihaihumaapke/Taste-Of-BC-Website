import { Link } from "react-router-dom";
import { event as E } from "../data.js";
import { DatesNote, Icon, OrTbc, PageHero, Tbc } from "../lib/ui.jsx";
import { PhotoCards, VISIT_CARDS } from "./Home.jsx";

/* ---------- /visit — Plan Your Visit hub ---------- */
export default function Visit() {
  return (
    <>
      <PageHero img="/assets/img/stock/crowd-lawn.jpg" crumb="Plan Your Visit" eyebrow="Plan your visit" title="Everything you need before you go."
        lead="Dates, getting to Surrey, accessibility and the festival map, all in one place.">
        <div className="row mt-6"><DatesNote /></div>
      </PageHero>

      <section className="section tight">
        <div className="container grid grid-4">
          <div className="card"><div className="icon-tile"><Icon name="calendar" /></div><h4>When</h4><p className="mb-0">{E.datesLong}<br /><span className="muted">{E.hours}</span></p></div>
          <div className="card"><div className="icon-tile"><Icon name="pin" /></div><h4>Where</h4><p className="mb-0"><OrTbc value={E.venue} label="Venue" /><br /><span className="muted">{E.city}</span></p></div>
          <div className="card"><div className="icon-tile"><Icon name="arch" /></div><h4>Admission</h4><p className="mb-0">Free, all ages.<br /><span className="muted">Subject to capacity.</span></p></div>
          <div className="card"><div className="icon-tile"><Icon name="ticket" /></div><h4>Food & drink</h4><p className="mb-0">$1 festival coupons.<br /><span className="muted">{E.couponRange} coupons per dish <Tbc /></span></p></div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Plan ahead</span><h2>Before you go.</h2></div>
          <PhotoCards items={VISIT_CARDS} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Good to know</span><h2>A few festival tips.</h2></div>
          <div className="info-grid">
            <div><Icon name="arch" /><div><strong>Free admission</strong><span>All ages, every day</span></div></div>
            <div><Icon name="heart" /><div><strong>Leashed pets welcome</strong><span>Keep pets on a leash</span></div></div>
            <div><Icon name="card" /><div><strong>Tap to pay <Tbc /></strong><span>For coupons onsite</span></div></div>
            <div><Icon name="wine" /><div><strong>All ages</strong><span>19+ in the Beverage Garden</span></div></div>
          </div>
          <p className="small muted mt-8 mb-0">More questions? See the <Link to="/faq">FAQ</Link>.</p>
        </div>
      </section>
    </>
  );
}

/* ---------- /getting-there ---------- */
export function GettingThere() {
  return (
    <>
      <PageHero img="/assets/img/stock/festival-crowd.jpg" crumb="Getting There" eyebrow="Plan your visit" title="Getting there."
        lead={`Taste of BC takes place in ${E.city}. Transit is the easiest way to arrive, especially on weekend evenings.`} />

      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">The venue</span>
            <h2><OrTbc value={E.venue} label="Venue name" /></h2>
            <ul className="contact-list mt-6">
              <li><Icon name="pin" /><div><strong>Address</strong><OrTbc value={E.address} label="Address" /><br />{E.city}</div></li>
              <li><Icon name="clock" /><div><strong>Hours</strong>{E.hoursByDay.map(([d, h]) => <span key={d} style={{ display: "block" }}>{d}: {h}</span>)}{E.datesLong}</div></li>
            </ul>
          </div>
                    <iframe className="map-embed" title={`Map of ${E.venue || E.city}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(E.mapQuery)}&output=embed`} />
        </div>
      </section>

      <section className="section alt">
        <div className="container narrow">
          <div className="section-head"><span className="eyebrow">Directions</span><h2>Ways to arrive.</h2></div>
          <div className="detail-list">
            <div><div className="icon-tile"><Icon name="train" /></div><h3>By SkyTrain & transit</h3>
              <p>Take SkyTrain and connecting buses toward the venue. Nearest station and bus routes <Tbc />.</p>
              <p><a href="https://www.translink.ca" target="_blank" rel="noopener noreferrer">Plan your trip on translink.ca <Icon name="ext" className="inline-icon" /></a></p></div>
            <div><div className="icon-tile"><Icon name="flag" /></div><h3>By bike or walking</h3>
              <p>Bike racks near the main entrance <Tbc />. Walking routes from nearby neighbourhoods <Tbc />.</p></div>
            <div><div className="icon-tile"><Icon name="car" /></div><h3>Parking</h3>
              <p>Parking locations, rates and accessible parking <Tbc />. Lots fill up on weekend evenings, so carpool or take transit if you can.</p></div>
            <div><div className="icon-tile"><Icon name="pin" /></div><h3>Rideshare drop-off</h3>
              <p>Rideshare and taxi drop-off and pick-up zone <Tbc />.</p></div>
          </div>
          <p className="small muted mt-6 mb-0">Need step-free access or accessible parking? See <Link to="/accessibility">Accessibility</Link>.</p>
        </div>
      </section>
    </>
  );
}

/* ---------- /accessibility ---------- */
export function Accessibility() {
  return (
    <>
      <PageHero img="/assets/img/stock/crowd-lawn.jpg" crumb="Accessibility" eyebrow="Plan your visit" title="A festival for everyone."
        lead="We’re planning the site so everyone can get around comfortably. Details below will be confirmed as the site plan is finalised." />

      <section className="section">
        <div className="container narrow">
          <div className="detail-list">
            <div><div className="icon-tile"><Icon name="arch" /></div><h3>Accessible entrances</h3>
              <p>Step-free entrance locations and accessible drop-off <Tbc />.</p></div>
            <div><div className="icon-tile"><Icon name="access" /></div><h3>Washrooms</h3>
              <p>Accessible washroom locations <Tbc />. They’ll be marked on the <Link to="/map">festival map</Link>.</p></div>
            <div><div className="icon-tile"><Icon name="users" /></div><h3>Seating areas</h3>
              <p>Reserved accessible seating in the dining areas and at the stages <Tbc />.</p></div>
            <div><div className="icon-tile"><Icon name="heart" /></div><h3>Service animals</h3>
              <p>Service animals are always welcome. Pets are also welcome on a leash. <Tbc>Details</Tbc></p></div>
            <div><div className="icon-tile"><Icon name="info" /></div><h3>Quiet area</h3>
              <p>A quieter space away from the stages <Tbc>Location</Tbc>.</p></div>
            <div><div className="icon-tile"><Icon name="mail" /></div><h3>Accommodation requests</h3>
              <p>Need an accommodation? Contact us before the festival at <a href={"mailto:" + E.email}>{E.email}</a> <Tbc>Accessibility contact</Tbc>.</p></div>
          </div>
          <div className="row mt-8"><Link className="btn" to="/contact">Contact us</Link><Link className="btn btn-secondary" to="/getting-there">Getting there</Link></div>
        </div>
      </section>
    </>
  );
}
