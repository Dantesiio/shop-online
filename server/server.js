const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const products = require('./products');

const adminRoutes = require('./routes/adminRoutes');
const customerRoutes = require('./routes/customerRoutes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar el inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        res.send('Inicio de sesión exitoso');
    } else {
        res.send('Nombre de usuario o contraseña incorrectos');
    }
});

// Ruta para mostrar la página de registro
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Ruta para manejar el registro
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    res.redirect('/store');
});

// Ruta para mostrar la página principal de la tienda
app.get('/store', (req, res) => {
    let productsHtml = products.map(product => `
        <div class="col-md-4 product-card">
            <div class="card">
                <img class="card-img-top" src="${product.image}" alt="${product.name}">
                <div class="product-card-body">
                    <h5 class="product-card-title">${product.name}</h5>
                    <p class="product-card-price">$${product.price.toFixed(2)}</p>
                    <p class="product-card-description">${product.description}</p>
                    <a href="#" class="btn btn-primary">Add to Cart</a>
                </div>
            </div>
        </div>
    `).join('');

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Store</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">Online Store</a>
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Carrito</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="container">
                <h1 class="mt-5">Welcome to Our Shoes Store</h1>
                <div class="row">
                    ${productsHtml}
                </div>
            </div>
            <footer class="footer mt-5 py-3 bg-light">
                <div class="container">
                    <span class="text-muted">© 2024 Online Store. All rights reserved.</span>
                </div>
            </footer>
        </body>
        </html>
    `);
});

app.use('/admin', adminRoutes);
app.use('/customer', customerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
