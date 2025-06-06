import { Text3D } from '@react-three/drei';

export default function Text() {
  return (
    <>
      <Text3D 
        font="/fonts/helvetiker_regular.typeface.json" 
        position={[-0.9, 0.95, 0.9]}
        size={0.12}
        height={0.005}
        curveSegments={5}
        bevelEnabled
        bevelThickness={0.02}
        bevelOffset={0}
        bevelSegments={10}
        >
          
        Cozarax
        Portfolio
        <meshNormalMaterial />
      </Text3D>
    </>
  );
}
