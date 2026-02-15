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
    // The Canvas component is the main container for our 3D scene. It sets up the rendering context and allows us to define our 3D objects and lights within it. The style prop is used to make the canvas take up the full viewport and center its contents
    <Canvas style={{ height: '100vh', width: '100vw', display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/* OrbitControls is a component that allows us to interact with the 3D scene using mouse controls. It enables zooming, panning, and rotating the view of the scene, making it easier to explore the 3D objects from different angles */}
      <OrbitControls enableZoom enablePan enableRotate />
      {/* The directionalLight component adds a light source to the scene. It simulates light coming from a specific direction, which helps to illuminate the objects in the scene and create shadows. The position prop defines where the light is coming from, intensity controls how bright the light is, and color sets the color of the light */}
      <directionalLight position={[1, 1, 1]} intensity={10} color={0x9CDBA6} />
      {/* The color component is used to set the background color of the canvas. In this case, it's set to a light gray color (#F0F0F0), which provides a neutral backdrop for the 3D objects in the scene */}
      <color attach="background" args={['#F0F0F0']} />
      {/* The RotatingCube component is a custom component that we defined earlier. It creates a spinning cube using a mesh with a cylinder geometry and a lambert material. The useFrame hook is used to update the rotation of the cube on every frame, creating the spinning effect. The Sparkles component adds a sparkling effect around the cube, enhancing the visual appeal of the scene */}
      <RotatingCube />
    </Canvas>
  )
}

export default App