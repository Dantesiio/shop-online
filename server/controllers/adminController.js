const admins = [{ id: 1, username: 'admin', password: 'password' }];
const products = [];

exports.login = (req, res) => {
    const { username, password } = req.body;
    const admin = admins.find(a => a.username === username && a.password === password);
    if (admin) {
        res.status(200).send({ message: 'Admin logged in', adminId: admin.id });
    } else {
        res.status(401).send({ message: 'Invalid credentials' });
    }
};

exports.addProduct = (req, res) => {
    const { name, description, price, quantity } = req.body;
    const newProduct = { id: products.length + 1, name, description, price, quantity };
    products.push(newProduct);
    res.status(201).send(newProduct);
};
