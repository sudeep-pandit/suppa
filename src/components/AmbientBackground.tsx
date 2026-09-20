import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

type RGB = [number, number, number];

interface Palette {
  primary: RGB;
  secondary: RGB;
  tertiary: RGB;
}

const PALETTE_LIBRARY: Palette[] = [
  { primary: [86, 141, 131], secondary: [151, 185, 175], tertiary: [203, 220, 213] },
  { primary: [83, 119, 153], secondary: [139, 165, 188], tertiary: [199, 214, 225] },
  { primary: [125, 108, 150], secondary: [171, 158, 190], tertiary: [215, 210, 222] },
  { primary: [170, 139, 91], secondary: [202, 181, 142], tertiary: [225, 214, 191] },
  { primary: [60, 110, 80], secondary: [120, 160, 130], tertiary: [190, 215, 195] },
  { primary: [183, 110, 121], secondary: [214, 158, 165], tertiary: [233, 205, 208] },
];

const PALETTE_INTERVAL = 3500;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function lerp(a: RGB, b: RGB, t: number): RGB {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const palettes = shuffle(PALETTE_LIBRARY);
    let paletteIndex = 0;
    let nextPaletteIndex = 1;
    let paletteTransition = 0;
    let lastChange = performance.now();

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let mouseX = width / 2;
    let mouseY = height / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let time = 0;
    let frameId = 0;
    let visible = true;

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function currentPalette(): Palette {
      const a = palettes[paletteIndex];
      const b = palettes[nextPaletteIndex];
      return {
        primary: lerp(a.primary, b.primary, paletteTransition),
        secondary: lerp(a.secondary, b.secondary, paletteTransition),
        tertiary: lerp(a.tertiary, b.tertiary, paletteTransition),
      };
    }

    function applyAccent() {
      const p = currentPalette();
      const isDark = theme === "dark";
      const rgb: RGB = isDark
        ? [
            Math.min(255, Math.round(p.primary[0] * 1.25 + 12)),
            Math.min(255, Math.round(p.primary[1] * 1.25 + 12)),
            Math.min(255, Math.round(p.primary[2] * 1.25 + 12)),
          ]
        : p.primary;

      document.documentElement.style.setProperty("--accent", `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
      document.documentElement.style.setProperty(
        "--accent-light",
        isDark
          ? `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.15)`
          : `rgb(${p.tertiary[0]}, ${p.tertiary[1]}, ${p.tertiary[2]})`
      );
      document.documentElement.style.setProperty("--accent-rgb", `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`);
    }

    function draw() {
      currentX += (mouseX - currentX) * 0.055;
      currentY += (mouseY - currentY) * 0.055;
      const palette = currentPalette();
      const opacityMultiplier = theme === "dark" ? 1.7 : 1;
      ctx!.clearRect(0, 0, width, height);

      const fields: { x: number; y: number; r: number; speed: number; offset: number; color: keyof Palette; opacity: number }[] = [
        { x: 0.3, y: 0.35, r: 0.42, speed: 0.0003, offset: 0, color: "primary", opacity: 0.075 },
        { x: 0.7, y: 0.6, r: 0.48, speed: 0.0004, offset: 2, color: "secondary", opacity: 0.065 },
        { x: 0.5, y: 0.25, r: 0.4, speed: 0.00035, offset: 4, color: "tertiary", opacity: 0.055 },
        { x: 0.2, y: 0.7, r: 0.46, speed: 0.00045, offset: 1, color: "primary", opacity: 0.05 },
        { x: 0.8, y: 0.3, r: 0.44, speed: 0.00038, offset: 3, color: "secondary", opacity: 0.055 },
        { x: 0.55, y: 0.85, r: 0.38, speed: 0.00042, offset: 5, color: "tertiary", opacity: 0.05 },
      ];

      fields.forEach((field, i) => {
        const baseX = width * (field.x + Math.sin(time * field.speed + field.offset) * 0.12);
        const baseY = height * (field.y + Math.cos(time * field.speed * 0.8 + field.offset) * 0.1);
        const dx = (currentX - baseX) * 0.08;
        const dy = (currentY - baseY) * 0.08;
        const finalX = baseX + dx * 0.3 + Math.sin(time * 0.001 + i) * 20;
        const finalY = baseY + dy * 0.3 + Math.cos(time * 0.0012 + i) * 20;
        const radius = Math.min(width, height) * field.r * (1 + Math.sin(time * 0.0005 + i) * 0.1);
        const color = palette[field.color];
        const alpha = field.opacity * opacityMultiplier * (0.7 + Math.sin(time * 0.0008 + i) * 0.3);

        const gradient = ctx!.createRadialGradient(finalX, finalY, 0, finalX, finalY, radius);
        gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);

        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(finalX, finalY, radius, 0, Math.PI * 2);
        ctx!.fill();
      });
    }

    function loop(timestamp: number) {
      if (!visible) {
        frameId = requestAnimationFrame(loop);
        return;
      }
      time = timestamp;
      const elapsed = timestamp - lastChange;
      if (elapsed >= PALETTE_INTERVAL) {
        lastChange = timestamp;
        paletteIndex = nextPaletteIndex;
        nextPaletteIndex = (nextPaletteIndex + 1) % palettes.length;
        paletteTransition = 0;
      } else {
        paletteTransition = Math.min(1, elapsed / (PALETTE_INTERVAL * 0.4));
      }
      applyAccent();
      draw();
      frameId = requestAnimationFrame(loop);
    }

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
    function handleMouseLeave() {
      mouseX = width / 2;
      mouseY = height / 2;
    }
    function handleVisibility() {
      visible = !document.hidden;
    }
    function handleResize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      resize();
    }

    resize();
    applyAccent();
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    if (!isTouch && !prefersReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }

    if (!prefersReducedMotion) {
      frameId = requestAnimationFrame(loop);
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [theme]);

  return <canvas id="ambientCanvas" ref={canvasRef} aria-hidden="true" />;
}
