const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Создание нового заказа (только для зарегистрированных пользователей)
router.post('/', async (req, res) => {
    if (req.user.role === 'guest') {
        return res.status(403).json({ message: 'Permission denied' });
    }

    const { products, totalAmount } = req.body;

    const order = new Order({
        user: req.user._id,
        userName: req.user.name, // Добавленная строка
        products,
        totalAmount,
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Получение списка заказов для зарегистрированных пользователей
router.get('/my-orders', async (req, res) => {
    if (req.user.role === 'guest') {
        return res.status(403).json({ message: 'Permission denied' });
    }

    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
