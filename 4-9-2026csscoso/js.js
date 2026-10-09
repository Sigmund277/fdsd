import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



// Lista de productos del catálogo (se mapean por ID)
const productos = [
    { id: 1, nombre: "NVIDIA GEFORCE RTX 4060", precio: 595000, imagen: "images/rtx-4060-8gb.jpg" },
    { id: 2, nombre: "AMD RYZEN 5 5600G", precio: 350000, imagen: "images/5600g.png" },
    { id: 3, nombre: "MEMORIA 32GB DDR4", precio: 60000, imagen: "images/32gbddr4adataxpg3200mts.png" },
    { id: 4, nombre: "GABINETE THERMALTAKE", precio: 600000, imagen: "images/thermaltakethetower300.png" },
    { id: 5, nombre: "FUENTE ASUS ROG STRIX", precio: 450000, imagen: "images/fuenteasusrogstrix1200wplatinum.png" },
    { id: 6, nombre: "MOTHERBOARD ASUS ROG STRIX X870F", precio: 680000, imagen: "images/motherboardasusrogstrixx870f.png" },
    { id: 7, nombre: "MOUSE GAMER LOGITECH G203", precio: 20000, imagen: "images/g203.png" },
    { id: 8, nombre: "TECLADO REDRAGON K552", precio: 40000, imagen: "images/redragonkumarak552.png" }
];

// ... la función fome para agregar cosas al carrito, requiere de un onclick=("agregarAlCarrito(idProducto)") en cada botoncito de añadir al
function agregarAlCarrito(idProducto) {
    // 1. Obtenemos el carrito actual de localStorage o creamos uno vacío []
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // como 2do paso toca ver si el producto ya está en el carrito
    let productoExistente = carrito.find(item => item.id === idProducto);

    if (productoExistente) {
        // creo q esto ya se explica solo
        productoExistente.cantidad += 1;
    } else {
        // Si no está, lo agregamos con cantidad 1
        carrito.push({ id: idProducto, cantidad: 1 });
    }

    // 3. Guardamos el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert("¡Producto agregado al carrito de Princesa PC!");
}


document.addEventListener("DOMContentLoaded", renderizarCarrito);






function renderizarCarrito(){
    const contenedor = document.getElementById('lista-carrito');
    const totalElemento = document.getElementById('precio-total');

    if(!contenedor) return;
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    contenedor.innerHTML = '';
    let totalAcumulado = 0;

    if(carrito.length === 0){
        contenedor.innerHTML = "<p>El gordicarrito está vacío, andá a nuestro catálogo y comprate algunas cositas sabrosonas</p>";
        totalElemento.innerText = '0';
        return;
    }

    carrito.forEach(item => {
        const productoInfo = productos.find(p => p.id === item.id); // básicamente busca el numerito q le des desde la función y se lo pasa al .find

        if(productoInfo){
            const subtotal = productoInfo.precio * item.cantidad;
            totalAcumulado += subtotal;
            contenedor.innerHTML += `
                <div class="item-carrito" style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px; border-bottom: 1px solid #e97be0; padding-bottom: 10px; padding: 20px; background: var(--color2); border-radius: 40px; color: var(--color8);">
                    <img src="${productoInfo.imagen}" width="60" style="border-radius: 10px;">
                    <div>
                        <h4>${productoInfo.nombre}</h4>
                        <p>Precio unitario: $${productoInfo.precio}</p>
                    </div>
                    <div>
                        <button onclick="cambiarCantidad(${item.id}, -1)" style="border: 1px solid var(--color5); padding: 10px; border-radius: 20px; margin: 10px; color: var(--color5); background-color: var(--color2); font-size: 16px; font-weight: bold; cursor: pointer;"> - </button>
                        <span style="color: var(--color7); font-weight: bold;">${item.cantidad}</span>
                        <button onclick="cambiarCantidad(${item.id}, 1)" style="border: 1px solid var(--color5); padding: 10px; border-radius: 20px; margin: 10px; color: var(--color5); background-color: var(--color2); font-size: 16px; font-weight: bold; cursor: pointer;"> + </button>
                    </div>
                    <p>Subtotal: <span style="font-size: 20px;"> <strong>$${subtotal.toLocaleString('es-AR')}</strong> </span></p>
                    <button onclick="eliminarProducto(${item.id})" style="border: 1px solid var(--color5); padding: 10px; border-radius: 20px; margin-left: auto; color: var(--color5); background-color: var(--color2); font-size: 16px; font-weight: bold; cursor: pointer;">Eliminar</button>
                </div>
            `;
        }
    });
    totalElemento.innerText = totalAcumulado.toLocaleString('es-AR');
}


// esta cosa q sepa la bola cómo funca suma o resta la cantidad de cosas q se compran
function cambiarCantidad(id, cambio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let producto = carrito.find(item => item.id === id);

    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad <= 0) {
            // básicamente para petatear esta cosa si es 0
            carrito = carrito.filter(item => item.id !== id);
        }
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito(); // literalmente lo q dice, aunq no tan literal pq lo pongo para q se actualice cada q se cambia la cantidad
}

// esta cosa para eliminar un producto, usa la misma lógica casi q cuando hay 0 items en cambiar cantidad
function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

// para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito'); //directamente petatea todo el json
    renderizarCarrito();
}




// ==========================================
// 🐀 RATITA 3D
// ==========================================

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
// 💡 LUCES
// ==========================================

const luzPrincipal = new THREE.DirectionalLight(0xffffff, 3);
luzPrincipal.position.set(2, 3, 4);
scene.add(luzPrincipal);

const luzSuave = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(luzSuave);


// ==========================================
// 🐀 CARGAR RATITA
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