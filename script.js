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
                `;
            } else {
                // Manejar el caso en el que el producto no se encuentra
                console.error('Producto no encontrado');
            }
        })
        .catch(error => console.error('Error al cargar los detalles del producto:', error));
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
                        
                        <button class="product-btn" data-producto="${product.nombre}"><i class="bi bi-arrow-left-right">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5"/>
                        </svg>
                        </i>
                        Compare
                        </button>

                        <button class="product-btn" data-producto="${product.nombre}">
                        <i class="bi bi-suit-heart-fill">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                        <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1"/>
                        </svg>
                        </i>
                        Remember</button>

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
