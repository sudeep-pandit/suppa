import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  stagger?: boolean;
  [key: string]: unknown;
}

export function Reveal({ children, className = "", as = "div", stagger = false, ...rest }: RevealProps) {
  const { ref, visible } = useReveal<HTMLElement>();
  const Tag = as as string;
  const classes = [
    stagger ? "reveal-stagger" : "reveal",
    visible ? "visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    // @ts-expect-error dynamic tag with shared ref type
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  );
}
