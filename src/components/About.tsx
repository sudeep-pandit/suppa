import { Reveal } from "./Reveal";

export function About() {
  return (
    <section className="section container" id="about">
      <Reveal>
        <span className="section-number">01</span>
        <h2 className="section-title">
          Curious about how
          <br />
          things work.
        </h2>
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-text">
          <p>
            I'm a Computer Science student based in Nepal, drawn to the elegance of well-crafted software and the
            potential of artificial intelligence to solve meaningful problems.
          </p>
          <p>
            My work sits between traditional software development and modern AI — building web applications,
            experimenting with machine learning, and exploring how intelligent systems can be designed thoughtfully
            and responsibly.
          </p>
          <p>
            When I'm not coding, I'm usually reading, writing notes, or thinking about how technology can be made
            more useful, accessible, and human.
          </p>
        </Reveal>
        <Reveal className="about-facts" stagger>
          <div className="fact-item">
            <span className="fact-label">Focus</span>
            <span className="fact-value">AI &amp; Machine Learning</span>
          </div>
          <div className="fact-item">
            <span className="fact-label">Building</span>
            <span className="fact-value">Web &amp; Digital Products</span>
          </div>
          <div className="fact-item">
            <span className="fact-label">Exploring</span>
            <span className="fact-value">Software Engineering</span>
          </div>
          <div className="fact-item">
            <span className="fact-label">Location</span>
            <span className="fact-value">Nepal</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
