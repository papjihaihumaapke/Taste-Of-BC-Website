import { Link } from "react-router-dom";
import { event as E, highlights } from "../data.js";
import { DatesNote, Icon, PageHero } from "../lib/ui.jsx";

export default function WhatsOn() {
  return (
    <>
      <PageHero crumb="What’s On" eyebrow={`${E.days} days · ${E.datesShort}`} title="Four days of BC flavour and fun."
        lead="Taste of BC brings local restaurants, BC wineries, musicians and artists together on one field. Entry is free. Bring friends, bring family, bring an appetite.">
        <div className="row mt-6"><DatesNote /></div>
      </PageHero>

      <section className="section">
        <div className="container grid grid-3">
          {highlights.map((h) => (
            <div className="card" key={h.title}><div className="icon-tile"><Icon name={h.icon} /></div><h3>{h.title}</h3><p className="muted mb-0">{h.text}</p></div>
          ))}
        </div>
      </section>

      <section className="section alt">
        <div className="container split">
          <div>
            <span className="eyebrow">Eat</span>
            <h2>Local restaurants in tasting-size portions.</h2>
            <p className="lead">Try a little of everything. Every booth serves a short menu priced in $1 coupons, so you can graze from BBQ to dumplings to dessert.</p>
            <Link className="btn mt-4" to="/food-and-drink">Browse food & drink</Link>
          </div>
          <div>
            <span className="eyebrow">Sip</span>
            <h2>BC wines, craft beer and cider.</h2>
            <p className="lead">The 19+ BC Wine Garden pours from wineries, breweries and cideries across the province, with guided tastings each day.</p>
            <Link className="btn btn-secondary mt-4" to="/entertainment">See tasting times</Link>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <div>
            <span className="eyebrow">Entertainment</span>
            <h2>Two stages. Four days. All free to watch.</h2>
            <p>Headline bands every evening, plus dance, comedy, youth talent and acoustic sets throughout the day.</p>
          </div>
          <nav className="icon-links" aria-label="Entertainment">
            <Link to="/entertainment"><Icon name="music" />Main Stage headliners</Link>
            <Link to="/entertainment"><Icon name="users" />Community Stage</Link>
            <Link to="/entertainment"><Icon name="flag" />Chef demos</Link>
            <Link to="/entertainment"><Icon name="sparkle" />Live art & artisan market</Link>
            <Link to="/entertainment"><Icon name="heart" />Family Zone</Link>
            <Link to="/entertainers"><Icon name="star" />Perform with us</Link>
          </nav>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Community</span>
            <h2>Not-for-profit, and for everyone.</h2>
            <p className="lead">Taste of BC is a not-for-profit community event. Free entry keeps it open to every family, and the festival gives local restaurants, artists and performers a big stage.</p>
            <Link className="link-arrow" to="/about">Our story</Link>
          </div>
          <div className="card">
            <h3>Good to know</h3>
            <ul className="ticks" style={{ margin: 0 }}>
              <li><Icon name="check" />Free entry, all ages, all four days</li>
              <li><Icon name="check" />Cashless — food and drinks use $1 coupons</li>
              <li><Icon name="check" />BC Wine Garden is 19+ with ID</li>
              <li><Icon name="check" />Shaded seating and water stations</li>
              <li><Icon name="check" />Accessible site and washrooms</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
