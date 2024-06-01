const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const products = require('./products');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

let cart = [];
let shippingInfo = {};

// Ruta para manejar el inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        res.sendFile(path.join(__dirname, 'public', 'admin_store.html'));
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
    res.sendFile(path.join(__dirname, 'public', 'store.html'));
});

// Ruta para mostrar el carrito de compras
app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

// Ruta para mostrar la página de envío
app.get('/shipping', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'shipping.html'));
});

// Ruta para manejar la información de envío y redirigir a la factura
app.post('/order', (req, res) => {
    shippingInfo = req.body;
    res.redirect('/invoice');
});

// Ruta para mostrar la página de factura
app.get('/invoice', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'invoice.html'));
});

// Ruta para obtener los productos
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json({ message: 'Producto agregado correctamente', product: newProduct });
});

// Ruta para obtener el carrito de compras
app.get('/api/cart', (req, res) => {
    res.json(cart);
});

// Ruta para añadir productos al carrito
app.get('/add-to-cart/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (product) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
    }
    res.redirect('/store');
});

// Ruta para obtener la información de la factura
app.get('/api/invoice', (req, res) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const invoice = {
        shipping: shippingInfo,
        cart: cart,
        total: total
    };
    res.json(invoice);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
