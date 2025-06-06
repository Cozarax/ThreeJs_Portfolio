
import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

type RectAreaLightProps = {
  color?: THREE.ColorRepresentation;
  intensity?: number;
  width?: number;
  height?: number;
  position?: [number, number, number];
  helper?: boolean;
  lookAt?: [number, number, number]
};

export default function RectAreaLight(props: RectAreaLightProps) {
  const {
    color,
    intensity,
    width,
    height,
    position,
    helper=false,
    lookAt=[0,0.06,15]
  } = props;

  const lightRef  = useRef<THREE.RectAreaLight>(null);
  const helperRef = useRef<RectAreaLightHelper | null>(null);
  const { scene } = useThree();

  useEffect(() => {
    RectAreaLightUniformsLib.init();
    if (lightRef.current) {
      lightRef.current.lookAt(...lookAt);
    }
  }, [lookAt]);

  useEffect(() => {
    if (!lightRef.current) return;

    // Si helper est activé et qu'on n'a pas encore de helper, on l'ajoute
    if (helper && !helperRef.current) {
      const h = new RectAreaLightHelper(lightRef.current);
      helperRef.current = h;
      scene.add(h);
    }

    // Si helper est désactivé et qu'on a un helper, on le retire
    if (!helper && helperRef.current) {
      scene.remove(helperRef.current);
      helperRef.current.dispose?.();
      helperRef.current = null;
    }
  }, [helper, scene]);

  return (
    <rectAreaLight
      ref={lightRef}
      color={color}
      intensity={intensity}
      width={width}
      height={height}
      position={position}
    />
  );
}
