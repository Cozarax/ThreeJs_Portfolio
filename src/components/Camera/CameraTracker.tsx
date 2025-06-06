import { Html } from '@react-three/drei';
import { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';


export default function CameraTrackerOverlay() {
  const { camera } = useThree();
  const ref = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.innerText =
        `📍 Pos: (${camera.position.x.toFixed(3)}, ${camera.position.y.toFixed(3)}, ${camera.position.z.toFixed(3)})\n` +
        `🎯 Dir: (${camera.getWorldDirection(new THREE.Vector3()).toArray().map(n => n.toFixed(3)).join(', ')})`;
    }
  });

  return (
    <Html position={[1, 2, 0]} transform occlude>
      <div
        ref={ref}
        style={{
          color: '#00FF88',
          fontFamily: 'monospace',
          background: 'rgba(0,0,0,0.7)',
          padding: '0.5em',
          fontSize: '0.4em',
          whiteSpace: 'pre'
        }}
      />
    </Html>
  );
}
