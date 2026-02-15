import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sparkles } from '@react-three/drei'
import { useRef } from 'react';

const RotatingCube = () => {
  const meshRef = useRef(); // useRef is a hook that allows us to create a reference to the mesh, which we can then use to manipulate its properties (like rotation) in the useFrame hook. Without it, we wouldn't be able to access the mesh's rotation properties to create the spinning effect

  // useFrame is a hook that runs on every frame, allowing us to update the rotation of the cube
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  })

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1, 1, 1, 32]} />
      <meshLambertMaterial color="#468585" emissive="#468585" />
      <Sparkles
        count={100}
        size={6}
        scale={1}
        speed={0.002}
        noise={0.2}
        color="orange"
      />
    </mesh>
  );
}

const App = () => {
  return (
    <Canvas style={{ height: '100vh', width: '100vw', display: "flex", justifyContent: "center", alignItems: "center" }}>
      <OrbitControls enableZoom enablePan enableRotate />
      <directionalLight position={[1, 1, 1]} intensity={10} color={0x9CDBA6} />
      <color attach="background" args={['#F0F0F0']} />
      <RotatingCube />
      <Sparkles count={100} size={6} scale={1} speed={0.002} noise={0.2} color="orange" />
    </Canvas>
  )
}

export default App