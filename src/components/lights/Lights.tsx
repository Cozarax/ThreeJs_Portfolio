import RectAreaLight from './RectAreaLight';
import DirectionalLight from './DirectionnalLight';

const Lights = () => {
  return (
    <>
      <RectAreaLight
        color={0x648145}
        intensity={60}
        width={1.7}
        height={1.2}
        position={[0, 0.06, 0.86]}
        // helper
      />
      <ambientLight intensity={0.50} />
      {/* <pointLight
        position={[1.04, -0.1, 0.79]}
        intensity={0.3}
        distance={1.5}
        decay={1}
        color="#00ffff"
      /> */}
      <DirectionalLight color={0x0089ba}  intensity={ 5 } position={[-10, 5, -5]} />

    </>
  );
};

export default Lights;
