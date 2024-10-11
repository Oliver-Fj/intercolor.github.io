// Inicialización de variables
let carrito = [];
let usuario = null;

// Funciones de utilidad
function mostrarNotificacion(mensaje, tipo = 'success') {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: tipo,
        title: mensaje,
        showConfirmButton: false,
        timer: 3000
    });
}

// Manejo del carrito
function agregarAlCarrito(producto) {
    const itemExistente = carrito.find(item => item.id === producto.id);
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }
    actualizarCarrito();
    mostrarNotificacion(`${producto.nombre} agregado al carrito`);
}

function actualizarCarrito() {
    const carritoCount = document.getElementById('carritoCount');
    const carritoItems = document.getElementById('carritoItems');
    const carritoTotal = document.getElementById('carritoTotal');

    carritoCount.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);

    if (carritoItems) {
        carritoItems.innerHTML = carrito.map(item => `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span>${item.nombre} x ${item.cantidad}</span>
                <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
            </div>
        `).join('');
    }

    if (carritoTotal) {
        carritoTotal.textContent = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0).toFixed(2);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const carritoBtn = document.getElementById('carritoBtn');
    if (carritoBtn) {
        carritoBtn.addEventListener('click', () => {
            const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));
            carritoModal.show();
        });
    }

    const comprarBtn = document.getElementById('comprarBtn');
    if (comprarBtn) {
        comprarBtn.addEventListener('click', () => {
            if (carrito.length === 0) {
                mostrarNotificacion('El carrito está vacío', 'error');
            } else if (!usuario) {
                mostrarNotificacion('Por favor, inicia sesión para comprar', 'warning');
            } else {
                Swal.fire({
                    title: '¡Compra realizada!',
                    text: 'Gracias por tu compra',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                carrito = [];
                actualizarCarrito();
            }
        });
    }

    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Aquí normalmente harías una llamada a un servidor para autenticar
            if (username === 'usuario' && password === 'contraseña') {
                usuario = { nombre: username };
                mostrarNotificacion('Sesión iniciada correctamente');
                loginBtn.textContent = `Hola, ${username}`;
                bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
            } else {
                mostrarNotificacion('Credenciales incorrectas', 'error');
            }
        });
    }
});

// Función para simular la adición de productos (para pruebas)
window.agregarProductoPrueba = function() {
    agregarAlCarrito({id: Date.now(), nombre: 'Producto de prueba', precio: 19.99});
}

function actualizarCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const itemExistente = carrito.find(item => item.id === producto.id);
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = carrito.reduce((total, item) => total + item.cantidad, 0);
    const carritoCount = document.getElementById('carritoCount');
    if (carritoCount) {
        carritoCount.textContent = contador;
    }
}

// Asegúrate de que esta función se llame cuando se carga la página
document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);