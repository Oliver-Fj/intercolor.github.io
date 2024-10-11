function cargarCarrito() {
    console.log("Función cargarCarrito() iniciada");
    const carritoContainer = document.getElementById('carrito-container');
    const carritoTotal = document.getElementById('carrito-total');
    
    if (!carritoContainer) {
        console.error("Elemento 'carrito-container' no encontrado");
        return;
    }
    
    if (!carritoTotal) {
        console.error("Elemento 'carrito-total' no encontrado");
        return;
    }

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    console.log("Contenido del carrito:", carrito);

    if (carrito.length === 0) {
        console.log("El carrito está vacío");
        carritoContainer.innerHTML = '<p class="text-center neon-text">Tu carrito está vacío</p>';
        carritoTotal.textContent = '0.00';
        return;
    }

    let total = 0;
    let carritoHTML = '';

    carrito.forEach(item => {
        console.log("Procesando item:", item);
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        carritoHTML += `
            <div class="col-md-6 mb-4">
                <div class="card product-card">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${item.imagen}" class="img-fluid rounded-start" alt="${item.nombre}" style="height: 100%; object-fit: cover;">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title neon-text">${item.nombre}</h5>
                                <p class="card-text">Precio: $${item.precio.toFixed(2)}</p>
                                <p class="card-text">Cantidad: 
                                    <button class="btn btn-sm btn-secondary neon-btn" onclick="cambiarCantidad(${item.id}, -1)">-</button>
                                    <span id="cantidad-${item.id}">${item.cantidad}</span>
                                    <button class="btn btn-sm btn-secondary neon-btn" onclick="cambiarCantidad(${item.id}, 1)">+</button>
                                </p>
                                <p class="card-text">Subtotal: $${subtotal.toFixed(2)}</p>
                                <button class="btn btn-danger btn-sm neon-btn" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    carritoHTML += '</div>';

    console.log("HTML generado:", carritoHTML);
    carritoContainer.innerHTML = carritoHTML;
    carritoTotal.textContent = total.toFixed(2);
    console.log("Total del carrito:", total);
}

function cambiarCantidad(id, cambio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const itemIndex = carrito.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
        carrito[itemIndex].cantidad += cambio;
        if (carrito[itemIndex].cantidad < 1) {
            carrito.splice(itemIndex, 1);
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarCarrito();
        actualizarContadorCarrito();
    }
}

function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
    actualizarContadorCarrito();
    mostrarNotificacion('Producto eliminado del carrito');
}

function mostrarNotificacion(mensaje) {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: mensaje,
        showConfirmButton: false,
        timer: 3000
    });
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = carrito.reduce((total, item) => total + item.cantidad, 0);
    const carritoCount = document.getElementById('carritoCount');
    if (carritoCount) {
        carritoCount.textContent = contador;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente cargado");
    cargarCarrito();
    
    const btnComprar = document.getElementById('btn-comprar');
    if (btnComprar) {
        btnComprar.addEventListener('click', () => {
            Swal.fire({
                title: '¿Proceder al pago?',
                text: "Estás a punto de finalizar tu compra",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, comprar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Aquí iría la lógica de pago
                    Swal.fire(
                        '¡Compra realizada!',
                        'Gracias por tu compra.',
                        'success'
                    ).then(() => {
                        // Limpiar el carrito después de la compra
                        localStorage.removeItem('carrito');
                        cargarCarrito();
                        actualizarContadorCarrito();
                    });
                }
            });
        });
    }
});

// Llamada inicial para cargar el carrito
cargarCarrito();