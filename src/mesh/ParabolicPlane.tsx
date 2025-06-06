// ParaboloidPlane.tsx
import * as THREE from 'three';
import { useMemo } from 'react';

type Props = {
  width?: number;
  height?: number;
  segments?: number;
  curveStrength?: number;
  position?: [number, number, number];
  children?: React.ReactNode;
};

export default function ParaboloidPlane({
  width = 1,
  height = 1,
  segments = 64,
  curveStrength = 0.3,
  children,
  ...meshProps
}: Props) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, height, segments, segments);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dx = x / width;
      const dy = y / height;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const z = -Math.pow(dist * 2, 2) * curveStrength;
      pos.setZ(i, z);
    }

    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, [width, height, segments, curveStrength]);

  return (
    <mesh geometry={geometry} {...meshProps} position={meshProps.position}>
      {children}
    </mesh>
  );
}
