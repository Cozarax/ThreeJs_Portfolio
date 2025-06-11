import React, { useEffect, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';

interface GlobeProps {
  position?: [number, number, number];
  autoRotate?: boolean;
}
// React component wrapping ThreeGlobe as a primitive
const Globe: React.FC<GlobeProps> = ({ position = [0, 0, 0], autoRotate = false  }) => {
  // Create the ThreeGlobe instance once
  const globe = useMemo(() => new ThreeGlobe({ animateIn: false }), []);
  

  // Compute scale factor so default radius (100) becomes 1
  const scaleFactor = useMemo(() => {
    const defaultRadius = globe.getGlobeRadius();
    return 1 / defaultRadius;
  }, [globe]);

  useEffect(() => {

    const globeMat = new THREE.MeshStandardMaterial({
      color: '#000022',
      transparent: true,   // active la transparence
      opacity: 0.5,        // 50% d’opacité
      roughness: 1,
      metalness: 0.1,
      depthWrite: false,   // pour laisser voir ce qui est derrière
    })
    // Configure globe material and colors
    globe
    .globeMaterial(globeMat)
      .polygonCapColor(() => 'rgba(233, 18, 18, 0)') // transparent fill
      .polygonStrokeColor(() => 'rgb(147, 63, 168)')
      .polygonSideColor(() => '')
      .showAtmosphere(true)
      .atmosphereAltitude(0.2)
      .polygonAltitude(0.007)
      .polygonsTransitionDuration(0);
    // Load GeoJSON and set polygon data
    fetch('/data/custom.geo.json')
      .then(res => res.json())
      .then(geojson => globe.polygonsData(geojson.features));

    // Define 'paris' inside useEffect to avoid dependency issues
    const paris = { lat: 48.8566, lng: 2.3522 };

    globe
      .pointsData([paris])
      .pointColor(() => 'cyan') // cylindre rouge
      .pointAltitude(() => 0.1) // hauteur = 0.1 * rayon du globe
      .pointRadius(() => 0.5) // rayon angulaire de 0.5°
      .pointResolution(16);
  }, [globe]);

  const [issPos, setIssPos] = useState<{ lat: number; lng: number } | null>(
    null
  )
  // 2) Récupérer la position de l'ISS toutes les 5 secondes
  useEffect(() => {
    const fetchIss = () => {
      fetch('https://api.wheretheiss.at/v1/satellites/25544')
        .then((res) => res.json())
        .then((data) => {
          setIssPos({ lat: data.latitude, lng: data.longitude })
        })
        .catch(console.warn)
    }

    fetchIss()
    const iv = setInterval(fetchIss, 5000)
    return () => clearInterval(iv)
  }, [])

  // 3) Mettre à jour les pointsData dès qu'on a une position
  useEffect(() => {
    if (!issPos) return
    globe
      .pointsData([issPos])
    
      .pointColor(() => 'cyan')
      .pointAltitude(() => 0.1)
      .pointRadius(() => 0.7)
      .pointResolution(16)
  }, [globe, issPos])


  // Auto-rotation
  useFrame(() => {
    if (autoRotate) {
      globe.rotation.y += 0.001;
    }
  });

  // Return the ThreeGlobe as a primitive so R3F handles adding/removing
  return (
    <primitive object={globe} scale={[scaleFactor, scaleFactor, scaleFactor]} position={position} />
  );
};

export default Globe;
