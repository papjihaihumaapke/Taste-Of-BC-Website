import { Link } from "react-router-dom";
import { schedule } from "../data.js";
import { DatesNote, Icon, PageHero, Tbc } from "../lib/ui.jsx";
import { Gallery, ScheduleList, Tabs } from "../components/Festival.jsx";

const STAGES = [
  { icon: "music", title: "Main Stage", text: "Evening headliners, local bands and the opening and closing celebrations." },
  { icon: "users", title: "Community Stage", text: "Cultural dance, comedy, acoustic sets and youth talent all afternoon." },
  { icon: "wine", title: "BC Wine Garden", text: "Guided tastings and food-and-wine pairings with local winemakers. 19+." },
  { icon: "flag", title: "Demo Kitchen", text: "Local chefs cooking live, with samples for the front rows." },
  { icon: "sparkle", title: "Artisan Market", text: "BC painters, makers and live art around the field." },
  { icon: "heart", title: "Family Zone", text: "Face painting, games and kids’ cooking classes." }
];

export default function Entertainment() {
  return (
    <>
      <PageHero img="/assets/img/stock/concert.jpg" crumb="Entertainment" eyebrow="Music · dance · comedy · art" title="Entertainment all four days."
        lead="Two stages, live art, chef demos and family fun from gates open until close. All performances are free to watch.">
        <div className="row mt-6"><Link className="btn" to="/perform">Perform at Taste of BC</Link><DatesNote /></div>
      </PageHero>

      <section className="section">
        <div className="container grid grid-3">
          {STAGES.map((s) => (
            <div className="card" key={s.title}><div className="icon-tile"><Icon name={s.icon} /></div><h3>{s.title}</h3><p className="muted mb-0">{s.text}</p></div>
          ))}
        </div>
      </section>

      <section className="section tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <Gallery items={[
            { img: "/assets/img/stock/concert.jpg", alt: "Crowd at a live concert", label: "Main Stage nights" },
            { img: "/assets/img/stock/festival-crowd.jpg", alt: "Friends at an outdoor music festival", label: "Afternoon sets" },
            { img: "/assets/img/stock/wine-tasting.jpg", alt: "Wine glasses at a tasting bar", label: "Guided wine tastings" },
            { img: "/assets/img/stock/stage-lights.jpg", alt: "Band on an illuminated stage", label: "Local bands" },
            { img: "/assets/img/stock/skewers.jpg", alt: "Skewers on a grill", label: "Chef demos" }
          ]} />
        </div>
      </section>

      <section className="section white" id="schedule">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Schedule</span><h2>What’s on, when.</h2>
            <p className="lead mb-0">Sample programme. Performers are announced in the months before the festival, and the final schedule is printed in the info booklet.</p>
          </div>
          <div className="callout neutral mb-6"><Icon name="megaphone" /><div><strong>Lineup announced soon</strong>
            <p>Acts, stages and times below are placeholders <Tbc />. Join the newsletter to hear the lineup first.</p></div></div>
          <Tabs label="Festival day" tabs={Object.entries(schedule).map(([day, rows]) => ({ id: day.toLowerCase(), label: day, content: <ScheduleList rows={rows} /> }))} />
        </div>
      </section>

      {/* Optional: Taste of Comedy — TBC whether this runs */}
      <section className="section alt" id="comedy">
        <div className="container split-photo">
          <div>
            <span className="eyebrow">Taste of Comedy <Tbc /></span>
            <h2>A night of local stand-up.</h2>
            <p className="lead">An evening comedy show featuring BC comedians. Date, time, stage and lineup <Tbc />.</p>
            <Link className="btn btn-secondary" to="/perform">Apply to perform</Link>
          </div>
          <img src="/assets/img/stock/stage-lights.jpg" alt="Performers on an illuminated stage at night" loading="lazy" decoding="async" width="1024" height="680" />
        </div>
      </section>
    </>
  );
}
