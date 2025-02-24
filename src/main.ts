import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './main.css';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);

type CarDimensions = {
  length: number;
  width: number;
  height: number;
};

function generateCarCube(
  dimensions: CarDimensions,
  color: THREE.ColorRepresentation,
) {
  const geometry = new THREE.BoxGeometry(
    dimensions.length,
    dimensions.width,
    dimensions.height,
  );
  geometry.translate(
    dimensions.length / 2,
    dimensions.width / 2,
    dimensions.height / 2,
  );
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.25,
  });

  const edges = new THREE.EdgesGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x009900 });
  const wireframe = new THREE.LineSegments(edges, lineMaterial);

  const cube = new THREE.Mesh(geometry, material);
  cube.add(wireframe);
  return cube;
}

const HYUNDAI_HB20_HATCHBACK_2020_DIMENSIONS: CarDimensions = {
  length: 3.94,
  width: 1.72,
  height: 1.47,
};

scene.add(generateCarCube(HYUNDAI_HB20_HATCHBACK_2020_DIMENSIONS, 0x009900));

const RENAULT_KARDIAN_2025_DIMENSIONS = {
  length: 4.119,
  width: 1.747,
  height: 1.544,
};

scene.add(generateCarCube(RENAULT_KARDIAN_2025_DIMENSIONS, 0x000099));

camera.position.x = 0.5;
camera.position.y = 0.5;
camera.position.z = 10;

scene.add(new THREE.AxesHelper(10));

const geometryPlane = new THREE.PlaneGeometry(5, 5);
const materialPlane = new THREE.MeshBasicMaterial({ color: 0xffffff });
const plane = new THREE.Mesh(geometryPlane, materialPlane);
plane.position.set(2.5, 2.5, 0);
scene.add(plane);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// controls
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('wheel', (event) => {
  const delta = event.deltaY < 0 ? -0.1 : 0.1;
  camera.position.x += (delta * camera.position.x) / camera.position.z;
  camera.position.y += (delta * camera.position.y) / camera.position.z;
  camera.position.z += delta;
});

// REPLACED WITH ORBIT CONTROLS
// window.addEventListener('mousedown', (event) => {
//   const isAltKeyPressed = event.altKey;

//   const moveHandler = (event: MouseEvent) => {
//     const deltaX = event.movementX;
//     const deltaY = event.movementY;

//     if (isAltKeyPressed) {
//       camera.rotation.x -= deltaY / 600;
//       camera.rotation.y -= deltaX / 600;
//     } else {
//       camera.position.x -= deltaX / 300;
//       camera.position.y += deltaY / 300;
//     }
//   };

//   window.addEventListener('mousemove', moveHandler);

//   window.addEventListener('mouseup', () =>
//     window.removeEventListener('mousemove', moveHandler),
//   );
// });
