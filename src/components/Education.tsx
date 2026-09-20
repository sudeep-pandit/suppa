import { education } from "../data/portfolioData";
import { Reveal } from "./Reveal";
import { Timeline } from "./Timeline";

export function Education() {
  return (
    <section className="section container" id="education">
      <Reveal>
        <span className="section-number">04</span>
        <h2 className="section-title">
          Learning never
          <br />
          really stops.
        </h2>
      </Reveal>
      <Timeline entries={education} />
    </section>
  );
}
