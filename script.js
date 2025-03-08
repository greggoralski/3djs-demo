// import * as THREE from 'https://unpkg.com/three@0.138.0/build/three.module.js';
// import { GLTFLoader } from 'https://unpkg.com/three@0.138.0/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, model;

// Initialize Three.js Scene
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // Load 3D Model
    const loader = new GLTFLoader();
    loader.load('https://modelviewer.dev/shared-assets/models/Astronaut.glb', (gltf) => {
        model = gltf.scene;
        model.scale.set(1.5, 1.5, 1.5);
        scene.add(model);
        animate();
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function updateModelRotation() {
    if (model) {
        const scrollY = window.scrollY;
        model.rotation.y = scrollY * 0.002; // Rotate based on scroll
        model.rotation.x = Math.sin(scrollY * 0.001) * 0.5; // Slight tilt
    }
}

window.addEventListener('scroll', updateModelRotation);
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();