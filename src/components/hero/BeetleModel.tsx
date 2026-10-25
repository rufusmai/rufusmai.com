'use client';

import { useFrame } from '@react-three/fiber';
import type { MotionValue } from 'motion/react';
import { type RefObject, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import { iconPaths, iconViewBox } from '@/components/site/logoPaths';

export interface SceneColors {
  ink: string;
  wing: string;
}

interface BeetleModelProps {
  colors: SceneColors;
  pointer: RefObject<{ x: number; y: number }>;
  progress: MotionValue<number>;
}

/** World-space width of the logo. */
const SIZE = 3.4;
const INTRO_SECONDS = 1.8;

// Layers of the logo, each extruded on its own so they separate in depth.
const LAYERS = [
  { key: 'oval', indices: [0], z: -14, depth: 14 },
  { key: 'body', indices: [1, 3], z: 4, depth: 22 },
  { key: 'wing', indices: [2], z: 22, depth: 14 },
] as const;

function buildGeometry(indices: readonly number[], depth: number, z: number) {
  const markup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${iconViewBox}">${indices
    .map((index) => {
      const path = iconPaths[index];
      return `<path fill="#000" ${path.evenOdd ? 'fill-rule="evenodd"' : ''} d="${path.d}"/>`;
    })
    .join('')}</svg>`;

  const geometries = new SVGLoader().parse(markup).paths.flatMap((path) =>
    SVGLoader.createShapes(path).map(
      (shape) =>
        new THREE.ExtrudeGeometry(shape, {
          depth,
          curveSegments: 24,
          bevelEnabled: true,
          bevelThickness: 3,
          bevelSize: 2,
          bevelSegments: 4,
        })
    )
  );

  const merged = mergeGeometries(geometries) ?? new THREE.BufferGeometry();
  geometries.forEach((geometry) => geometry.dispose());

  // SVG coordinates grow downwards; centre on the logo's view box
  const [minX, minY, width, height] = iconViewBox.split(' ').map(Number);
  merged.translate(-(minX + width / 2), -(minY + height / 2), z - depth / 2);
  merged.scale(SIZE / width, -SIZE / width, SIZE / width);
  merged.computeVertexNormals();
  return merged;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function BeetleModel({ colors, pointer, progress }: BeetleModelProps) {
  const group = useRef<THREE.Group>(null);
  const wing = useRef<THREE.Mesh>(null);
  const start = useRef<number | null>(null);

  const geometries = useMemo(
    () =>
      Object.fromEntries(
        LAYERS.map((layer) => [
          layer.key,
          buildGeometry(layer.indices, layer.depth, layer.z),
        ])
      ) as Record<(typeof LAYERS)[number]['key'], THREE.BufferGeometry>,
    []
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    const time = state.clock.elapsedTime;
    start.current ??= time;
    const intro = easeOutCubic(
      Math.min((time - start.current) / INTRO_SECONDS, 1)
    );
    const scroll = progress.get();
    const { x, y } = pointer.current;

    // Fly in from the lower left, hover, tilt towards the pointer and take
    // off upwards while the hero scrolls out of view.
    const targetX = -2.6 * (1 - intro);
    const targetY =
      -2.2 * (1 - intro) + Math.sin(time * 0.9) * 0.08 + scroll * 3.2;
    const targetZ = -2 * (1 - intro);

    g.position.x = THREE.MathUtils.damp(g.position.x, targetX, 6, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, targetY, 6, delta);
    g.position.z = THREE.MathUtils.damp(g.position.z, targetZ, 6, delta);

    g.rotation.x = THREE.MathUtils.damp(
      g.rotation.x,
      -y * 0.35 + 0.15 * (1 - intro) - scroll * 0.5,
      4,
      delta
    );
    g.rotation.y = THREE.MathUtils.damp(
      g.rotation.y,
      x * 0.5 - 0.9 * (1 - intro) + scroll * 1.1,
      4,
      delta
    );
    g.rotation.z = THREE.MathUtils.damp(
      g.rotation.z,
      Math.sin(time * 0.6) * 0.04 + scroll * 0.45,
      4,
      delta
    );

    // Wing covers lift a little and flutter in short bursts
    if (wing.current) {
      const burst = Math.max(0, Math.sin(time * 0.7)) ** 8;
      wing.current.position.z = 0.06 + burst * 0.08 + scroll * 0.25;
      wing.current.rotation.y = Math.sin(time * 28) * 0.05 * burst;
    }
  });

  return (
    <group ref={group} position={[-2.6, -2.2, -2]}>
      <mesh geometry={geometries.oval}>
        <meshPhysicalMaterial
          color={colors.ink}
          roughness={0.35}
          metalness={0.15}
          clearcoat={0.6}
          clearcoatRoughness={0.3}
        />
      </mesh>
      <mesh geometry={geometries.body}>
        <meshPhysicalMaterial
          color={colors.ink}
          roughness={0.3}
          metalness={0.2}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
        />
      </mesh>
      <mesh ref={wing} geometry={geometries.wing}>
        <meshPhysicalMaterial
          color={colors.wing}
          roughness={0.22}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.08}
          sheen={0.4}
          sheenColor={colors.wing}
        />
      </mesh>
    </group>
  );
}
