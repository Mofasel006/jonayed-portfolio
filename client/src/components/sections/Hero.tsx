/*
 * BLUEPRINT ATELIER — Hero (SEC.00)
 * Full-bleed 3D canvas (procedural suspension bridge) with mouse parallax.
 * Left-biased letter-by-letter reveal headline, HUD telemetry chips.
 */

import { motion } from "framer-motion";
import { MapPin, ArrowDown } from "lucide-react";
import StructureScene from "@/components/three/StructureScene";
import MagneticButton from "@/components/MagneticButton";
import { LetterStagger, Reveal } from "@/components/Reveal";
import { PROFILE } from "@/lib/data";

function HeroStats() {
  const stats = [
    { label: "Status", value: PROFILE.status },
    { label: "Region", value: "Dhaka, Bangladesh" },
    { label: "Specialization", value: "Sustainable Infrastructure" },
  ];
  return (
    <div className="mt-10 flex flex-wrap gap-3">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 + i * 0.12, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="hud-chip"
        >
          {s.label}: <span className="text-foreground">{s.value}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden blueprint-grid">
      {/* 3D canvas */}
      <div className="absolute inset-0">
        <StructureScene />
        {/* gradient to guarantee text contrast on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c]/90 via-[#0a0a0c]/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0c] to-transparent" />
      </div>

      {/* HUD annotation overlay on the structure */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-[30%] right-[22%] hud-label !text-[#22d3ee]/80 text-right">
          SPAN 8.50 M · RISE 2.20 M
          <br />
          CABLE SAG f/L = 1/9.5
        </div>
        <div className="absolute bottom-[26%] right-[14%] w-24 h-px bg-[#d4af37]/60" />
        <div className="absolute bottom-[26%] right-[14%] w-px h-6 bg-[#d4af37]/60" />
        <div className="absolute bottom-[26%] left-[14%] w-px h-6 bg-[#22d3ee]/60 translate-x-[-1px]" />
        <div className="absolute top-[58%] right-[30%] hud-label opacity-70">
          NODE A — ANCHORAGE <br /> T = 142 kN
        </div>
        <div className="absolute top-[46%] right-[46%] w-3 h-3 border border-[#22d3ee]/70 rotate-45" />
      </div>

      {/* left-edge ruler */}
      <div className="absolute left-3 top-0 bottom-0 hidden xl:flex flex-col justify-between py-40 z-10">
        <span className="hud-label writing-vertical !text-[#8a8a93]/70" style={{ writingMode: "vertical-rl" }}>
          SECTION INDEX 00 → 06
        </span>
        <div className="flex flex-col items-center gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className={`h-px bg-[#d4af37]/50 ${i % 4 === 0 ? "w-6" : "w-3"}`} />
          ))}
        </div>
      </div>

      {/* corner drafting ticks */}
      <div className="absolute top-20 left-6 hidden md:block hud-label opacity-60">
        LAT 23.9322°N / LNG 90.7181°E
      </div>
      <div className="absolute top-20 right-6 hidden md:block hud-label opacity-60 text-right">
        DRAWING NO. JAH-II-001 <br /> REV. 2026
      </div>

      {/* content */}
      <div className="relative z-10 container min-h-screen flex flex-col justify-center pt-16">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hud-label mb-5 flex items-center gap-2"
          >
            <span className="inline-block w-8 h-px bg-[#d4af37]" />
            SEC. 00 / PORTFOLIO OVERVIEW
          </motion.p>

          <h1 className="display text-[clamp(2.9rem,7.5vw,6.4rem)] text-foreground">
            <LetterStagger
              text="Md Jonayed"
              delay={0.45}
              highlight={(i, ch) => ch === "M" && i === 0}
            />
            <br />
            <LetterStagger
              text="Ahamed"
              delay={0.75}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
            className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-[#c2c2ca]"
          >
            {PROFILE.tagline}
          </motion.p>

          <HeroStats />

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <MagneticButton onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              View Projects
            </MagneticButton>
            <MagneticButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              {PROFILE.email}
            </MagneticButton>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-[#8a8a93]"
        >
          <span className="hud-label">Scroll to Load Structure</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown size={16} />
          </motion.span>
        </motion.div>
      </div>

      {/* location footer strip */}
      <div className="absolute bottom-4 right-6 z-10 hidden lg:flex items-center gap-2 hud-label text-[#8a8a93]">
        <MapPin size={12} style={{ color: "var(--cyan-glow)" }} />
        {PROFILE.location}
      </div>
    </section>
  );
}
