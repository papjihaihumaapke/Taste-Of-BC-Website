import { Link } from "react-router-dom";
import { schedule } from "../data.js";
import { DatesNote, Icon, PageHero } from "../lib/ui.jsx";
import { ScheduleList, Tabs } from "../components/Festival.jsx";

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
      <PageHero crumb="Entertainment" eyebrow="Music · dance · comedy · art" title="Entertainment all four days."
        lead="Two stages, live art, chef demos and family fun from gates open until close. All performances are free to watch.">
        <div className="row mt-6"><Link className="btn" to="/entertainers">Perform at Taste of BC</Link><DatesNote /></div>
      </PageHero>

      <section className="section">
        <div className="container grid grid-3">
          {STAGES.map((s) => (
            <div className="card" key={s.title}><div className="icon-tile"><Icon name={s.icon} /></div><h3>{s.title}</h3><p className="muted mb-0">{s.text}</p></div>
          ))}
        </div>
      </section>

      <section className="section white" id="schedule">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Schedule</span><h2>What’s on, when.</h2>
            <p className="lead mb-0">Sample programme. Performers are announced in the months before the festival, and the final schedule is printed in the info booklet.</p>
          </div>
          <Tabs label="Festival day" tabs={Object.entries(schedule).map(([day, rows]) => ({ id: day.toLowerCase(), label: day, content: <ScheduleList rows={rows} /> }))} />
        </div>
      </section>

      <section className="section tight">
        <div className="container"><div className="cta-band">
          <div><h2>Musician, dancer, comedian or artist?</h2><p>We’re booking local talent for all four days. Apply to perform, or sign in to manage your booking.</p></div>
          <div className="actions"><Link className="btn btn-light btn-lg" to="/entertainers">Apply or sign in</Link></div>
        </div></div>
      </section>
    </>
  );
}
