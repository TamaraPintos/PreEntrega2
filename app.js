document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const cartList = document.getElementById('cart-list');
    const clearCartButton = document.getElementById('clear-cart');

    // Ejemplo de productos
    const products = [
        { id: 1, name: 'Whisky Chivas Royal Salute 21 Años 700ml ', price: 288000 },
        { id: 2, name: 'Whisky Johnnie Walker Gold Label 750ml', price: 85000 },
        { id: 3, name: 'Whisky Johnnie Walker Swing 750ml', price: 107500 },
        { id: 4, name: 'Whisky - Johnnie Walker Blue Label X750ml', price: 398500 },
        { id: 5, name: 'Old Parr 12 Años 750ml', price: 50000 },
        { id: 6, name: 'Whisky Ballantines Finest 1000 Ml ', price: 28600 }
    ];

    // Cargar productos al DOM
    function loadProducts() {
        products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - $${product.price}`;
            
            const addButton = document.createElement('button');
            addButton.textContent = 'Añadir al carrito';
            addButton.addEventListener('click', () => addToCart(product));
            
            li.appendChild(addButton);
            productList.appendChild(li);
        });
    }

    // Cargar el carrito desde localStorage
    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.forEach(item => addToCartDOM(item));
    }

    // Guardar el carrito en localStorage
    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Agregar un producto al carrito
    function addToCart(product) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        saveCart(cart);
        addToCartDOM(product);
    }

    // Eliminar un producto del carrito
    function removeFromCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== product.id);
        saveCart(cart);
        renderCart();
    }

    // Renderizar el carrito en el DOM
    function addToCartDOM(product) {
        const li = document.createElement('li');
        li.textContent = `${product.name} - $${product.price}`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.addEventListener('click', () => removeFromCart(product));
        
        li.appendChild(removeButton);
        cartList.appendChild(li);
    }

    // Renderizar el carrito completo
    function renderCart() {
        cartList.innerHTML = '';
        loadCart();
    }

    // Vaciar el carrito
    clearCartButton.addEventListener('click', () => {
        localStorage.removeItem('cart');
        renderCart();
    });

    // Cargar productos y carrito inicial
    loadProducts();
    renderCart();
});
