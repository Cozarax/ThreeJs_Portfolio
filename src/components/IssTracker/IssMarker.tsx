import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import latLngToVector3 from './ProjectionFunction'; // ta fonction lat/lng -> Vector3
import  useISSPosition  from './IssPosition';   // ton hook importé ici

type Props = {
  globeRadius?: number;
  altitude?: number;
  scaleFactor?: number;
};

const ISSMarker: React.FC<Props> = ({
  globeRadius = 100,
  altitude =5,
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const position = useISSPosition(4000); // met à jour toutes les 2s

  useFrame(() => {
    if (meshRef.current && position) {
      const coords = latLngToVector3({ lat: position.lat, lng: position.lng }, globeRadius + altitude);
      meshRef.current.position.lerp(coords, 0.1); // fluide
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 16, 16]} />
      <meshStandardMaterial color="cyan" emissive="cyan" emissiveIntensity={1} />
    </mesh>
  );
};

export default ISSMarker;
