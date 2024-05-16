function cargarProductos() {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            var productList = document.getElementById("product-list");

            data.forEach(function(product) {
                var card = document.createElement("div");
                card.className = "product-card";

                var img = document.createElement("img");
                img.src = product.imagen;
                img.alt = product.nombre;

                var name = document.createElement("h3");
                name.textContent = product.nombre;

                var price = document.createElement("p");
                price.textContent = "Precio: " + product.precio;

                var desc = document.createElement("p");
                desc.textContent = product.descripcion;

                var buyBtn = document.createElement("a");
                buyBtn.textContent = "Ver detalles";
                buyBtn.href = "producto.html?id=" + encodeURIComponent(product.nombre);

                card.appendChild(img);
                card.appendChild(name);
                card.appendChild(price);
                card.appendChild(desc);
                card.appendChild(buyBtn);

                productList.appendChild(card);
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

cargarProductos();

// Obtener el parámetro de consulta de la URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productName = urlParams.get('id');

// Función para cargar los detalles del producto
function cargarDetallesProducto(productName) {
    // Hacer una solicitud para obtener los detalles del producto según el nombre
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            // Encontrar el producto por su nombre
            const product = data.find(item => item.nombre === productName);

            if (product) {
                // Mostrar los detalles del producto
                const productDetails = document.getElementById("product-details");
                productDetails.innerHTML = `
                    <h2>${product.nombre}</h2>
                    <img src="${product.imagen}" alt="${product.nombre}">
                    <p><strong>Precio:</strong> ${product.precio}</p>
                    <p><strong>Descripción:</strong> ${product.descripcion}</p>
                    <a href="javascript:history.back()" class="btn">Volver atrás</a>
                    <button onclick="agregarAListaDeseos('${product.nombre}')" class="btn btn-warning">Agregar a mi lista de deseos</button>
                `;
            } else {
                // Manejar el caso en el que el producto no se encuentra
                console.error('Producto no encontrado');
            }
        })
        .catch(error => console.error('Error al cargar los detalles del producto:', error));
}

function agregarAListaDeseos(productoId) {
    let listaDeseos = JSON.parse(localStorage.getItem('listaDeseos')) || [];
    if (!listaDeseos.includes(productoId)) {
        listaDeseos.push(productoId);
        localStorage.setItem('listaDeseos', JSON.stringify(listaDeseos));
        alert('Producto agregado a la lista de deseos!');
    } else {
        alert('Este producto ya está en tu lista de deseos.');
    }
}

// Llamar a la función para cargar los detalles del producto
cargarDetallesProducto(productName);

        // Función para generar el HTML de cada producto
        function generateProductHTML(product) {
            return `
            <div class="product-card">
                <div class="product-img">
                    <img src="${product.imagen}" alt="${product.nombre}">
                </div>
                <div class="product-info">
                    <h2>${product.nombre}</h2>
                    <p>${product.descripcion}</p>
                    <div class="product-footer">
                        <div class="product-price">${product.precio}</div>

                        <div class="product-btn" data-producto="${product.nombre}">
                        <button type="button" class="btn btn-primary" data-producto="${product.nombre}">
                        Ver detalles</button></div>


                    </div>
                </div>
            </div>
        `;
        }

        // Función para cargar los productos en la página
        function loadProducts() {
            const productContainer = document.getElementById("product-container");
            products.forEach(product => {
                const productHTML = generateProductHTML(product);
                productContainer.innerHTML += productHTML;
            });
        }

        // Cargar los productos cuando la página cargue
        window.onload = function () {
            loadProducts();

            // Agregar evento de clic a los botones "Ver detalles"
            const detailButtons = document.querySelectorAll('.product-btn');
            detailButtons.forEach(button => {
                button.addEventListener('click', function () {
                    // Obtener el nombre del producto desde el atributo data-producto
                    const productName = this.dataset.producto;
                    // Redirigir a la página del producto con el nombre como parámetro
                    window.location.href = 'producto.html?id=' + encodeURIComponent(productName);
                });
            });
        };
/*reseñas */
// Define una función para cargar las reseñas desde el almacenamiento local
function cargarReseñas() {
    var reseñasGuardadas = localStorage.getItem("reseñas");
    if (reseñasGuardadas) {
        return JSON.parse(reseñasGuardadas);
    } else {
        return [];
    }
}

// Define una función para mostrar las reseñas en la página
function mostrarReseñas() {
    var reseñas = cargarReseñas();
    var reseñasContainer = document.getElementById("reviews-container");
    reseñasContainer.innerHTML = "";
    reseñas.forEach(function(reseña) {
        var reseñaElement = document.createElement("div");
        reseñaElement.classList.add("review");
        reseñaElement.innerHTML = `
            <p><strong>${reseña.nombre}</strong> - Calificación: ${reseña.calificación}</p>
            <p>${reseña.comentario}</p>
        `;
        reseñasContainer.appendChild(reseñaElement);
    });
}

// Define una función para guardar una nueva reseña
function guardarReseña(nombre, comentario, calificación) {
    var reseñas = cargarReseñas();
    reseñas.push({ nombre: nombre, comentario: comentario, calificación: calificación });
    localStorage.setItem("reseñas", JSON.stringify(reseñas));
}

// Define una función para manejar el envío del formulario de reseña
function manejarEnvioReseña(event) {
    event.preventDefault();
    var nombre = document.getElementById("name").value;
    var comentario = document.getElementById("review").value;
    var calificación = document.getElementById("rating").value;
    guardarReseña(nombre, comentario, calificación);
    mostrarReseñas();
    // Reinicia el formulario después de enviar la reseña
    document.getElementById("review-form").reset();
}

// Agrega un event listener al formulario de reseña
document.getElementById("review-form").addEventListener("submit", manejarEnvioReseña);

// Muestra las reseñas cuando se carga la página
mostrarReseñas();
