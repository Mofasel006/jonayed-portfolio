/*
 * BLUEPRINT ATELIER — 3D hero scene
 * Procedural low-poly wireframe suspension bridge: gold edges, cyan nodes,
 * slow rotation, mouse-driven parallax tilt. Gold dominates, cyan is telemetry.
 */
import { useRef, useMemo } from "react";
import { useElementSize } from "@/hooks/useElementSize";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Line, Float } from "@react-three/drei";
import * as THREE from "three";

const GOLD = "#d4af37";
const CYAN = "#22d3ee";
const DIM = "#3a3a44";

function catenary(x: number, sag: number, span: number): number {
  // simple parabola approximating a catenary cable
  const t = x / span;
  return -sag * 4 * t * (1 - t);
}

/** A single cable strand as a polyline */
function Cable({
  start,
  end,
  sag = 0.5,
  segments = 24,
}: {
  start: [number, number, number];
  end: [number, number, number];
  sag?: number;
  segments?: number;
}) {
  const points = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const p = s.clone().lerp(e, t);
      // blend local cable sag (vertical dip) onto the span
      p.y += catenary(t - 0, sag * 0.6, 1) * Math.sign(sag);
      arr.push(p);
    }
    return arr;
  }, [start, end, sag, segments]);

  return <Line points={points} color={GOLD} lineWidth={1.25} transparent opacity={0.9} />;
}

/** Suspenders: vertical lines from cable to deck */
function Suspenders({
  cableStart,
  cableEnd,
  deckY,
  count,
}: {
  cableStart: [number, number, number];
  cableEnd: [number, number, number];
  deckY: number;
  count: number;
}) {
  const lines = useMemo(() => {
    const arr: [number, number, number][][] = [];
    const s = new THREE.Vector3(...cableStart);
    const e = new THREE.Vector3(...cableEnd);
    for (let i = 1; i < count; i++) {
      const t = i / count;
      const top = s.clone().lerp(e, t);
      top.y += catenary(t, 0.35, 1); // match cable sag approximation
      arr.push([
        [top.x, top.y, top.z],
        [top.x, deckY, top.z],
      ]);
    }
    return arr;
  }, [cableStart, cableEnd, deckY, count]);

  return (
    <>
      {lines.map((pts, i) => (
        <Line key={i} points={pts} color={DIM} lineWidth={0.8} transparent opacity={0.55} />
      ))}
    </>
  );
}

