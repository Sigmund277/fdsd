

window.agregarAlCarrito = agregarAlCarrito;
window.cambiarCantidad = cambiarCantidad;
window.eliminarProducto = eliminarProducto;
window.vaciarCarrito = vaciarCarrito;

// lista de productos del catálogo (se mapean por ID)
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

// ... la función sepalabola para agregar cosas al carrito, requiere de un onclick=("agregarAlCarrito(idProducto)") en cada botoncito de añadir al
function agregarAlCarrito(idProducto) {
    // 1. Obtenemos el carrito actual de localStorage o creamos uno vacío []
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // como 2do paso toca ver si el producto ya está en el carrito
    let productoExistente = carrito.find(item => item.id === idProducto);

    if (productoExistente) {
        // creo q esto ya se explica solo
        productoExistente.cantidad += 1;
    } else {
        // si no está, lo agregamos con cantidad 1
        carrito.push({ id: idProducto, cantidad: 1 });
    }

    // para guardar gordicarrito brr actualizado en localStorage
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




