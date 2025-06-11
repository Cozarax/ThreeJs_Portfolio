import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Text from './components/Text3D.tsx';
import Lights from './components/lights/Lights.tsx';
import CrtIndex from './components/CrtMonitor/Index.tsx';
import CameraTrackerOverlay from './components/Camera/CameraTracker.tsx';
// import DeviceSite from './components/importLucas.tsx';
// import IssTracker from './components/IssTracker/index.tsx';
import  GlobeWithISS  from './components/IssTracker/index.tsx';
// import GlobeDisplay from './components/IssTracker/r3fGlobe.jsx';
// import GlobeOnly from './components/IssTracker/GlobeOnly.jsx';

const Ground = () => {
  return (
    <mesh position={[0.3, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="rgb(41, 28, 40)" />
    </mesh>
  );
};

function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{
          position: [-0.263, 0.891, 6],

          fov: 50
        }}
        onCreated={({ camera, scene }) => {
          scene.fog = new THREE.Fog('black', 1, 100);
          camera.lookAt(0, 0, 0);
        }}
      >
        <color attach="background" args={['black']} />
        <CameraTrackerOverlay />
        <mesh castShadow receiveShadow position={[0, -1.39, 0.41]}>
          <boxGeometry args={[10, 0.3, 5]} />
          <meshStandardMaterial color="white" metalness={0.3} roughness={0.7} />
        </mesh>
        <Lights />
        {/* <DeviceSite/> */}
        <CrtIndex />
        <Text />
        <Ground />
        {/* <IssTracker/> */}
        <GlobeWithISS
        position={[-10, 0.5, 0]}
        />
        {/* <GlobeOnly /> */}
        {/* <Earth /> */}
        <OrbitControls
          target={[-10, 0.5, 0]}
          makeDefault
          enableDamping
          dampingFactor={0.1}
          rotateSpeed={0.5}
          enablePan={true}
          enableZoom={true}
        />
      </Canvas>
    </>
  );
}

export default App;
