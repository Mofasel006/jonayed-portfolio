/*
 * BLUEPRINT ATELIER — scroll reveal primitives
 * fade-up, mask-reveal (clip-path on headings), stagger wrappers.
 * Structural ease-out motion, 600ms primary / 80ms staggers.
 */
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 36,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Mask reveal: text slides up from behind a clipping edge */
export function MaskReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial={reduced ? false : { y: "105%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, delay, ease: EASE }}
      >
        {children as ReactNode}
      </motion.span>
    </span>
  );
}

/** Letter-by-letter stagger for display headlines */
interface LetterStaggerProps {
  text: string;
  delay?: number;
  className?: string;
  highlight?: (i: number, ch: string) => boolean;
}

export function LetterStagger({ text, delay = 0, className = "", highlight }: LetterStaggerProps) {
  const reduced = useReducedMotion();
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={highlight?.(i, ch) ? { color: "var(--gold-bright)" } : undefined}
          initial={reduced ? false : { opacity: 0, y: 40, rotateX: -40 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: delay + i * 0.028, ease: EASE }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

export function StaggerContainer({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.div>
  );
}
