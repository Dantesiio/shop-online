const express = require('express');
const customerController = require('../controllers/customerController');

const router = express.Router();

router.post('/register', customerController.register);
router.post('/login', customerController.login);
router.get('/products', customerController.getProducts);
router.post('/add-to-cart', customerController.addToCart);
router.post('/checkout', customerController.checkout);

module.exports = router;
