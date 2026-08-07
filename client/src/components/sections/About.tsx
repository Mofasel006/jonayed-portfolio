/*
 * BLUEPRINT ATELIER — About (SEC.01)
 * Split-screen: left narrative, right interactive wireframe model.
 * Hovering each stat card "morphs" the 3D model (scale + rotation impulses).
 */
import { useRef, useState } from "react";
import { useElementSize } from "@/hooks/useElementSize";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Reveal, MaskReveal } from "@/components/Reveal";
import { EXPERIENCE, EDUCATION } from "@/lib/data";
import { Award, GraduationCap, Briefcase } from "lucide-react";

const GOLD = "#d4af37";
const CYAN = "#22d3ee";

/**
 * Measured Canvas — fixes the 300×150 buffer bug: we measure the wrapper
 * with ResizeObserver and mount the Canvas only once we know the real size.
 */
function AboutCanvas({ shapeIndex }: { shapeIndex: number }) {
  const { ref, width, height } = useElementSize();
  return (
    <div ref={ref} className="scene-canvas">
      {width > 0 && height > 0 && (
        <Canvas key={`${width}x${height}`} camera={{ position: [0, 0, 3.2], fov: 45 }} dpr={[1, 1.6]}
          onCreated={({ gl }) => gl.setSize(width, height, false)}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 3]} color={GOLD} intensity={1.4} />
          <pointLight position={[-3, -2, 2]} color={CYAN} intensity={0.8} />
          <MorphModel shapeIndex={shapeIndex} />
        </Canvas>
      )}
    </div>
  );
}

/** Icosahedron wireframe that morphs between forms driven by a shape index */
function MorphModel({ shapeIndex }: { shapeIndex: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetScale = useRef(1);

  const elapsed = useRef(0);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    elapsed.current += delta;
    const t = elapsed.current;
    const m = meshRef.current;
    // smooth scale morph pulses when shapeIndex changes
    targetScale.current += (1.02 - targetScale.current) * 0.05;
    m.rotation.y += delta * 0.25;
    m.rotation.x = Math.sin(t * 0.3) * 0.12 + 0.2;
    m.scale.setScalar(targetScale.current);
    // morph via time-based noise-like vertex displacement
    const geo = m.geometry as THREE.IcosahedronGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      const len = Math.sqrt(x * x + y * y + z * z) || 1;
      // blend between sphere-ish and faceted tower shape per shapeIndex
      const morph = 1 + shapeIndex * 0.35;
      const disp = Math.sin(x * 2 + t) * Math.cos(y * 2 + t) * 0.12 * morph;
      const r = 1 + disp;
      pos.setXYZ(i, (x / len) * r, (y / len) * r, (z / len) * r);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.15, 1]} />
      <meshStandardMaterial
        color="#16161a"
        wireframe
        emissive={GOLD}
        emissiveIntensity={0.35}
      />
    </mesh>
  );
}

const FACTS = [
  {
    icon: GraduationCap,
    label: "Education",
    value: "B.Sc. Civil Eng.",
    detail: "Sonargaon University · GPA 3.05/4.00 · ICCSD KUET paper accepted",
    shape: 0,
  },
  {
    icon: Briefcase,
    label: "Field Exposure",
    value: "Site & Prototype",
    detail: "Concrete pilots, material handling, and site coordination at Nextgen Innovators",
    shape: 1,
  },
  {
    icon: Award,
    label: "Recognition",
    value: "17+ Awards",
    detail: "International bronze medals (ISIF Indonesia, BYSIS Thailand) and national championships",
    shape: 2,
  },
  {
    icon: Award,
    label: "Leadership",
    value: "200+ Members",
    detail: "Founded & led the SU-IDC Hub; built the university's strongest innovation club",
    shape: 3,
  },
];

