document.addEventListener("DOMContentLoaded", function () {
    actualizarListaDeseosUI();
});

function agregarAListaDeseos(productoId) {
    let listaDeseos = JSON.parse(localStorage.getItem('listaDeseos')) || [];
    if (!listaDeseos.includes(productoId)) {
        listaDeseos.push(productoId);
        localStorage.setItem('listaDeseos', JSON.stringify(listaDeseos));
        actualizarListaDeseosUI();
    }
}

function mostrarListaDeseos() {
    document.getElementById('lista-deseos-container').style.display = 'block';
}

function cerrarListaDeseos() {
    document.getElementById('lista-deseos-container').style.display = 'none';
}

function eliminarDeListaDeseos(productoId) {
    let listaDeseos = JSON.parse(localStorage.getItem('listaDeseos')) || [];
    listaDeseos = listaDeseos.filter(id => id !== productoId);
    localStorage.setItem('listaDeseos', JSON.stringify(listaDeseos));
    actualizarListaDeseosUI();
}

function actualizarListaDeseosUI() {
    let listaDeseos = JSON.parse(localStorage.getItem('listaDeseos')) || [];
    let contenedor = document.getElementById('lista-deseos-productos');
    contenedor.innerHTML = ''; // Limpiar el contenedor
    listaDeseos.forEach(productoId => {
        // Asumiendo que tienes una función que puede buscar un producto por ID
        let producto = buscarProductoPorId(productoId);
        if (producto) {
            contenedor.innerHTML += `<div>
                <h4>${producto.nombre}</h4>
                <p>${producto.descripcion}</p>
                <button onclick="eliminarDeListaDeseos('${productoId}')">Eliminar</button>
            </div>`;
        }
    });
}

function buscarProductoPorId(id) {
    // Esta función debería buscar el producto en tu array de productos
    return productos.find(p => p.id === id);
}



