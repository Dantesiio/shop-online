const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const products = require('./products.js');
const users = require('./users.js');
let currentUser;

const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

let cart = [];
let shippingInfo = {};

app.get('/test', (req, res) => {
    console.log("Entra a test");
    console.log(`Usuarios ${users.length}`);
    for(let i in products){
        console.log("ID : "+products[i].id)
    }
    for(let i in users){
        console.log("name : "+users[i].username)
    }
    // for(product in products){
    //     console.log(`ID: ${product.id}`);
    //     console.log(`Stock: ${product.stock}`);
    //     console.log(`Image: ${product.image}`);
    //     console.log(`Discount: ${product.discount}`);
    //     console.log(`Category: ${product.category}`);
    //     console.log(`Brand: ${product.brand}`);
    //     console.log(`Name: ${product.name}`);
    //     console.log(`Price: $${product.price}`);
    //     console.log(`Description: ${product.description}`);
    //     console.log('-----------------------------');
    // }
    res.sendFile(path.join(__dirname, 'public', 'admin_store.html'));
});
function getUserByUsername(username){
    let user;
    for(let i in users){
        if(users[i].username === username){
            user = users[i];
        }
    }
    return user;
}

// Ruta para manejar el inicio de sesión
app.post('/login', (req, res) => {
    console.log("Se ha logueado un usuario");
    const { username, password } = req.body;

    let user = getUserByUsername(username);

    if(!user.password === password || !user){
        res.send('Nombre de usuario o contraseña incorrectos');
    }

    res.sendFile(path.join(__dirname, 'public', 'admin_store.html'));

    // if (username === 'admin' && password === 'password') {
    //     res.sendFile(path.join(__dirname, 'public', 'admin_store.html'));
    // }
});

// Ruta para mostrar la página de registro
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Ruta para manejar el registro
app.post('/register', (req, res) => {
    console.log("Usuario se va a registrar")
    const { username, password } = req.body;
    const user = {
        username: username,
        password: password,
        role : 'customer'
    };
    const usersFilePath = path.join(__dirname, 'users.js');
    //Lectura de datos de usuario
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        console.log("R1")
        if (err) {
            console.error('Error leyendo el archivo:', err);
            return res.status(500).send('Error interno del servidor');
        }

        let usersList = [];

        console.log("R2")
        users.push(user); // Agrega el nuevo usuario a la lista de usuarios

        const fileContent =  `const users = ${JSON.stringify(users,null,2)};\nmodule.exports = users;`;

        // const fileContent = `const products = ${JSON.stringify(products, null, 2)};\n\nmodule.exports = products;`;

        fs.writeFile(usersFilePath, fileContent, (err) => {
            if (err) {
                console.error('Error escribiendo en el archivo:', err);
                return res.status(500).send('Error interno del servidor');
            }
            console.log("R3")

            // Redirigir al usuario a una página de éxito o login
            console.log("Usuario registrado")
            res.redirect('/store');
        });
    });

    // console.log("Usuario logueado")
    // res.redirect('/store');
});

// Ruta para mostrar la página principal de la tienda
app.get('/store', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin_store.html'));
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

// Ruta para agregar un nuevo producto
app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json({ message: 'Producto agregado correctamente', product: newProduct });
});
app.post('/api/products', (req, res) => {
    console.log('Datos recibidos:', req.body);  // Agregar este log
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
