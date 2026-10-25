'use client';

import { useFrame } from '@react-three/fiber';
import { type RefObject, useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import type { SceneColors } from './BeetleModel';

interface PollenFieldProps {
  count: number;
  colors: SceneColors;
  pointer: RefObject<{ x: number; y: number }>;
}

interface Grain {
  radius: number;
  angle: number;
  height: number;
  speed: number;
  phase: number;
  scale: number;
  wing: boolean;
}

/** Mulberry32: a tiny seeded PRNG, so the field looks the same every render. */
function createRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createGrains(count: number): Grain[] {
  const random = createRandom(2026);
  return Array.from({ length: count }, (_, index) => ({
    radius: 1.9 + random() * 2.6,
    angle: random() * Math.PI * 2,
    height: (random() - 0.5) * 4.2,
    speed: (0.04 + random() * 0.08) * (index % 2 ? 1 : -1),
    phase: random() * Math.PI * 2,
    scale: 0.5 + random() * 1.1,
    wing: random() < 0.55,
  }));
}

/** Slowly orbiting "pollen" grains around the beetle. */
export function PollenField({ count, colors, pointer }: PollenFieldProps) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const grains = useMemo(() => createGrains(count), [count]);

  useLayoutEffect(() => {
    const instance = mesh.current;
    if (!instance) return;
    const wing = new THREE.Color(colors.wing);
    const ink = new THREE.Color(colors.ink);
    grains.forEach((grain, index) =>
      instance.setColorAt(index, grain.wing ? wing : ink)
    );
    if (instance.instanceColor) instance.instanceColor.needsUpdate = true;
  }, [grains, colors]);

  useFrame((state, delta) => {
    const instance = mesh.current;
    if (!instance) return;
    const time = state.clock.elapsedTime;

    grains.forEach((grain, index) => {
      const angle = grain.angle + time * grain.speed;
      dummy.position.set(
        Math.cos(angle) * grain.radius,
        grain.height + Math.sin(time * 0.5 + grain.phase) * 0.15,
        Math.sin(angle) * grain.radius * 0.6 - 1
      );
      dummy.scale.setScalar(
        grain.scale * (0.85 + Math.sin(time * 1.3 + grain.phase) * 0.15)
      );
      dummy.updateMatrix();
      instance.setMatrixAt(index, dummy.matrix);
    });
    instance.instanceMatrix.needsUpdate = true;

    // A gentle parallax against the beetle
    instance.rotation.y = THREE.MathUtils.damp(
      instance.rotation.y,
      pointer.current.x * 0.15,
      2,
      delta
    );
    instance.rotation.x = THREE.MathUtils.damp(
      instance.rotation.x,
      -pointer.current.y * 0.1,
      2,
      delta
    );
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <icosahedronGeometry args={[0.035, 1]} />
      <meshStandardMaterial roughness={0.4} metalness={0.1} />
    </instancedMesh>
  );
}
