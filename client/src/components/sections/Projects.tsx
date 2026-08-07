/*
 * BLUEPRINT ATELIER — Projects (SEC.03)
 * Horizontal-scroll gallery driven by vertical scroll (Framer useTransform + useScroll).
 * Each card: image with 3D depth-parallax on hover, HUD telemetry stats overlay.
 */
import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { PROJECTS, type Project } from "@/lib/data";

function useSpringNumber(initial: number, stiffness = 120, damping = 20) {
  const value = useMotionValue(initial);
  const springy = useSpring(value, { stiffness, damping });
  return [value, springy] as const;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [rawX, springX] = useSpringNumber(0);
  const [rawY, springY] = useSpringNumber(0);
  const [rawScale, springScale] = useSpringNumber(1, 150, 22);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 → 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(x * 24);
    rawY.set(y * 24);
    rawScale.set(1.08);
  };
  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
    rawScale.set(1);
  };

  return (
    <motion.article
      className="relative w-[340px] sm:w-[420px] lg:w-[480px] shrink-0 snap-start border border-white/8 bg-[#111115] group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* HUD header */}
      <div className="flex items-center justify-between px-5 pt-5">
        <span className="hud-label text-[#22d3ee]">{project.no}</span>
        <span className="hud-label">{project.edition.split("—")[0]}</span>
      </div>

      {/* image viewport with depth parallax */}
      <div
        className="relative mx-5 mt-4 h-56 overflow-hidden border border-white/8"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          style={{ x: springX, y: springY, scale: springScale }}
          className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] object-cover transition-[filter] duration-300 group-hover:brightness-110"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-transparent to-transparent pointer-events-none" />
        {/* reticle overlay */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#d4af37]/70 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#22d3ee]/70 pointer-events-none" />
      </div>

      {/* title + summary */}
      <div className="px-5 pt-5 pb-6">
        <h3 className="font-display font-extrabold text-2xl uppercase leading-tight text-foreground">
          {project.title}
        </h3>
        <p className="mt-1 font-mono text-[0.7rem] tracking-wider uppercase text-[#22d3ee]">
          {project.edition}
        </p>
        <p className="mt-3 text-[0.88rem] leading-relaxed text-[#8a8a93]">{project.summary}</p>

        {/* HUD stats grid */}
        <div className="mt-5 grid grid-cols-2 gap-px bg-white/8 border border-white/8">
          {project.stats.map((stat) => (
            <div key={stat.label} className="bg-[#0d0d11] px-4 py-3">
              <p className="hud-label !text-[0.6rem]">{stat.label}</p>
              <p className="mt-1 font-mono text-[0.78rem] text-[#f5c542] uppercase">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="border border-white/12 px-2.5 py-1 font-mono text-[0.64rem] uppercase tracking-wider text-[#8a8a93]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // map vertical scroll to horizontal translation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const trackWidth = PROJECTS.length * 480 + 200; // approx card width sum + padding
  const trackPx = Math.min(trackWidth - window.innerWidth + 100, trackWidth * 0.7);
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${trackPx}px`]);

  return (
    <section id="projects" ref={containerRef} className="relative py-28 md:py-36 bg-[#0a0a0c] overflow-hidden blueprint-grid">
      <div className="container">
        <Reveal>
          <p className="hud-label mb-4 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-[#d4af37]" />
            SEC. 03 / PROJECT SHOWCASE
          </p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="display text-[clamp(2.2rem,4.5vw,3.6rem)] text-foreground max-w-xl">
              Research made structural
            </h2>
            <p className="hud-label max-w-xs text-right">
              Horizontal gallery · scroll down to traverse
            </p>
          </div>
        </Reveal>
      </div>

      {/* horizontal track */}
      <motion.div ref={trackRef} className="mt-16" style={{ x }}>
        <div className="flex gap-8 pl-[max(1.5rem,calc((100vw-1280px)/2+2rem))] pr-20 pb-4 snap-x">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
