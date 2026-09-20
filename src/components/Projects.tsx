import { projects } from "../data/portfolioData";
import { Reveal } from "./Reveal";

export function Projects() {
  return (
    <section className="section container" id="projects">
      <Reveal>
        <span className="section-number">02</span>
        <h2 className="section-title">
          Things I've
          <br />
          been building.
        </h2>
      </Reveal>
      <div className="projects-grid">
        {projects.map((p) => (
          <Reveal as="article" className="project-card" key={p.number}>
            <div className="project-top">
              <span className="project-number">{p.number}</span>
              <span className="project-category">{p.category}</span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="project-tags">
              {p.tags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
            <div className="project-actions">
              <a
                href={p.demo}
                className="project-link demo"
                aria-label={`Live demo of ${p.title}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
                </svg>
                Demo
              </a>
              <a
                href={p.link}
                className="project-link"
                aria-label={`View ${p.title} project`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View project
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H8M17 7v9" />
                </svg>
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
