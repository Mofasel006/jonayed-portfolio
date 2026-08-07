/*
 * BLUEPRINT ATELIER — Magnetic button
 * Pulls toward the cursor within a 60px radius, settles with ease-out.
 * Gold hairline border + glow sweep on hover.
 */
import { useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  ariaLabel?: string;
};

export default function MagneticButton({ children, className = "", onClick, href, ariaLabel }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.sqrt(dx * dx + dy * dy);
    const pull = Math.max(0, 1 - dist / 140); // within ~140px
    x.set(dx * pull * 0.28);
    y.set(dy * pull * 0.28);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovering(false);
  };

  const Component = href ? "a" : "button";
  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block" }}
    >
      <motion.a
        ref={ref}
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        style={{ x, y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.8 }}
        className={`magnetic-btn ${className}`}
        {...(href ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        <span className="inline-block transition-transform duration-200" style={{ transform: hovering ? "translateX(3px)" : "none" }}>
          {children}
        </span>
      </motion.a>
    </motion.div>
  );
}
