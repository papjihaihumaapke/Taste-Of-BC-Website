import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageHero, Tbc } from "../lib/ui.jsx";
import { event as E } from "../data.js";

const SECTIONS = [["privacy", "Privacy policy"], ["terms", "Terms of use"], ["refunds", "Refund policy"], ["vendor-terms", "Vendor terms"]];

export function Legal() {
  const [active, setActive] = useState("privacy");
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-30% 0px -60% 0px" });
    SECTIONS.forEach(([id]) => io.observe(document.getElementById(id)));
    return () => io.disconnect();
  }, []);
  return (
    <>
      <PageHero img="/assets/img/stock/crowd-lawn.jpg" crumb="Legal" eyebrow="Legal" title="Privacy, terms & policies" lead="Template content — to be reviewed by legal counsel before launch. Last updated: [Date]." />
      <section className="section">
        <div className="container legal-layout">
          <nav className="legal-nav" aria-label="Legal sections">
            {SECTIONS.map(([id, l]) => <a key={id} href={"#" + id} className={active === id ? "active" : undefined}>{l}</a>)}
          </nav>
          <div className="prose">
            <h2 id="privacy" style={{ marginTop: 0 }}>Privacy policy</h2>
            <p>Taste of BC (“we”, “us”) respects your privacy. This policy explains what personal information we collect, why, and how we protect it, in line with British Columbia’s Personal Information Protection Act (PIPA).</p>
            <h3>Information we collect</h3>
            <ul><li>Contact details you provide (name, email, phone) via forms, applications or purchases.</li><li>Order details for coupon sheets and merchandise.</li><li>Basic, anonymised website analytics.</li></ul>
            <h3>Payments</h3>
            <p>Payments are processed by Stripe. We never see or store your full card number.</p>
            <h3>How we use information</h3>
            <ul><li>To fulfil orders and send receipts and pickup codes.</li><li>To respond to enquiries and vendor, entertainer and volunteer applications.</li><li>To send newsletters, only if you subscribe. You can unsubscribe at any time.</li></ul>
            <h3>Contact</h3>
            <p>Privacy questions: <a href={"mailto:" + E.email}>{E.email}</a>.</p>

            <h2 id="terms">Terms of use</h2>
            <p>By using this website or attending the festival, you agree to these terms.</p>
            <ul><li>Entry is free and subject to capacity and site rules.</li><li>The BC Wine Garden is restricted to guests 19+ with valid government ID.</li><li>Dates, lineup, schedule and layout may change without notice.</li><li>Photography and filming may take place on site for promotional use.</li></ul>

            <h2 id="refunds">Refund policy</h2>
            <h3>Coupon sheets</h3>
            <ul><li>Unused coupon sheets bought online may be refunded up to [X] days before the festival.</li><li>Coupons are valid on all four festival days and have no cash value.</li><li>Torn, lost or stolen coupons cannot be replaced or refunded.</li><li>If the festival is cancelled, all online coupon orders are refunded in full.</li></ul>
            <h3>Merchandise</h3>
            <p>Unworn merchandise in original condition may be exchanged at the Info Booth during the festival, or returned within [X] days by contacting <a href={"mailto:" + E.email}>{E.email}</a>.</p>

            {/* TBC: full vendor terms & conditions to be supplied by the festival team / legal counsel */}
            <h2 id="vendor-terms">Vendor terms & conditions <Tbc /></h2>
            <p>The full vendor terms will be published here before applications close. They will cover:</p>
            <ul><li>Booth fees, payment schedule and cancellations <Tbc /></li><li>Coupon redemption and payout after the festival</li><li>Food safety, permits and special event liquor licensing</li><li>Power, equipment and booth setup requirements <Tbc /></li><li>Insurance requirements <Tbc /></li></ul>
            <p>Questions? Contact the vendor team via <Link to="/vendors#questions">Vendor Opportunities</Link>.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export function NotFound() {
  return (
    <PageHero img="/assets/img/stock/skewers.jpg" eyebrow="404" title="This page wandered off to the food booths." lead="The page you’re looking for doesn’t exist or has moved.">
      <div className="row mt-6"><Link className="btn" to="/">Back to home</Link><Link className="btn btn-secondary" to="/whats-on">See what’s on</Link></div>
    </PageHero>
  );
}
