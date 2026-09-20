import { experiences } from "../data/portfolioData";
import { Reveal } from "./Reveal";
import { Timeline } from "./Timeline";

export function Experience() {
  return (
    <section className="section container" id="experience">
      <Reveal>
        <span className="section-number">03</span>
        <h2 className="section-title">
          Where I've
          <br />
          contributed.
        </h2>
      </Reveal>
      <Timeline entries={experiences} />
    </section>
  );
}
