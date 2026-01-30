import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

/* -------------------- */
/* Initial Setup */
/* -------------------- */

const container = document.getElementById("container3D");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
camera.position.set(0, 1.6, 3);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
container.appendChild(renderer.domElement);

// Resize Handling
function resizeRenderer() {
  const w = container.clientWidth;
  const h = container.clientHeight;

  if (!w || !h) return;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

requestAnimationFrame(resizeRenderer);
setTimeout(resizeRenderer, 50);

const resizeObserver = new ResizeObserver(resizeRenderer);
resizeObserver.observe(container);

//Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = true;
controls.enableRotate = true;
controls.enablePan = true;

// container.addEventListener("mouseenter", () => {
//   controls.enableZoom = true;
//   controls.enableRotate = true;
//   container.style.cursor = "grab";
// });

// container.addEventListener("mouseleave", () => {
//   controls.enableZoom = false;
//   controls.enableRotate = false;
//   container.style.cursor = "default";
// });

// container.addEventListener("mousedown", () => {
//   container.style.cursor = "grabbing";
// });

// container.addEventListener(
//   "touchstart",
//   () => {
//     controls.enableZoom = true;
//     controls.enableRotate = true;
//   },
//   { passive: true }
// );

// container.addEventListener("touchend", () => {
//   setTimeout(() => {
//     controls.enableZoom = false;
//     controls.enableRotate = false;
//   }, 1200);
// });

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(5, 10, 5);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
fillLight.position.set(-5, 3, -5);
scene.add(fillLight);

// Loading the Model
const loader = new GLTFLoader();
let currentModel = null;

const MODEL_FRAMING = {
  "../../models/normal_tube/scene.glb": {
    targetOffset: { x: 0.01, y: 0.15, z: 0 },
    cameraOffset: { x: 0.35, y: 0.15, z: 0.05 },
  },

  "../../models/spooky_tube/scene.glb": {
    targetOffset: { x: 0.01, y: 0.15, z: 0 },
    cameraOffset: { x: -0.35, y: -0.15, z: 0.05 },
  },

  default: {
    targetOffset: { x: 0.01, y: 0.15, z: 0 },
    cameraOffset: { x: 0.35, y: 0.15, z: 0.05 },
  },
};

function frameModel(model, path) {
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  const framing = MODEL_FRAMING[path] || MODEL_FRAMING.default;

  controls.target.set(
    center.x + size.x * framing.targetOffset.x,
    center.y + size.y * framing.targetOffset.y,
    center.z + size.z * framing.targetOffset.z
  );

  camera.position.set(
    center.x + size.x * framing.cameraOffset.x,
    center.y + size.y * framing.cameraOffset.y,
    center.z + size.z * framing.cameraOffset.z
  );

  camera.lookAt(controls.target);
  controls.update();
}


function disposeModel(model) {
  model.traverse((child) => {
    if (child.isMesh) {
      child.geometry.dispose();
      if (Array.isArray(child.material)) {
        child.material.forEach((m) => m.dispose());
      } else {
        child.material.dispose();
      }
    }
  });
}

function loadModel(path) {
  if (currentModel) {
    scene.remove(currentModel);
    disposeModel(currentModel);
  }

  loader.load(path, (gltf) => {
    currentModel = gltf.scene;
    scene.add(currentModel);

    requestAnimationFrame(() => {
      frameModel(currentModel, path);
      resizeRenderer();
    });
  });
}


// Initial Model
loadModel("../../models/normal_tube/scene.glb");

// Render Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

// Button Hooks
window.switchModel = loadModel;
