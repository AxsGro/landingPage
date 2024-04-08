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
