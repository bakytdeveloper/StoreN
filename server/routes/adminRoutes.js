// server/routes/adminRoutes.js
const express = require('express');
const adminController = require('../controllers/adminController');
const {authenticateToken} = require("../middleware/authenticateToken");
const router = express.Router();

// Защищаем маршрут аутентификацией
router.use(authenticateToken);

router.get('/products', adminController.getAllProducts);
router.post('/products', adminController.createProduct);
router.put('/products/:id', adminController.editProduct);
router.delete('/products/:id', adminController.deleteProduct);

module.exports = router;