function Bridge() {
  const group = useRef<THREE.Group>(null);
  const tiltTarget = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const { pointer } = state;
    // slow base rotation + mouse parallax tilt
    if (group.current) {
      group.current.rotation.y += delta * 0.18;
      tiltTarget.current.x = pointer.y * 0.18;
      tiltTarget.current.y = pointer.x * 0.25;
      group.current.rotation.x += (tiltTarget.current.x - group.current.rotation.x) * 0.04;
      group.current.rotation.z += (-tiltTarget.current.y * 0.15 - group.current.rotation.z) * 0.04;
    }
  });

  const deckY = -1.2;
  const deckZ = 1.0;
  const span = 6.4;
  const towerHeight = 1.65;
  const towerX: [number, number] = [-2.55, 2.55];

  return (
    <Float speed={0.6} rotationIntensity={0} floatIntensity={0.25}>
      <group ref={group}>
        {/* Deck: two edge beams + cross members */}
        {[-0.55, 0.55].map((zOff) => (
          <group key={zOff}>
            <Line
              points={[
                new THREE.Vector3(-span / 2, deckY, deckZ + zOff),
                new THREE.Vector3(span / 2, deckY, deckZ + zOff),
              ]}
              color={GOLD}
              lineWidth={1.6}
            />
          </group>
        ))}
        {/* cross members under deck */}
        {Array.from({ length: 17 }).map((_, i) => {
          const x = -span / 2 + (i * span) / 16;
          return (
            <Line
              key={`xm${i}`}
              points={[
                new THREE.Vector3(x, deckY, deckZ - 0.55),
                new THREE.Vector3(x, deckY, deckZ + 0.55),
              ]}
              color={DIM}
              lineWidth={1}
              transparent
              opacity={0.6}
            />
          );
        })}
        {/* Towers (two pylons each side) */}
        {towerX.map((tx) =>
          [-0.55, 0.55].map((tz) => (
            <group key={`${tx}-${tz}`}>
              <Line
                points={[
                  new THREE.Vector3(tx, deckY, deckZ + tz),
                  new THREE.Vector3(tx, deckY + towerHeight, deckZ + tz),
                ]}
                color={GOLD}
                lineWidth={1.8}
              />
              {/* crossbeam between twin pylons */}
              <Line
                points={[
                  new THREE.Vector3(tx, deckY + towerHeight * 0.85, deckZ - 0.55),
                  new THREE.Vector3(tx, deckY + towerHeight * 0.85, deckZ + 0.55),
                ]}
                color={CYAN}
                lineWidth={1.2}
                transparent
                opacity={0.8}
              />
            </group>
          ))
        )}
        {/* Main cables */}
        <Cable
          start={[-span / 2, deckY + 0.3, deckZ + 0.55]}
          end={[span / 2, deckY + 0.3, deckZ + 0.55]}
          sag={0.9}
        />
        <Cable
          start={[-span / 2, deckY + 0.3, deckZ - 0.55]}
          end={[span / 2, deckY + 0.3, deckZ - 0.55]}
          sag={0.9}
        />
        {/* Suspenders */}
        <Suspenders
          cableStart={[-span / 2, deckY + 0.3, deckZ + 0.55]}
          cableEnd={[span / 2, deckY + 0.3, deckZ + 0.55]}
          deckY={deckY}
          count={16}
        />
        {/* Cyan node markers at cable anchor points */}
        {[
          [-span / 2, deckY + 0.3, deckZ + 0.55],
          [span / 2, deckY + 0.3, deckZ + 0.55],
          [-span / 2, deckY + 0.3, deckZ - 0.55],
          [span / 2, deckY + 0.3, deckZ - 0.55],
          [towerX[0], deckY + towerHeight, deckZ - 0.55],
          [towerX[0], deckY + towerHeight, deckZ + 0.55],
          [towerX[1], deckY + towerHeight, deckZ - 0.55],
          [towerX[1], deckY + towerHeight, deckZ + 0.55],
        ].map((p, i) => (
          <mesh key={i} position={p as [number, number, number]}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshBasicMaterial color={CYAN} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

/** drifting grid particles — blueprint dust */
function Dust({ count = 260 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={CYAN} size={0.022} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function MeasuredCanvas({
  children,
  className,
  camera,
}: {
  children: React.ReactNode;
  className?: string;
  camera?: { position: [number, number, number]; fov: number };
}) {
  const { ref, width, height } = useElementSize();
  return (
    <div ref={ref} className={className}>
      {width > 0 && height > 0 && (
        <Canvas
          key={`${width}x${height}`}
          camera={camera}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ gl }) => {
            gl.setClearColor("#0a0a0c", 1);
            gl.setSize(width, height, false);
          }}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
}

export default function StructureScene() {
  return (
    <MeasuredCanvas
      className="scene-canvas"
      camera={{ position: [1.2, 1.0, 10.2], fov: 44 }}
    >
      <fog attach="fog" args={["#0a0a0c", 6, 16]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[6, 5, 4]} color={GOLD} intensity={2.2} />
      <pointLight position={[-7, 2, -5]} color={CYAN} intensity={1.1} />
      <pointLight position={[0, -4, 6]} color={GOLD} intensity={0.7} />
      <group position={[1.6, -0.5, -1.0]} scale={0.78}>
        <Bridge />
      </group>
      <Dust count={160} />
      {/* blueprint ground grid */}
      <gridHelper args={[40, 40, "#22222a", "#17171d"]} position={[0, -3.2, 0]} />
    </MeasuredCanvas>
  );
}
