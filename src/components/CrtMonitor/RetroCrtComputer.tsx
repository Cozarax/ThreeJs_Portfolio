import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function RetroComputer() {
  const { scene, nodes } = useGLTF('/models/concept_retro_computer_free.glb');

  useEffect(() => {
    const toHide = ['Cube001','Cube002', 'Cube003', 'Cube005', 'Cube006', 'Cube007', 'Cube008'];
    toHide.forEach(name => {
      const node = nodes[name];
      if (node) node.visible = false;
    });

    scene.traverse(child => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    // console.log('➡️ Tous les nodes :', nodes);
  }, [nodes, scene]);

  return (
    <>
      <primitive object={scene} scale={1} position={[0, 0, 0]} />
    </>
  );
}
