import { event as E, gallery } from "../data.js";
import { Icon, OrTbc, PageHero, Tbc } from "../lib/ui.jsx";

const LOGOS = [
  ["/assets/img/logo-red.png", "Primary logo — red", "PNG · for light backgrounds", "#fff"],
  ["/assets/img/logo-white.png", "Primary logo — white", "PNG · for dark or photo backgrounds", "var(--ink)"],
  ["/assets/img/logo-ink.png", "Primary logo — black", "PNG · single colour", "#fff"],
  ["/assets/img/wordmark-red.png", "Wordmark — red", "PNG · horizontal", "#fff"]
];

export default function Media() {
  return (
    <>
      <PageHero img="/assets/img/stock/festival-crowd.jpg" crumb="Media" eyebrow="Press & media" title="Media resources."
        lead="Logos, festival photos and press contacts for journalists, creators and partners covering Taste of BC." />

      <section className="section">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Brand assets</span><h2>Logos.</h2>
            <p className="lead">Please don’t recolour, stretch or add effects to the logo.</p></div>
          <div className="grid grid-4">
            {LOGOS.map(([src, t, sub, bg]) => (
              <div className="info-card" key={src}>
                <div style={{ background: bg, border: "1px solid var(--line)", borderRadius: "var(--r-md)", aspectRatio: "16 / 10", display: "grid", placeItems: "center", padding: 20, marginBottom: 8 }}>
                  <img src={src} alt={t} loading="lazy" style={{ maxHeight: "100%", width: "auto" }} />
                </div>
                <h3 style={{ fontSize: "1.0625rem" }}>{t}</h3><p>{sub}</p>
                <span className="spacer" />
                <a className="btn btn-secondary btn-sm" href={src} download><Icon name="download" />Download</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Photos <Tbc>Festival photos</Tbc></span><h2>Festival photography.</h2>
            <p className="lead">Placeholder images until official festival photography is available. Click any photo to download.</p></div>
          <div className="gallery">
            {gallery.map((g) => (
              <figure key={g.img}><a href={g.img} download aria-label={`Download photo: ${g.alt}`}><img src={g.img} alt={g.alt} loading="lazy" /></a><figcaption>{g.label}</figcaption></figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Press contact</span>
            <h2>Talk to our team.</h2>
            <p className="lead">Interview requests, media accreditation and photo or filming permission at the festival.</p>
          </div>
          <ul className="contact-list">
            <li><Icon name="users" /><div><strong>Media contact</strong><Tbc>Name</Tbc></div></li>
            <li><Icon name="mail" /><div><strong>Email</strong><a href={"mailto:" + E.email}>{E.email}</a> <Tbc>Press email</Tbc></div></li>
            <li><Icon name="phone" /><div><strong>Phone</strong><OrTbc value={E.phone} label="Phone" /></div></li>
          </ul>
        </div>
      </section>
    </>
  );
}
