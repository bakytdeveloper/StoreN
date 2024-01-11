// server/routes/adminRoutes.js
const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/products', adminController.getAllProducts);
router.post('/products', adminController.createProduct);
router.put('/products/:id', adminController.editProduct);
router.delete('/products/:id', adminController.deleteProduct);

module.exports = router;
