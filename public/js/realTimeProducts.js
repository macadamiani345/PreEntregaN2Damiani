const socket = io();

// Actualizar lista de productos
socket.on('updateProducts', (products) => {
    const productList = document.getElementById('productList');
    
    if (products.length === 0) {
        productList.innerHTML = '<p>No hay productos disponibles</p>';
        return;
    }
    
    productList.innerHTML = products.map(product => `
        <div class="product-card">
            <h3>${product.title}</h3>
            <p><strong>ID:</strong> ${product.id}</p>
            <p>${product.description}</p>
            <p><strong>Código:</strong> ${product.code}</p>
            <p class="price">$${product.price}</p>
            <p><strong>Stock:</strong> ${product.stock}</p>
            <p><strong>Categoría:</strong> ${product.category}</p>
            <button onclick="deleteProduct(${product.id})" style="background: #e74c3c; color: white; padding: 5px 10px; border: none; border-radius: 3px; cursor: pointer;">
                Eliminar
            </button>
        </div>
    `).join('');
});

// Agregar producto
document.getElementById('addProductForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const product = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        category: document.getElementById('category').value
    };
    
    socket.emit('addProduct', product);
    e.target.reset();
});

// Eliminar producto
function deleteProduct(id) {
    socket.emit('deleteProduct', id);
}

socket.on('error', (message) => {
    alert('Error: ' + message);
});
