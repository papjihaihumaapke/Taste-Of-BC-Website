import { Link } from "react-router-dom";
import { event as E, highlights } from "../data.js";
import { DatesNote, Icon, PageHero } from "../lib/ui.jsx";
import { PhotoCards } from "./Home.jsx";

export default function WhatsOn() {
  return (
    <>
      <PageHero img="/assets/img/stock/festival-crowd.jpg" crumb="What’s On" eyebrow={`${E.days} days · ${E.datesShort}`} title="Four days of BC flavour and fun."
        lead="Taste of BC brings local restaurants, BC wineries, musicians and artists together on one field. Entry is free. Bring friends, bring family, bring an appetite.">
        <div className="row mt-6"><DatesNote /></div>
      </PageHero>

      <section className="section">
        <div className="container">
          <PhotoCards items={highlights} />
        </div>
      </section>

      <section className="section alt">
        <div className="container split">
          <div>
            <img className="split-img mb-6" src="/assets/img/stock/grilled-salmon.jpg" alt="Grilled salmon with vegetables" loading="lazy" />
            <span className="eyebrow">Eat</span>
            <h2>Local restaurants in tasting-size portions.</h2>
            <p className="lead">Try a little of everything. Every booth serves a short menu priced in $1 coupons, so you can graze from BBQ to dumplings to dessert.</p>
            <Link className="btn mt-4" to="/menu">Browse the menu</Link>
          </div>
          <div>
            <img className="split-img mb-6" src="/assets/img/stock/wine-cheese.jpg" alt="Red wine with cheese and charcuterie" loading="lazy" />
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
            <Link to="/entertainment"><Icon name="sparkle" />Live art</Link>
            <Link to="/entertainment"><Icon name="heart" />Family Zone</Link>
            <Link to="/perform"><Icon name="star" />Perform with us</Link>
          </nav>
        </div>
      </section>

    </>
  );
}
