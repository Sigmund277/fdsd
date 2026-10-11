import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// esta cosa para la rata 3d en .glb

const canvas = document.getElementById("ratita-canvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    35,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
);

camera.position.set(0, 1.0, 4);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);


// ==========================================
// las luces
// ==========================================

const luzPrincipal = new THREE.DirectionalLight(0xffffff, 3);
luzPrincipal.position.set(2, 10, 4);
scene.add(luzPrincipal);

const luzSuave = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(luzSuave);


// ==========================================
// para cargar a la rata
// ==========================================

const loader = new GLTFLoader();

let ratita;
let mixer;
let acciones = {};

loader.load(
    "images/ratita.glb",

    (gltf) => {

        // Agregar modelo a la escena
        ratita = gltf.scene;
        scene.add(ratita);

        // Crear sistema de animaciones
        mixer = new THREE.AnimationMixer(ratita);

        // Guardar todas las animaciones
        gltf.animations.forEach((clip) => {
            console.log("Animación encontrada:", clip.name);
            acciones[clip.name] = mixer.clipAction(clip);
        });


        // ==========================================
        // 🔄 CUANDO TERMINA EL SALTO → VOLVER AL IDLE
        // ==========================================

        mixer.addEventListener("finished", (evento) => {

            if (evento.action === acciones["rig|run cycle"]) {

                if (acciones["rig|idol animtion"]) {

                    acciones["rig|idol animtion"]
                        .reset()
                        .play();

                }

            }

        });


        // ==========================================
        // 💤 ANIMACIÓN IDLE
        // ==========================================

        if (acciones["rig|idol animtion"]) {
            acciones["rig|idol animtion"].play();
        }


        console.log("🐀 Ratita cargada correctamente");

    },

    undefined,

    (error) => {
        console.error("❌ Error cargando la ratita:", error);
    }
);


// ==========================================
// 🖱️ CLICK = SALTO
// ==========================================

canvas.addEventListener("click", () => {

    // Comprobar que existe el salto
    if (!acciones["rig|run cycle"]) {
        console.warn("No encontré la animación rig|run cycle");
        return;
    }


    // Detener idle
    if (acciones["rig|idol animtion"]) {
        acciones["rig|idol animtion"].stop();
    }


    // Preparar salto
    const clickanim = acciones["rig|run cycle"];

    clickanim.reset();

    clickanim.setLoop(THREE.LoopOnce);

    // No quedarse congelada al terminar
    clickanim.clampWhenFinished = false;

    clickanim.play();

});


// ==========================================
// 🎬 ANIMACIÓN GENERAL
// ==========================================

const reloj = new THREE.Clock();

function animar() {

    requestAnimationFrame(animar);

    const delta = reloj.getDelta();

    if (mixer) {
        mixer.update(delta);
    }

    renderer.render(scene, camera);

}

animar();


// ==========================================
// 📐 RESIZE
// ==========================================

window.addEventListener("resize", () => {

    const ancho = canvas.clientWidth;
    const alto = canvas.clientHeight;

    camera.aspect = ancho / alto;

    camera.updateProjectionMatrix();

    renderer.setSize(ancho, alto, false);

});






