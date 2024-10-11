const productos = [
    { id: 1, nombre: 'Pintura Blanca Premium', precio: 29.99, imagen: 'img/pintura-blanca.jpg' },
    { id: 2, nombre: 'Azul Océano Profundo', precio: 32.50, imagen: 'img/pintura-azul.jpg' },
    { id: 3, nombre: 'Rojo Pasión Intensa', precio: 31.75, imagen: 'img/pintura-roja.jpg' },
    { id: 4, nombre: 'Verde Naturaleza Viva', precio: 33.25, imagen: 'img/pintura-verde.jpg' },
    { id: 5, nombre: 'Amarillo Sol Radiante', precio: 30.50, imagen: 'img/pintura-amarilla.jpg' },
    { id: 6, nombre: 'Gris Elegancia Urbana', precio: 28.99, imagen: 'img/pintura-gris.jpg' },
    { id: 7, nombre: 'Púrpura Real', precio: 34.99, imagen: 'img/pintura-rosado.jpg' }
];

function mostrarProductos() {
    const contenedor = document.getElementById('productos-container');
    contenedor.innerHTML = ''; // Limpiamos el contenedor antes de agregar productos

    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.className = 'col-md-4 mb-4';
        productoElement.innerHTML = `
            <div class="card product-card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" onerror="this.src='img/imagen-no-disponible.jpg'">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
                    <button onclick="agregarAlCarrito(${producto.id})" class="btn btn-primary btn-sm">Agregar al carrito</button>
                    <button onclick="verDetalles(${producto.id})" class="btn btn-secondary btn-sm">Ver más detalles</button>
                </div>
            </div>
        `;
        contenedor.appendChild(productoElement);
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const itemExistente = carrito.find(item => item.id === id);
       
        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            carrito.push({...producto, cantidad: 1});
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito();
        mostrarNotificacion(`${producto.nombre} agregado al carrito`);
    }
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = carrito.reduce((total, item) => total + item.cantidad, 0);
    const carritoCount = document.getElementById('carritoCount');
    if (carritoCount) {
        carritoCount.textContent = contador;
    }
}

function mostrarNotificacion(mensaje) {
    // Asumiendo que estás usando SweetAlert2 para las notificaciones
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: mensaje,
        showConfirmButton: false,
        timer: 3000
    });
}

function verDetalles(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        // Aquí puedes implementar la lógica para mostrar más detalles
        // Por ejemplo, abrir un modal con información detallada del producto
        Swal.fire({
            title: producto.nombre,
            text: `Precio: $${producto.precio.toFixed(2)}`,
            imageUrl: producto.imagen,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: producto.nombre,
            confirmButtonText: 'Cerrar'
        });
    }
}

// Llamamos a la función para mostrar los productos cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    actualizarContadorCarrito();
});