const express = require('express');
const router = express.Router();

const adminRoutes = require('./adminRoutes'); // Добавлен импорт adminRoutes
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');
const sellerRoutes = require('./sellerRoutes'); // Добавлен импорт sellerRoutes

router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/admin', adminRoutes); // Добавлен новый маршрут для администратора
router.use('/sellers', sellerRoutes); // Добавлен новый маршрут для продавцов

module.exports = router;