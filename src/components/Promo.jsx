import { Link } from "react-router-dom";
import { Icon } from "../lib/ui.jsx";

/* Restaurant recruitment target — shown as a goal, not a confirmed count */
export const RESTAURANT_GOAL = "100+";

export const PROMO_BENEFITS = [
  ["megaphone", "Promote your restaurant", "Four days in front of hungry festival crowds. Free admission brings everyone through the gates."],
  ["heart", "Win new regulars", "Sample-size dishes let guests taste your best food, then come find you after the festival."],
  ["star", "Featured online", "Your restaurant on our Menu page and festival social media."],
  ["ticket", "Simple payment", "Guests pay in $1 coupons. Hand them in each night and we pay you out after the festival."]
];

const JOIN = [
  { to: "/vendors#apply", icon: "utensils", title: "Restaurants & food trucks", text: "Serve your signature dishes" },
  { to: "/vendors#apply-beverage", icon: "wine", title: "Wineries, breweries & distilleries", text: "Pour in the BC Wine Garden" },
  { to: "/perform", icon: "music", title: "Entertainers", text: "Singers, dancers, musicians & more" }
];

/* Home-page promotion block aimed at restaurants, beverage makers and entertainers */
export function RestaurantPromo() {
  return (
    <section className="section promo" aria-labelledby="promo-title">
      <div className="container promo-grid">
        <div className="promo-photos" aria-hidden="true">
          <img className="p1" src="/assets/img/stock/grilled-salmon.jpg" alt="" loading="lazy" decoding="async" />
          <img className="p2" src="/assets/img/stock/skewers.jpg" alt="" loading="lazy" decoding="async" />
          <img className="p3" src="/assets/img/stock/donut.jpg" alt="" loading="lazy" decoding="async" />
          <div className="promo-stat"><strong>{RESTAURANT_GOAL}</strong><span>restaurants<br />we’re inviting</span></div>
        </div>
        <div>
          <span className="eyebrow">Calling all BC restaurants</span>
          <h2 id="promo-title">Come join us. Show off your best food.</h2>
          <p className="lead">Taste of BC is a promotion for BC’s restaurants, wineries, brewers, distillers and beverage makers. We’re inviting {RESTAURANT_GOAL} restaurants to serve their signature dishes, all in one place.</p>
          <ul className="promo-benefits">
            {PROMO_BENEFITS.map(([icon, t, d]) => <li key={t}><span className="icon-tile"><Icon name={icon} /></span><div><strong>{t}</strong><span>{d}</span></div></li>)}
          </ul>
          <div className="promo-join">
            {JOIN.map((j) => (
              <Link className="join-link" to={j.to} key={j.title}>
                <span className="icon-tile solid"><Icon name={j.icon} /></span>
                <span><strong>{j.title}</strong><small>{j.text}</small></span>
                <Icon name="arrow" className="go" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
