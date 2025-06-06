import { useState } from 'react';
import { Html } from '@react-three/drei';
import CrtInterface from './CrtInterface';
import RetroComputer from './RetroCrtComputer';
import CRTScreen from './CrtScreen';

export default function CrtIndex() {
  const [isActive, setIsActive] = useState(false);
   const toggle = () => setIsActive((prev) => !prev);

  return (
    <>
      <RetroComputer />
      {/* Bouton TOUJOURS visible */}
      <mesh position={[2.5, -1, 0.43]} onClick={toggle}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="lime" emissive="green" />
      </mesh>

      {/* Shader visible quand l’écran est OFF */}
      {!isActive && <CRTScreen/>}

      {/* HTML visible quand ON */}
      {isActive && (
        <Html
          transform
          position={[0, 0.07, 0.86]}
          distanceFactor={1.1}
          occlude="blending"
          zIndexRange={[10, 0]}
        >
          <CrtInterface onToggle={toggle} />
        </Html>
      )}
      
    </>
  );
}
