import { writings } from "../data/portfolioData";
import { Reveal } from "./Reveal";

export function Writing() {
  return (
    <section className="section container" id="writing">
      <Reveal>
        <span className="section-number">06</span>
        <h2 className="section-title">
          Notes from
          <br />
          the journey.
        </h2>
      </Reveal>
      <div className="writing-list">
        {writings.map((w) => (
          <Reveal as="a" href={w.link} className="writing-item" key={w.title}>
            <div className="writing-meta">
              <div className="writing-category">{w.category}</div>
              <div>{w.date}</div>
            </div>
            <div className="writing-content">
              <h3>{w.title}</h3>
              <p>{w.excerpt}</p>
            </div>
            <div className="writing-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <a href="#" className="btn btn-outline">
          View all writing
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </Reveal>
    </section>
  );
}
