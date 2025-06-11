
export default function Earth() {

return (
    <mesh position={[-2, 2, 2]}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.6}
            roughness={0}
            transmission={1}
            thickness={0.5}
            emissive="#00ffff"
            emissiveIntensity={0.05}
          />
        </mesh>
)
}

