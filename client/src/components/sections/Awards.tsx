/*
 * BLUEPRINT ATELIER — Awards (SEC.05)
 * Dual-direction HUD marquee of recognitions + highlight cards.
 */
import { Reveal } from "@/components/Reveal";
import { AWARDS } from "@/lib/data";
import { motion } from "framer-motion";

function MarqueeRow({ items, direction = 1, duration = 40 }: { items: typeof AWARDS; direction?: 1 | -1; duration?: number }) {
  return (
    <div className="overflow-hidden py-4 select-none" aria-hidden>
      <motion.div
        className="flex w-max gap-8"
        animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((a, i) => (
          <div key={i} className="flex items-center gap-4 whitespace-nowrap">
            <span className="font-display font-extrabold text-lg uppercase text-[#f5c542]">
              {a.label}
            </span>
            <span className="text-[#8a8a93] text-sm">{a.event} — {a.loc}</span>
            <span className="inline-block w-2 h-2 rotate-45 bg-[#22d3ee]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Awards() {
  return (
    <section id="awards" className="relative py-24 md:py-28 bg-[#0a0a0c] border-y border-white/5">
      <div className="container">
        <Reveal>
          <p className="hud-label mb-4 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-[#d4af37]" />
            SEC. 05 / RECOGNITION LEDGER
          </p>
          <h2 className="display text-[clamp(2.2rem,4.5vw,3.6rem)] text-foreground max-w-2xl">
            Verified on the record
          </h2>
        </Reveal>

        <div className="mt-10 border-y border-white/8 divide-y divide-white/5">
          <MarqueeRow items={AWARDS.slice(0, 4)} direction={1} duration={38} />
          <MarqueeRow items={AWARDS.slice(4)} direction={-1} duration={44} />
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {[
            { big: "17+", label: "National & International Awards", sub: "Innovation, research & civil engineering fests" },
            { big: "2", label: "International Bronze Medals", sub: "ISIF Indonesia · BYSIS Thailand" },
            { big: "9+", label: "Campus Ambassador Roles", sub: "NSU · DIU · MIST · AUST · UAP · BRAC & more" },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="border border-white/8 bg-[#131317] p-7">
                <p className="display text-5xl text-[#f5c542]">{stat.big}</p>
                <p className="mt-3 font-display font-bold text-sm uppercase text-foreground">{stat.label}</p>
                <p className="mt-1 text-[0.82rem] text-[#8a8a93]">{stat.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
