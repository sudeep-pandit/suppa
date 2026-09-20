import type { TimelineEntry } from "../data/portfolioData";
import { Reveal } from "./Reveal";

interface TimelineProps {
  entries: TimelineEntry[];
}

export function Timeline({ entries }: TimelineProps) {
  return (
    <div className="timeline">
      {entries.map((e) => (
        <Reveal as="div" className="timeline-item" key={e.title}>
          <div className="timeline-dot" />
          <div className="timeline-header">
            <div className="timeline-logo">{e.initials}</div>
            <div>
              <div className="timeline-title">
                <a href={e.website} target="_blank" rel="noopener noreferrer">
                  {e.title}
                </a>
              </div>
              <div className="timeline-role">{e.subtitle}</div>
            </div>
          </div>
          <div className="timeline-meta">
            <span>{e.date}</span>
          </div>
          <div className="timeline-content">
            <p>{e.description}</p>
            <a href={e.website} className="timeline-visit" target="_blank" rel="noopener noreferrer">
              Visit website
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </a>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
