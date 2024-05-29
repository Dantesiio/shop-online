const users = [];
const products = [];
const carts = {};
const purchases = {};
let currentUserId = 0;

exports.register = (req, res) => {
    const { username, password } = req.body;
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    res.status(201).send(newUser);
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUserId = user.id;
        res.status(200).send({ message: 'Customer logged in', userId: user.id });
    } else {
        res.status(401).send({ message: 'Invalid credentials' });
    }
};

exports.getProducts = (req, res) => {
    res.status(200).send(products);
};

exports.addToCart = (req, res) => {
    const { userId, productId, quantity } = req.body;
    if (!carts[userId]) {
        carts[userId] = [];
    }
    const product = products.find(p => p.id === productId);
    if (product) {
        carts[userId].push({ product, quantity });
        res.status(200).send(carts[userId]);
    } else {
        res.status(404).send("Product not found");
    }
};

exports.checkout = (req, res) => {
    const { userId } = req.body;
    const userCart = carts[userId];
    if (userCart) {
        const total = userCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        if (!purchases[userId]) {
            purchases[userId] = [];
        }
        const invoice = {
            id: purchases[userId].length + 1,
            items: userCart,
            total
        };
        purchases[userId].push(invoice);
        carts[userId] = [];
        res.status(200).send(invoice);
    } else {
        res.status(404).send("No items in cart");
    }
};
