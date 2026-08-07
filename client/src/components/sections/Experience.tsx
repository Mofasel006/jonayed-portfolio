/*
 * BLUEPRINT ATELIER — Experience (SEC.02)
 * Vertical drafting timeline with dimension-line dividers, staggered entries.
 */
import { Reveal } from "@/components/Reveal";
import { EXPERIENCE } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-36 bg-[#0d0d10]">
      <div className="container">
        <Reveal>
          <p className="hud-label mb-4 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-[#d4af37]" />
            SEC. 02 / PRACTICAL EXPOSURE
          </p>
          <h2 className="display text-[clamp(2.2rem,4.5vw,3.6rem)] text-foreground max-w-2xl">
            Where the blueprint met the ground
          </h2>
        </Reveal>

        <div className="relative mt-16 max-w-3xl">
          {/* vertical axis */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#d4af37]/60 via-[#3a3a44] to-transparent" />

          <div className="flex flex-col gap-10">
            {EXPERIENCE.map((exp, i) => (
              <Reveal key={exp.org} delay={i * 0.12}>
                <article className="relative pl-12">
                  {/* node */}
                  <span
                    className="absolute left-0 top-1.5 h-[15px] w-[15px] border border-[#d4af37] bg-[#0d0d10] rotate-45"
                    style={{ boxShadow: "0 0 14px rgba(212,175,55,0.35)" }}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display font-bold text-xl uppercase text-foreground">
                      {exp.org}
                    </h3>
                    <span className="hud-chip">{exp.period}</span>
                  </div>
                  <p className="mt-1 text-[0.9rem] text-[#22d3ee] font-mono tracking-wide">{exp.role}</p>
                  <p className="mt-0.5 text-[0.78rem] text-[#8a8a93] font-mono">{exp.location}</p>
                  <ul className="mt-4 space-y-2">
                    {exp.points.map((p, j) => (
                      <li key={j} className="flex gap-3 text-[0.92rem] leading-relaxed text-[#c2c2ca]">
                        <span className="mt-2 h-px w-5 bg-[#d4af37]/60 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
