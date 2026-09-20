import { useEffect, useState } from "react";

interface UseTypewriterOptions {
  /** ms delay before typing starts */
  startDelay?: number;
  /** ms between each character */
  typingSpeed?: number;
  /** whether the cursor should keep blinking once typing finishes */
  blinkAfter?: boolean;
}

interface UseTypewriterResult {
  text: string;
  isDone: boolean;
  showCursor: boolean;
}

/**
 * Types out `fullText` one character at a time and reports back the
 * in-progress string plus a blinking-cursor flag, respecting
 * prefers-reduced-motion by rendering the full text immediately.
 */
export function useTypewriter(fullText: string, options: UseTypewriterOptions = {}): UseTypewriterResult {
  const { startDelay = 200, typingSpeed = 55, blinkAfter = true } = options;
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [text, setText] = useState(prefersReducedMotion ? fullText : "");
  const [isDone, setIsDone] = useState(prefersReducedMotion);
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let charIndex = 0;
    let typingTimer: ReturnType<typeof setInterval>;

    const startTimer = setTimeout(() => {
      typingTimer = setInterval(() => {
        charIndex += 1;
        setText(fullText.slice(0, charIndex));
        if (charIndex >= fullText.length) {
          clearInterval(typingTimer);
          setIsDone(true);
        }
      }, typingSpeed);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearInterval(typingTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullText, startDelay, typingSpeed]);

  useEffect(() => {
    if (!blinkAfter) return;
    const blink = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(blink);
  }, [blinkAfter]);

  return { text, isDone, showCursor: cursorOn };
}
