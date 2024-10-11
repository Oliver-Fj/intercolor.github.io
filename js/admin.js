function mostrarInventario() {
    const contenedor = document.getElementById('inventario-container');
    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.className = 'producto';
        productoElement.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="editarProducto(${producto.id})">Editar</button>
            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
        `;
        contenedor.appendChild(productoElement);
    });
}

function editarProducto(id) {
    const producto = productos.find(p => p.id === id);
    const nuevoNombre = prompt('Nuevo nombre:', producto.nombre);
    const nuevoPrecio = prompt('Nuevo precio:', producto.precio);

    if (nuevoNombre && nuevoPrecio) {
        producto.nombre = nuevoNombre;
        producto.precio = parseFloat(nuevoPrecio);
        mostrarInventario();
    }
}

function eliminarProducto(id) {
    const index = productos.findIndex(p => p.id === id);
    if (index !== -1) {
        productos.splice(index, 1);
        mostrarInventario();
    }
}

function agregarProducto() {
    const nombre = prompt('Nombre del nuevo producto:');
    const precio = prompt('Precio del nuevo producto:');

    if (nombre && precio) {
        const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
        productos.push({ id: nuevoId, nombre, precio: parseFloat(precio) });
        mostrarInventario();
    }
}

// Llamar a esta función cuando se cargue la página de administración
document.addEventListener('DOMContentLoaded', () => {
    mostrarInventario();
    document.getElementById('agregarProductoBtn').addEventListener('click', agregarProducto);
});