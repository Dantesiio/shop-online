const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/adminRoutes');
const customerRoutes = require('./routes/customerRoutes');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Bienvenido a la Tienda Online');
});

app.use('/admin', adminRoutes);
app.use('/customer', customerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
