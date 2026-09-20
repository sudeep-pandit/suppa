import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const CONFIG = {
  trailCount: 20,
  nodesPerLine: 50,
  baseSpring: 0.4,
  friction: 0.5,
  dampening: 0.25,
  tension: 0.98,
  hueAmplitude: 70,
  hueFrequency: 0.0015,
  hueOffset: 285,
  strokeAlpha: 0.22,
  lineWidth: 1.2,
};

interface WavyNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

class WavyLine {
  spring: number;
  friction: number;
  nodes: WavyNode[];

  constructor(springBase: number, startX: number, startY: number) {
    this.spring = springBase + (0.1 * Math.random() - 0.02);
    this.friction = CONFIG.friction + (0.01 * Math.random() - 0.002);
    this.nodes = [];
    for (let i = 0; i < CONFIG.nodesPerLine; i++) {
      this.nodes.push({ x: startX, y: startY, vx: 0, vy: 0 });
    }
  }

  update(pointerX: number, pointerY: number) {
    let spring = this.spring;
    let node = this.nodes[0];

    node.vx += (pointerX - node.x) * spring;
    node.vy += (pointerY - node.y) * spring;

    for (let i = 0, len = this.nodes.length; i < len; i++) {
      node = this.nodes[i];

      if (i > 0) {
        const prev = this.nodes[i - 1];
        node.vx += (prev.x - node.x) * spring;
        node.vy += (prev.y - node.y) * spring;
        node.vx += prev.vx * CONFIG.dampening;
        node.vy += prev.vy * CONFIG.dampening;
      }

      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;

      spring *= CONFIG.tension;
    }
  }

  draw(ctx: CanvasRenderingContext2D, hue: number, alpha: number) {
    if (this.nodes.length < 3) return;
    const nodes = this.nodes;

    ctx.beginPath();
    ctx.moveTo(nodes[0].x, nodes[0].y);

    for (let i = 1; i < nodes.length - 2; i++) {
      const cur = nodes[i];
      const next = nodes[i + 1];
      const midX = 0.5 * (cur.x + next.x);
      const midY = 0.5 * (cur.y + next.y);
      ctx.quadraticCurveTo(cur.x, cur.y, midX, midY);
    }

    if (nodes.length > 2) {
      const i = nodes.length - 2;
      const cur = nodes[i];
      const next = nodes[i + 1];
      ctx.quadraticCurveTo(cur.x, cur.y, next.x, next.y);
    }

    ctx.strokeStyle = `hsla(${hue}, 50%, 55%, ${alpha})`;
    ctx.lineWidth = CONFIG.lineWidth;
    ctx.stroke();
    ctx.closePath();
  }
}

export function WavyCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let pointerX = width / 2;
    let pointerY = height / 2;
    let oscPhase = Math.random() * Math.PI * 2;
    let lines: WavyLine[] = [];
    let rafId = 0;
    let running = true;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initLines() {
      lines = [];
      for (let i = 0; i < CONFIG.trailCount; i++) {
        const springBase = 0.4 + (i / CONFIG.trailCount) * 0.025;
        lines.push(new WavyLine(springBase, pointerX, pointerY));
      }
    }

    function render() {
      if (!running) return;

      ctx!.globalCompositeOperation = "source-over";
      ctx!.clearRect(0, 0, width, height);
      ctx!.globalCompositeOperation = "lighter";

      oscPhase += CONFIG.hueFrequency;
      const hue = Math.round(CONFIG.hueOffset + Math.sin(oscPhase) * CONFIG.hueAmplitude);
      const isDark = themeRef.current === "dark";
      const alpha = isDark ? CONFIG.strokeAlpha * 1.8 : CONFIG.strokeAlpha;

      for (const line of lines) {
        line.update(pointerX, pointerY);
        line.draw(ctx!, hue, alpha);
      }

      rafId = requestAnimationFrame(render);
    }

    function handlePointer(e: MouseEvent | TouchEvent) {
      if ("clientX" in e) {
        pointerX = e.clientX;
        pointerY = e.clientY;
      } else if (e.touches && e.touches.length > 0) {
        pointerX = e.touches[0].clientX;
        pointerY = e.touches[0].clientY;
      }
    }

    function handleVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!running) {
        running = true;
        initLines();
        render();
      }
    }

    function handleResize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      resize();
      initLines();
    }

    resize();
    pointerX = width / 2;
    pointerY = height / 2;
    initLines();

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handlePointer, { passive: true });
    window.addEventListener("touchmove", handlePointer, { passive: true });
    window.addEventListener("touchstart", handlePointer, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    render();

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointer);
      window.removeEventListener("touchmove", handlePointer);
      window.removeEventListener("touchstart", handlePointer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return <canvas id="wavyCursorCanvas" ref={canvasRef} aria-hidden="true" />;
}
