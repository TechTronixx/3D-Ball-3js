import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "/src/css/style.css";

// --Scene Setup--
const scene = new THREE.Scene();

// --Create Sphere--
const geometry = new THREE.SphereGeometry(2, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#ffb612",
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// --Sizing--
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// --Lights--
const light = new THREE.PointLight(0xffffff, 550, 100);
light.position.set(0, 10, 10);
light.intensity = 190;
scene.add(light);

// --Camera--
const camera = new THREE.PerspectiveCamera(
  40,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 13;
scene.add(camera);

// --Renderer--
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(2);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor("#000000");
renderer.render(scene, camera);

// --Control--
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;

// --Ball Rotate Speed--
controls.autoRotateSpeed = 5;

// --Resize--
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // Camera
  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  // Render
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

// Timeline Ball load animation
const tl = gsap.timeline({ defaults: { duration: 0.8 } });
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
tl.fromTo("nav", { y: "-100" }, { y: "0%" });

const tl_title = gsap.timeline({ defaults: { duration: 5 } });
tl_title.fromTo(".title", { opacity: 0 }, { opacity: 1 });

// ball Animation color change
let mousedown = false;
const rgb = [];

window.addEventListener("mousemove", (e) => {
  rgb.r = e.clientX / sizes.width;
  rgb.g = e.clientY / sizes.height;
  const newColor = new THREE.Color(rgb.r, rgb.g, rgb.b);
  gsap.to(mesh.material.color, newColor);
});
