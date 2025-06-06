import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import vertexShader from './Effects/vertexShader';
import fragmentShader from './Effects/fragmentShader';

export default function CRTScreen() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const crtColor = new THREE.Color('#648145');

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = performance.now() / 1000;
    }
  });

  return (
    <>
      <mesh position={[0, 0.08, 0.87]}>
        <planeGeometry args={[1.75, 1.32]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={{
            time: { value: 0 },
            scanlineIntensity: { value: 0.035 },
            scanlineCount: { value: 200.0 },
            flickerAmount: { value: 0.01 },
            noiseAmount: { value: 0.08 },
            crtColor: { value: crtColor },
          }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      
    </>
  );
}
