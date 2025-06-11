import React, { useMemo, useRef, useEffect } from 'react';
// import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import ISSMarker from './IssMarker.tsx';
import latLngToVector3 from './ProjectionFunction.tsx';

interface GlobeProps {
  position?: [number, number, number];
  autoRotate?: boolean;
}
const GlobeWithISS: React.FC<GlobeProps> = ({ position = [0, 0, 0] }) => {
  const globe = useMemo(() => new ThreeGlobe({ animateIn: false }), []);
  const scaleFactor = 1 / globe.getGlobeRadius();
  const groupRef = useRef<THREE.Group>(null!);

  const earthMaterial =  new THREE.ShaderMaterial({
    
  })

  const textureLoader = new THREE.TextureLoader();
  const earthDayTexture = textureLoader.load('/img/2k_earth_daymap.jpg');
  earthDayTexture.colorSpace = THREE.SRGBColorSpace;
  const earthNightTexture = textureLoader.load('/img/2k_earth_nightmap.jpg');
  earthNightTexture.colorSpace = THREE.SRGBColorSpace;
  const specularCloudsTexture = textureLoader.load('/img/specularClouds.jpg');
  

  useEffect(() => {
    const globeMat = new THREE.MeshStandardMaterial({
      color: 'red',
      transparent: true,
      opacity: 0.8,
      roughness: 1,
      metalness: 0.1,
      depthWrite: false
    });

    globe
      // .globeImageUrl('/img/1700.jpg')
      .globeMaterial(globeMat)
      .showAtmosphere(true)
      .atmosphereAltitude(0.2)
      .polygonCapColor(() => 'rgba(233, 18, 18, 0)')
      .polygonCapColor(() => '')
      .polygonStrokeColor(() => 'rgb(147, 63, 168)')
      .polygonSideColor(() => '')
      .polygonAltitude(0.007)
      .polygonsTransitionDuration(0);

    fetch('/data/custom.geo.json')
      .then(res => res.json())
      .then(json => globe.polygonsData(json.features))
      .catch(err => console.error(err));

    const globeRadius = 100;

    const parisCoords = latLngToVector3({ lat: 48.8566, lng: 2.3522 }, globeRadius + 5);

    // petit mesh, à la bonne échelle
    const parisMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({ color: 'green' })
    );

    parisMesh.position.copy(parisCoords);
    globe.add(parisMesh);
  }, [globe, scaleFactor]);

  return (
    <group ref={groupRef} position={position} scale={[scaleFactor, scaleFactor, scaleFactor]}>
      <primitive object={globe} />

      <ISSMarker
        globeRadius={100} // after scaling, radius === 1
        altitude={15} // 15% above surface
      />
    </group>
  );
};

export default GlobeWithISS;
