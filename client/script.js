
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    fetch('/customer/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Customer logged in') {
            localStorage.setItem('userId', data.userId);
            alert('Login successful');
            fetchProducts();
        } else {
            alert('Invalid credentials');
        }
    });
}

function fetchProducts() {
    fetch('/customer/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <p>Quantity: ${product.quantity}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                productList.appendChild(productDiv);
            });
        });
}
