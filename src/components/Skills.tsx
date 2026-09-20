import { skillGroups } from "../data/portfolioData";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <section className="section container" id="skills">
      <Reveal>
        <span className="section-number">05</span>
        <h2 className="section-title">
          Technologies I'm
          <br />
          working with.
        </h2>
      </Reveal>
      <Reveal className="skills-grid" stagger>
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.title}>
            <h3>{group.title}</h3>
            <div className="skill-tags">
              {group.skills.map((s) => (
                <span className="tag" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
