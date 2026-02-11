import { forwardRef, useImperativeHandle, useMemo, useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ASSET_BASE } from '../data/asset-manifest';

export interface Prop3DProps {
  modelPath: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  animate?: boolean;
  onClick?: () => void;
}

export interface Prop3DHandle {
  setPosition: (pos: [number, number, number]) => void;
  setVisible: (v: boolean) => void;
}

export const Prop3D = forwardRef<Prop3DHandle, Prop3DProps>((props, ref) => {
  const {
    modelPath,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
    animate = false,
    onClick
  } = props;

  const groupRef = useRef<THREE.Group>(null);
  const [visible, setVisible] = useState(true);
  const [animProgress, setAnimProgress] = useState(animate ? 0 : 1);

  const { scene } = useGLTF(ASSET_BASE + modelPath);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    // Enable shadow casting on all mesh children
    clone.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  // Expose imperative handle
  useImperativeHandle(ref, () => ({
    setPosition: (pos: [number, number, number]) => {
      if (groupRef.current) {
        groupRef.current.position.set(...pos);
      }
    },
    setVisible: (v: boolean) => {
      setVisible(v);
    }
  }));

  // Reset animation progress when animate prop changes
  useEffect(() => {
    if (animate) {
      setAnimProgress(0);
    }
  }, [animate]);

  // Animate entrance if enabled
  useFrame((_state, delta) => {
    if (animate && animProgress < 1) {
      setAnimProgress((prev) => Math.min(prev + delta / 0.3, 1));
    }
  });

  // Bounce easing function
  const easeOutBounce = (t: number): number => {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  };

  // Calculate animated scale
  const targetScale = Array.isArray(scale) ? scale : [scale, scale, scale];
  const easedProgress = animate ? easeOutBounce(animProgress) : 1;
  const currentScale: [number, number, number] = [
    targetScale[0] * easedProgress,
    targetScale[1] * easedProgress,
    targetScale[2] * easedProgress
  ];

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={currentScale}
      visible={visible}
      onClick={onClick}
    >
      <primitive object={clonedScene} />
    </group>
  );
});

Prop3D.displayName = 'Prop3D';
