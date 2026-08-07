/*
 * BLUEPRINT ATELIER — cinematic interstitial strips
 * Full-width editorial pauses: oversized numerals, dimension measurement
 * graphics, structural measurement marks. Breaks the dense HUD rhythm.
 */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/Reveal";

export function MeasureStrip({
  label,
  numeral,
  sub,
}: {
  label: string;
  numeral: string;
  sub: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className="relative py-24 md:py-32 overflow-hidden border-y border-white/5 bg-[#0a0a0c]">
      {/* measurement ticks along the top */}
      <div className="absolute top-0 inset-x-0 h-8 opacity-40">
        <svg width="100%" height="32" preserveAspectRatio="none" className="w-full h-full">
          <line x1="0" y1="31" x2="100%" y2="31" stroke="#d4af37" strokeWidth="1" opacity="0.5" />
          {Array.from({ length: 40 }).map((_, i) => (
            <line key={i} x1={`${(i * 100) / 39}%`} y1={i % 5 === 0 ? 12 : 22} x2={`${(i * 100) / 39}%`} y2="31" stroke="#d4af37" strokeWidth="1" opacity="0.5" />
          ))}
        </svg>
      </div>

      <div className="container relative">
        <motion.p style={{ x }} className="hud-label mb-3">
          {label}
        </motion.p>
        <Reveal>
          <h2 className="display text-[clamp(5rem,17vw,15rem)] leading-none" style={{ color: "transparent", WebkitTextStroke: "1px rgba(212,175,55,0.55)" }}>
            {numeral}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-md text-[#8a8a93] text-[0.95rem] leading-relaxed">{sub}</p>
        </Reveal>

        {/* right-side coordinate annotations */}
        <div className="absolute top-8 right-6 hidden lg:block hud-label text-right opacity-50">
          ELEV. +0.000
          <br />
          SCALE 1:200
        </div>
      </div>
    </div>
  );
}
