import { useEffect, useRef, useState } from "react";

const GREETINGS = [
  { text: "Welcome", sub: "English" },
  { text: "Bienvenue", sub: "Français" },
  { text: "Willkommen", sub: "Deutsch" },
  { text: "Bienvenido", sub: "Español" },
  { text: "欢迎", sub: "中文" },
  { text: "स्वागत छ", sub: "नेपाली" },
];

const TOTAL_DURATION = 4200;

interface WelcomeScreenProps {
  onDone: () => void;
}

export function WelcomeScreen({ onDone }: WelcomeScreenProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"show" | "hide">("show");
  const [hidden, setHidden] = useState(false);
  const barRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      setHidden(true);
      onDone();
      return;
    }

    if (barRef.current) {
      barRef.current.style.transition = `transform ${TOTAL_DURATION}ms linear`;
      requestAnimationFrame(() => {
        if (barRef.current) barRef.current.style.transform = "scaleX(1)";
      });
    }

    const stepDuration = TOTAL_DURATION / GREETINGS.length;
    let cancelled = false;

    function runStep(i: number) {
      if (cancelled) return;
      if (i >= GREETINGS.length) {
        setTimeout(() => {
          if (cancelled) return;
          setHidden(true);
          onDone();
        }, 400);
        return;
      }
      setIndex(i);
      setPhase("show");
      setTimeout(() => {
        if (cancelled) return;
        setPhase("hide");
        setTimeout(() => runStep(i + 1), 280);
      }, stepDuration - 280);
    }

    runStep(0);
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const greeting = GREETINGS[index];

  return (
    <div className={`welcome-screen${hidden ? " hidden" : ""}`} role="dialog" aria-label="Welcome">
      <div className={`welcome-text ${phase}`}>
        {greeting.text}
        <span className="lang-sub">{greeting.sub}</span>
      </div>
      <div className="welcome-bar">
        <div className="welcome-bar-inner" ref={barRef} />
      </div>
    </div>
  );
}
