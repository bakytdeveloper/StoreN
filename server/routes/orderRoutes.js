
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require("../models/User");
const authenticateToken = require("../middleware/authenticateToken");

// Создание нового заказа (для гостей и зарегистрированных пользователей)
router.post('/', async (req, res) => {
    console.log('Received order creation request:', req.body);
    const { user, guestInfo, products, totalAmount, firstName, address, phoneNumber, paymentMethod, comments } = req.body;

    let userId;

    if (user) {
        let existingUser;
        try {
            existingUser = await User.findOne({ email: user.email });
        } catch (error) {
            console.error('Error finding user:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (existingUser) {
            userId = existingUser._id;
        } else {
            const newUser = new User({
                name: user.firstName,
                email: user.email,
                address: user.address
            });

            try {
                const savedUser = await newUser.save();
                userId = savedUser._id;
            } catch (error) {
                console.error('Error creating new user:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }

    const order = new Order({
        user: userId || null,
        guestInfo: userId ? undefined : guestInfo,
        cart: [],
        products,
        totalAmount,
        firstName,
        address,
        phoneNumber,
        paymentMethod,
        comments,
    });

    try {
        const newOrder = await order.save();
        if (userId) {
            await User.findByIdAndUpdate(userId, { $push: { orders: newOrder._id } });
        }
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error placing order:', error);
        if (error.name === 'ValidationError' && error.errors && error.errors.password) {
            return res.status(400).json({ message: 'Password is required for registered users' });
        }
        res.status(400).json({ message: error.message });
    }
});



// Добавление товара в корзину (для гостей и зарегистрированных пользователей)
router.post('/add-to-cart', async (req, res) => {
    console.log('Received add-to-cart request:', req.body); // Добавим лог для отслеживания запроса

    const { user, guestInfo, product, quantity } = req.body;

    // Если пользователь гость, проверим наличие необходимых данных
    if (!user && (!req.user || req.user.role === 'guest')) {
        if (!guestInfo || !guestInfo.name || !guestInfo.email) {
            return res.status(400).json({ message: 'Guest information is incomplete' });
        }
    }

    try {
        let order;

        // Найдем активный заказ для пользователя или гостя
        if (user) {
            order = await Order.findOne({ user, status: 'pending' }).populate('cart.product');
        } else {
            order = await Order.findOne({ 'guestInfo.email': guestInfo.email, status: 'pending' }).populate('cart.product');
        }

        if (!order) {
            // Если активного заказа нет, создадим новый
            order = new Order({
                user,
                guestInfo: user ? undefined : guestInfo,
                cart: [],
                products: [],
                totalAmount: 0,
            });
        }

        // Проверим, есть ли уже такой товар в корзине
        const existingCartItemIndex = order.cart.findIndex((item) => item.product._id.toString() === product);

        if (existingCartItemIndex !== -1) {
            // Если товар уже в корзине, увеличим количество
            order.cart[existingCartItemIndex].quantity += quantity;
        } else {
            // Если товара еще нет в корзине, добавим его
            // order.products.push({ product, quantity });

            order.cart.push({ product, quantity });
            order.products.push({ product, quantity });

        }

        // Подсчитаем общую стоимость корзины
        order.totalAmount = order.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

        // Сохраним изменения в заказе
        await order.save();

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Получение списка заказов для зарегистрированных пользователей
router.get('/my-orders', authenticateToken, async (req, res) => {
    if (!req.user || req.user.role === 'guest') {
        return res.status(403).json({ message: 'Permission denied' });
    }

    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const orders = await Order.find({ user: user._id }).populate('products.product', 'name price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// Получение списка всех заказов для администратора
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('products.product');
        // const orders = await Order.find().populate('user').populate('cart.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Обновление статуса заказа
router.put('/update-status/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                $set: { status },
                $push: { statusHistory: { status, time: Date.now() } },
            },
            { new: true }
        );

        if (updatedOrder) {
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// Обновление комментариев админа
router.put('/update-comments-admin/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { commentsAdmin } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                $set: { commentsAdmin },
            },
            { new: true }
        );
        if (updatedOrder) {
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;


