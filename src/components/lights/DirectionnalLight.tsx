import { useRef } from 'react';
import { DirectionalLightHelper } from 'three';
import { useHelper } from '@react-three/drei';
import * as THREE from 'three';

type directionalLight = {
  color?: THREE.ColorRepresentation;
  intensity?: number;
  position?: [number, number, number];
};

export default function DirectionalLight(props: directionalLight) {
  const { color, intensity, position } = props;
  const lightRef = useRef<THREE.DirectionalLight>(null!);

  useHelper(lightRef, DirectionalLightHelper, 1);

  return (
    <directionalLight
      ref={lightRef}
      castShadow={true}
      color={color}
      intensity={intensity}
      position={position}
    />
  );
}
