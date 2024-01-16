


// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');
//
// // Создание нового заказа (для гостей и зарегистрированных пользователей)
// router.post('/', async (req, res) => {
//     const { user, products, totalAmount } = req.body;
//
//     // Если пользователь гость, проверим наличие необходимых данных
//     if (!user && (!req.user || req.user.role === 'guest')) {
//         if (!req.body.guestInfo || !req.body.guestInfo.name || !req.body.guestInfo.email) {
//             return res.status(400).json({ message: 'Guest information is incomplete' });
//         }
//     }
//
//     const order = new Order({
//         user,
//         guestInfo: user ? undefined : req.body.guestInfo, // Используем информацию о госте, если пользователь не зарегистрирован
//         products,
//         totalAmount,
//     });
//
//     try {
//         const newOrder = await order.save();
//         res.status(201).json(newOrder);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
//
// // Получение списка заказов для зарегистрированных пользователей
// router.get('/my-orders', async (req, res) => {
//     if (req.user.role === 'guest') {
//         return res.status(403).json({ message: 'Permission denied' });
//     }
//
//     try {
//         const orders = await Order.find({ $or: [{ user: req.user._id }, { 'guestInfo.email': req.user.email }] });
//         res.json(orders);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
//
// module.exports = router;





const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require("../models/User");


// Создание нового заказа (для гостей и зарегистрированных пользователей)
router.post('/', async (req, res) => {
    const { user, guestInfo, products, totalAmount, firstName, address, phoneNumber, paymentMethod, comments } = req.body;

    // Если пользователь гость, проверим наличие необходимых данных
    if (!user && (!req.user || req.user.role === 'guest')) {
        if (!guestInfo || !guestInfo.name || !guestInfo.email || !guestInfo.address || !guestInfo.phoneNumber) {
            return res.status(400).json({ message: 'Guest information is incomplete' });
        }
    }


    const order = new Order({
        user,
        guestInfo: user ? undefined : guestInfo,
        cart: [],
        products,
        totalAmount,
        firstName,
        // lastName,
        address,
        phoneNumber,
        paymentMethod,
        comments,
    });

    try {
        const newOrder = await order.save();

        // Если пользователь - зарегистрированный клиент, добавим заказ в его историю
        if (user && user.role === 'customer') {
            await User.findByIdAndUpdate(user, { $push: { orders: newOrder._id } });
        }

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});




// Добавление товара в корзину (для гостей и зарегистрированных пользователей)
router.post('/add-to-cart', async (req, res) => {
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
router.get('/my-orders', async (req, res) => {
    if (req.user.role === 'guest') {
        return res.status(403).json({ message: 'Permission denied' });
    }

    try {
        const orders = await Order.find({ $or: [{ user: req.user._id }, { 'guestInfo.email': req.user.email }] });
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





module.exports = router;


