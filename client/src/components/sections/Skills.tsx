/*
 * BLUEPRINT ATELIER — Capabilities (SEC.04)
 * Split: left = 3D floating tag cloud (tools rotate in space, hover slows + highlights);
 * right = skill proficiency bars in HUD style.
 */
import { useRef } from "react";
import { useElementSize } from "@/hooks/useElementSize";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { Reveal } from "@/components/Reveal";
import { SKILLS, SERVICES } from "@/lib/data";
import {
  Columns3, Leaf, ClipboardList, FlaskConical, Cpu, HardHat,
} from "lucide-react";

const SERVICE_ICONS = [Columns3, Leaf, ClipboardList, FlaskConical, Cpu, HardHat];

/* ---------------- 3D tag cloud ---------------- */
const TOOLS = [
  "AutoCAD", "Revit", "STAAD Pro", "BIM", "MS Project",
  "Excel", "BOQ", "BNBC", "RCC", "Permeable Concrete",
  "Site Works", "Sustainable Design", "Green City",
];

/**
 * Measured Canvas — ensures the WebGL buffer matches the wrapper size.
 */
function TagCloudCanvas({ children }: { children: React.ReactNode }) {
  const { ref, width, height } = useElementSize();
  return (
    <div ref={ref} className="scene-canvas">
      {width > 0 && height > 0 && (
        <Canvas
          key={`${width}x${height}`}
          camera={{ position: [0, 0, 7], fov: 50 }}
          dpr={[1, 1.5]}
          onCreated={({ gl }) => gl.setSize(width, height, false)}
        >
          <ambientLight intensity={0.6} />
          {children}
        </Canvas>
      )}
    </div>
  );
}

function Tag({
  text,
  angle,
  radius,
  yOffset,
  highlight,
}: {
  text: string;
  angle: number;
  radius: number;
  yOffset: number;
  highlight: boolean;
}) {
  const ref = useRef<THREE.Group>(null); // three Text instance typed as Group (shared transform props)
  const elapsed = useRef(Math.random() * 10);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    elapsed.current += delta;
    const speed = highlight ? 0.05 : 0.16;
    ref.current.rotation.y = angle + elapsed.current * speed;
    const s = highlight ? 1.35 : 1;
    ref.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
  });

  return (
    <group position={[Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius]}>
      <Text
        ref={ref as never}
        fontSize={0.22}
        color={highlight ? "#f5c542" : "#22d3ee"}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/archivo/v18/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_FnYwNbPzS5HE.ttf"
      >
        {text.toUpperCase()}
      </Text>
    </group>
  );
}

function TagCloud() {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef(new THREE.Vector2());

  useFrame(({ pointer: scenePointer }) => {
    if (groupRef.current) {
      pointer.current.copy(scenePointer);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointer.current.y * 0.25,
        0.05
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -pointer.current.x * 0.12,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      {TOOLS.map((tool, i) => (
        <Tag
          key={tool}
          text={tool}
          angle={(i / TOOLS.length) * Math.PI * 2}
          radius={3.1}
          yOffset={Math.sin(i * 1.9) * 1.1}
          highlight={i % 4 === 0}
        />
      ))}
    </group>
  );
}

/* ---------------- proficiency bars ---------------- */
function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  return (
    <Reveal delay={index * 0.05}>
      <div className="group">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[#c2c2ca]">
            {name}
          </span>
          <span className="font-mono text-[0.7rem] text-[#f5c542]">{level}%</span>
        </div>
        <div className="mt-2 h-[3px] w-full bg-white/8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#d4af37] to-[#22d3ee] origin-left transition-transform duration-700"
            style={{
              transform: "scaleX(0)",
              animation: `barGrow 0.9s ${index * 0.07 + 0.3}s cubic-bezier(0.23,1,0.32,1) forwards`,
            }}
          />
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------- services grid ---------------- */
export default function Skills() {
  return (
    <section id="services" className="relative py-28 md:py-36 bg-[#0d0d10]">
      <style>{`
        @keyframes barGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(var(--lvl)); }
        }
      `}</style>
      <div className="container">
        <Reveal>
          <p className="hud-label mb-4 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-[#d4af37]" />
            SEC. 04 / CAPABILITIES & TOOLS
          </p>
          <h2 className="display text-[clamp(2.2rem,4.5vw,3.6rem)] text-foreground max-w-2xl">
            Instruments of the trade
          </h2>
        </Reveal>

        {/* 3D tag cloud */}
        <Reveal delay={0.1}>
          <div className="relative mt-12 h-[300px] md:h-[380px] border border-white/8 bg-[#0a0a0c] overflow-hidden">
            <div className="absolute top-4 left-4 hud-label z-10">3D TOOL CLOUD · HOVER TO ORBIT</div>
            <TagCloudCanvas>
              <TagCloud />
            </TagCloudCanvas>
          </div>
        </Reveal>

        {/* two-column: proficiency + services */}
        <div className="mt-16 grid lg:grid-cols-2 gap-14">
          <div>
            <Reveal>
              <h3 className="font-display font-bold text-lg uppercase tracking-wide text-foreground">
                Proficiency Matrix
              </h3>
            </Reveal>
            <div className="mt-6 space-y-4">
              {SKILLS.map((s, i) => (
                <SkillBar key={s.name} name={s.name} level={s.level} index={i} />
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <h3 className="font-display font-bold text-lg uppercase tracking-wide text-foreground">
                Services I Deliver
              </h3>
            </Reveal>
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {SERVICES.map((svc, i) => {
                const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
                return (
                <Reveal key={svc.title} delay={i * 0.06}>
                  <div className="group h-full border border-white/8 bg-[#131317] p-5 transition-all duration-200 hover:border-[#d4af37]/50 hover:shadow-[0_0_24px_rgba(212,175,55,0.12)]">
                    <Icon size={20} style={{ color: "var(--gold-bright)" }} />
                    <h4 className="mt-3 font-display font-bold text-sm uppercase text-foreground">
                      {svc.title}
                    </h4>
                    <p className="mt-1.5 text-[0.8rem] leading-relaxed text-[#8a8a93]">{svc.desc}</p>
                  </div>
                </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
