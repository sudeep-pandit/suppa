import { useTypewriter } from "../hooks/useTypewriter";
import { Reveal } from "./Reveal";

export function Hero() {
  const { text, isDone } = useTypewriter("Hello, I'm", {
    startDelay: 350,
    typingSpeed: 95,
    blinkAfter: false,
  });

  return (
    <section className="hero container" id="home">
      <div className="hero-content">
        <p className={`typing-greeting${isDone ? " done" : ""}`} id="typingGreeting" aria-label="Hello, I'm">
          <span className="typed-text" id="typedText">
            {text}
          </span>
        </p>
        <h1 className="hero-title-anim" data-animate="chars">
          Sudeep Pandit
        </h1>
        <p className="hero-tagline word-anim" data-animate="words">
          Building at the intersection
          <br />
          of software &amp; intelligence.
        </p>
        <Reveal as="p" className="hero-description">
          I'm a Computer Science student and developer exploring Artificial Intelligence, Machine Learning, software
          development and thoughtful digital products.
        </Reveal>
        <Reveal className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            View my work
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </a>
          <a href="#contact" className="btn btn-outline">
            Let's connect
          </a>
        </Reveal>
        <Reveal className="hero-meta">
          <div className="hero-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="12" cy="10" r="3" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 6.9 8 11.7z" />
            </svg>
            Based in Nepal
          </div>
          <div className="hero-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 7L2 7" />
            </svg>
            CS Student &amp; Developer
          </div>
        </Reveal>
        <Reveal className="hero-scroll">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
          Scroll to explore
        </Reveal>
      </div>
    </section>
  );
}
