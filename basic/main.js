import * as THREE from "three";

// List of steps to create a three.js app

// 1. Create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#FFFFFF");

// 2. Add a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
); // FOV, aspect ratio, near and far clipping planes
camera.position.z = 5; // Move the camera away from the origin along the z-axis

// 3. Create and add a cube object
const geometry = new THREE.BoxGeometry(1, 1, 1); // width, height, depth
const material = new THREE.MeshLambertMaterial({
  color: "#468585",
  emissive: "#468585",
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 4. Add lighting
const light = new THREE.DirectionalLight(0x9cdba6, 10); // color, intensity
light.position.set(1, 1, 1); // Set the position of the light source (x, y, z)
scene.add(light);

// 5. Set up the renderer and add it to the DOM
const renderer = new THREE.WebGLRenderer({ antialias: true }); // Enable antialiasing for smoother edges
renderer.setSize(window.innerWidth, window.innerHeight); // Set the size of the rendering area to fill the window
document.body.appendChild(renderer.domElement); // Append the renderer's canvas element to the document body

// 6. Animate the scene
function animate() {
  requestAnimationFrame(animate); // Request the next frame to be rendered

  cube.rotation.x += 0.01; // Rotate the cube around the x-axis
  cube.rotation.y += 0.01; // Rotate the cube around the y-axis

  renderer.render(scene, camera); // Render the scene from the perspective of the camera
}

animate(); // Start the animation loop