export default function About() {
  const [shapeIndex, setShapeIndex] = useState(0);

  return (
    <section id="about" className="relative py-28 md:py-36 blueprint-grid">
      <div className="container">
        <Reveal>
          <p className="hud-label mb-4 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-[#d4af37]" />
            SEC. 01 / STRUCTURAL PROFILE
          </p>
        </Reveal>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* left narrative */}
          <div className="lg:col-span-6">
            <h2 className="display text-[clamp(2.2rem,4.5vw,3.6rem)] text-foreground">
              <MaskReveal>Built on Research,</MaskReveal>
              <br />
              <MaskReveal delay={0.12}>
                Engineered for <span style={{ color: "var(--gold-bright)" }}>Reality</span>
              </MaskReveal>
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 text-[#c2c2ca] leading-relaxed text-[1.02rem]">
                I am a research-driven civil engineer from Narsingdi, Dhaka, working at the
                intersection of sustainable infrastructure, smart-city planning, and hands-on
                construction research. My work spans permeable concrete flood-resilience systems,
                AI-powered urban frameworks, and waste-to-energy restoration models — each tested
                as a real prototype, not just a concept.
              </p>
              <p className="mt-4 text-[#8a8a93] leading-relaxed">
                Beyond technical depth, I lead: as Founder &amp; President of Sonargaon University's
                IDC Hub, I coordinated 200+ members and guided teams to 17+ national and
                international awards. I communicate, coordinate, and deliver — from laboratory
                bench to construction site.
              </p>
            </Reveal>

            <div className="mt-10 grid sm:grid-cols-2 gap-3">
              {FACTS.map((fact, i) => (
                <Reveal key={fact.label} delay={0.1 * i}>
                  <button
                    onMouseEnter={() => setShapeIndex(fact.shape)}
                    onFocus={() => setShapeIndex(fact.shape)}
                    className="group text-left w-full border border-white/8 bg-[#131317] p-5 transition-all duration-200 hover:border-[#d4af37]/50 hover:shadow-[0_0_24px_rgba(212,175,55,0.12)]"
                  >
                    <fact.icon size={18} style={{ color: "var(--gold-bright)" }} />
                    <p className="hud-label mt-3">{fact.label}</p>
                    <p className="font-display font-bold text-lg uppercase mt-1 text-foreground">
                      {fact.value}
                    </p>
                    <p className="mt-1.5 text-[0.82rem] text-[#8a8a93] leading-snug">
                      {fact.detail}
                    </p>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>

          {/* right: 3D morph model */}
          <div className="lg:col-span-6 relative">
            {/* portrait collage — professional site & campus shots */}
            <Reveal delay={0.12}>
              <div className="relative mb-4 flex gap-3 items-stretch min-h-[420px] lg:min-h-[520px]">
                <div className="relative w-5/12 border border-white/8 bg-[#0e0e11] flex items-center justify-center p-2 flex-shrink-0">
                  <img
                    src="/manus-storage/profile-collage_313a139e.png"
                    alt="Md Jonayed Ahamed — on site and at Sonargaon University"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-3 hud-label text-[0.6rem]">
                    SITE / FIELD / CAMPUS
                  </div>
                </div>
                <div className="w-7/12 flex flex-col">
                  <div className="flex-1 border border-white/8 bg-[#0e0e11] overflow-hidden">
                    <AboutCanvas shapeIndex={shapeIndex} />
                  </div>
                  <div className="hud-label text-[0.6rem] text-[#22d3ee] mt-1">
                    MODEL / MORPH-0{shapeIndex + 1} · HOVER A CARD TO MORPH · R3F REALTIME
                  </div>
                </div>
              </div>
            </Reveal>

            {/* experience strip under model */}
            <div className="mt-5 grid gap-2">
              {EXPERIENCE.slice(0, 1).map((exp) => (
                <Reveal key={exp.org} delay={0.2}>
                  <div className="border-l-2 border-[#d4af37]/50 pl-4 py-1">
                    <p className="font-display font-bold text-sm uppercase text-foreground">{exp.org}</p>
                    <p className="text-[0.82rem] text-[#8a8a93]">{exp.role} · {exp.period}</p>
                  </div>
                </Reveal>
              ))}
              {EDUCATION.slice(0, 1).map((ed) => (
                <Reveal key={ed.institution} delay={0.25}>
                  <div className="border-l-2 border-[#22d3ee]/50 pl-4 py-1">
                    <p className="font-display font-bold text-sm uppercase text-foreground">{ed.institution}</p>
                    <p className="text-[0.82rem] text-[#8a8a93]">{ed.degree} · {ed.period}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
