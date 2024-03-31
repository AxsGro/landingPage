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