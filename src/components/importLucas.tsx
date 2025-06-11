import { useGLTF } from '@react-three/drei';

export default function DeviceSite() {
  const { scene } = useGLTF('/models/Device_SITE_0001.glb');

//   useEffect(() => {
//     // const toHide = ['Cube001','Cube002', 'Cube003', 'Cube005', 'Cube006', 'Cube007', 'Cube008'];
//     // toHide.forEach(name => {
//     //   const node = nodes[name];
//     //   if (node) node.visible = false;
//     // });

//     scene.traverse(child => {
//       if ((child as THREE.Mesh).isMesh) {
//         const mesh = child as THREE.Mesh;
//         mesh.castShadow = true;
//         mesh.receiveShadow = true;
//       }
//     });
    
//     // console.log('➡️ Tous les nodes :', nodes);
//   }, [nodes, scene]);

  return (
    <>
      <primitive object={scene} scale={0.01} position={[-1, 0, 2]} />
    </>
  );
}
