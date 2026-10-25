'use client';

import {
  Environment,
  Lightformer,
  PerformanceMonitor,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type { MotionValue } from 'motion/react';
import { type RefObject, useState } from 'react';

import { BeetleModel, type SceneColors } from './BeetleModel';
import { PollenField } from './PollenField';

interface HeroSceneProps {
  colors: SceneColors;
  pointer: RefObject<{ x: number; y: number }>;
  progress: MotionValue<number>;
  active: boolean;
  compact: boolean;
  onReady: () => void;
}

export default function HeroScene({
  colors,
  pointer,
  progress,
  active,
  compact,
  onReady,
}: HeroSceneProps) {
  const [dpr, setDpr] = useState(compact ? 1.5 : 2);

  return (
    <Canvas
      dpr={[1, dpr]}
      camera={{ position: [0, 0, 9], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      onCreated={onReady}
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 8]} intensity={2.4} />
      <directionalLight
        position={[-6, -3, -4]}
        intensity={1.4}
        color={colors.wing}
      />

      {/* Studio reflections built locally, so no HDR file is fetched */}
      <Environment resolution={128}>
        <Lightformer
          form="rect"
          intensity={3}
          position={[0, 4, 6]}
          scale={[10, 3, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.5}
          color={colors.wing}
          position={[-6, 0, 2]}
          scale={[3, 8, 1]}
        />
        <Lightformer
          form="ring"
          intensity={2}
          position={[5, -2, 4]}
          scale={3}
        />
      </Environment>

      <BeetleModel colors={colors} pointer={pointer} progress={progress} />
      <PollenField
        count={compact ? 90 : 220}
        colors={colors}
        pointer={pointer}
      />
    </Canvas>
  );
}
