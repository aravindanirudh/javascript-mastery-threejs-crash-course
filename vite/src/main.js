import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const canvas = document.getElementById('canvas'); // Get the canvas element from the DOM to use as the rendering surface for Three.js

// List of steps
// 1. Create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#FFFFFF"); // Set the background color of the scene to white

// 2. Add a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
); // Parameters: FOV, aspect ratio, near clipping plane, far clipping plane
camera.position.z = 5; // Move the camera away from the origin along the z-axis

// 3. Create objects
const geometry = new THREE.DodecahedronGeometry(); // width, height, depth
const material = new THREE.MeshLambertMaterial({
  color: "#468585",
  emissive: "#468585",
}); // MeshLambertMaterial is a material that reacts to lighting and has a matte finish, making it suitable for objects that should not appear shiny or reflective
const dodecahedron = new THREE.Mesh(geometry, material); // Create a mesh by combining the geometry and material, which can then be added to the scene

const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2); // width, height, depth
const boxMaterial = new THREE.MeshStandardMaterial({
  color: "#B4B4B3",
  emissive: "#B4B4B3",
}); // MeshStandardMaterial is a physically-based material that provides more realistic rendering by simulating how light interacts with surfaces, making it suitable for objects that should have a more natural appearance with accurate reflections and shading
const box = new THREE.Mesh(boxGeometry, boxMaterial); // Create a mesh by combining the geometry and material, which can then be added to the scene
box.position.y = -1.5; // Move the box down along the y-axis

// Add the objects to the scene
scene.add(dodecahedron);
scene.add(box);

// 4. Add lighting
const light = new THREE.SpotLight(0x006769, 100); // Parameters: color, intensity
light.position.set(1, 1, 1); // Set the position of the light source (x, y, z)
scene.add(light);

// 5. Set up the renderer and add it to the DOM
const renderer = new THREE.WebGLRenderer({ canvas }); // Enable antialiasing for smoother edges
renderer.setSize(window.innerWidth, window.innerHeight); // Set the size of the rendering area to fill the window
renderer.setPixelRatio(window.devicePixelRatio); // Set the pixel ratio for better rendering on high-DPI devices and on mobile devices

// 6. Add OrbitControls for interactivity
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping (inertia) for smoother controls
controls.dampingFactor = 0.05; // Set the damping factor (how much inertia to apply)
controls.enableZoom = true; // Enable zooming in and out
controls.enablePan = true; // Enable panning (moving the camera left/right/up/down)

// 7. Add an animation loop to continuously render the scene
function animate() {
  requestAnimationFrame(animate); // Request the next frame to be rendered

  // Rotate the dodecahedron for some animation
  dodecahedron.rotation.x += 0.01; // Rotate around the x-axis
  dodecahedron.rotation.y += 0.01; // Rotate around the y-axis

  box.rotation.y += 0.005; // Rotate the box around the y-axis
  controls.update(); // Update the controls (required if enableDamping is true)

  renderer.render(scene, camera); // Render the scene from the perspective of the camera
}

animate(); // Start the animation loop

// 8. Handle window resizing to maintain the aspect ratio and update the renderer size
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight; // Update the camera's aspect ratio
  camera.updateProjectionMatrix(); // Update the camera's projection matrix with the new aspect ratio
  renderer.setSize(window.innerWidth, window.innerHeight); // Update the renderer size to fill the new window dimensions
});