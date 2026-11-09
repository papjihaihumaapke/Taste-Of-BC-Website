import { Link } from "react-router-dom";
import { FAQ } from "../lib/faq.jsx";
import { Icon, PageHero } from "../lib/ui.jsx";

export const FaqList = ({ items }) => (
  <div className="accordion">
    {items.map(({ q, a }, n) => (
      <details key={q} open={n === 0}><summary><span>{q}</span><span className="pm"><Icon name="plus" /></span></summary><div className="a-body"><p>{a}</p></div></details>
    ))}
  </div>
);

export default function Faq() {
  return (
    <>
      <PageHero img="/assets/img/stock/crowd-lawn.jpg" crumb="FAQ" eyebrow="FAQ" title="Frequently asked questions."
        lead="Admission, coupons, pets, hours and more. Can’t find your answer? We’re happy to help." />
      <section className="section">
        <div className="container faq-layout">
          <div className="section-head">
            <span className="eyebrow">Still have questions?</span>
            <h2>Get in touch.</h2>
            <p>General questions, media requests or accessibility needs — we’re happy to help.</p>
            <Link className="btn btn-secondary" to="/contact">Contact us</Link>
          </div>
          <FaqList items={FAQ} />
        </div>
      </section>
    </>
  );
}
