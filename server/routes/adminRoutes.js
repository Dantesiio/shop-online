const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.post('/login', adminController.login);
router.post('/add-product', adminController.addProduct);

module.exports = router;
