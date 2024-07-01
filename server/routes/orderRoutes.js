
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require("../models/User");
const {authenticateToken} = require("../middleware/authenticateToken");
const Seller = require("../models/Seller");
const Product = require("../models/Product");
const {checkRole} = require("../middleware/authenticateToken");

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



router.post('/add-to-cart', async (req, res) => {
    console.log('Received add-to-cart request:', req.body);

    const { user, guestInfo, product, quantity, size, color } = req.body;

    if (!user && (!req.user || req.user.role === 'guest')) {
        if (!guestInfo || !guestInfo.name || !guestInfo.email) {
            return res.status(400).json({ message: 'Guest information is incomplete' });
        }
    }

    try {
        let order;

        if (user) {
            order = await Order.findOne({ user, status: 'pending' }).populate('cart.product');
        } else {
            order = await Order.findOne({ 'guestInfo.email': guestInfo.email, status: 'pending' }).populate('cart.product');
        }

        if (!order) {
            order = new Order({
                user,
                guestInfo: user ? undefined : guestInfo,
                cart: [],
                products: [],
                totalAmount: 0,
            });
        }

        const existingCartItemIndex = order.cart.findIndex((item) => item.product._id.toString() === product);

        if (existingCartItemIndex !== -1) {
            order.cart[existingCartItemIndex].quantity += quantity;
        } else {
            order.cart.push({ product, quantity, size, color }); // Добавляем размер и цвет товара в корзину
            order.products.push({ product, quantity, size, color });
        }

        order.totalAmount = order.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

        await order.save();

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/my-orders', authenticateToken, async (req, res) => {
    if (!req.user || req.user.role === 'guest') {
        return res.status(403).json({ message: 'Permission denied' });
    }

    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const page = parseInt(req.query.page) || 1;
        const perPage = 5; // Количество заказов на странице

        const orders = await Order.find({ user: user._id })
            .populate('products.product', 'name price')
            .sort({ date: 'desc' }) // Сортировка по убыванию времени создания заказа
            .skip((page - 1) * perPage)
            .limit(perPage);

        const totalOrders = await Order.countDocuments({ user: user._id });
        const totalPages = Math.ceil(totalOrders / perPage);

        res.json({ orders, totalOrders, totalPages, currentPage: page });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// // Получение списка всех заказов для администратора
router.get('/', authenticateToken, checkRole(['admin']), async (req, res) => {
// router.get('/', authenticateToken, checkRole(['admin']),  async (req, res) => {
    try {
        const { page = 1, perPage = 20 } = req.query;
        const orders = await Order.find()
            .populate('user')
            .populate('products.product')
            .sort({ date: 'desc' }) // Сортировка по убыванию времени создания заказа
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Получение деталей заказа по его ID
router.get('/:orderId', async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId)
            .populate('user')
            .populate('products.product');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Обновление статуса заказа
router.put('/update-status/:orderId', authenticateToken, async (req, res) => {
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

// Функция для пересчета общей суммы заказа
async function calculateTotalAmount(products) {
    let sum = 0;
    for (const item of products) {
        const product = await Product.findById(item.product); // Найдите объект товара по его ID
        if (product) {
            sum += product.price * item.quantity;
        }
    }
    // console.log("sum:", sum);
    return sum;
}

// router.put('/update-quantity/:orderId/:productId', async (req, res) => {
//     const { orderId, productId } = req.params;
//     const { quantity } = req.body;
//     try {
//         const order = await Order.findById(orderId);
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }
//         const productIndex = order.products.findIndex(item => item.product && item.product.toString() === productId);
//         if (productIndex === -1) {
//             return res.status(404).json({ message: 'Product not found in order' });
//         }
//         order.products[productIndex].quantity = quantity;
//         order.totalAmount = await calculateTotalAmount(order.products);
//         await order.save();
//         res.json(order);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

router.put('/update-quantity/:orderId/:productId', async (req, res) => {
    const { orderId, productId } = req.params;
    const { quantity } = req.body;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const productIndex = order.products.findIndex(item => item.product && item.product.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in order' });
        }
        order.products[productIndex].quantity = quantity;
        order.totalAmount = await calculateTotalAmount(order.products);
        await order.save();
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// router.delete('/delete-item/:orderId/:productId', async (req, res) => {
//     const { orderId, productId } = req.params;
//     try {
//         const order = await Order.findById(orderId);
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }
//         order.products = order.products.filter(item => item.product && item.product.toString() !== productId);
//         order.totalAmount = await calculateTotalAmount(order.products);
//         await order.save();
//         res.json(order);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });


router.delete('/delete-item/:orderId/:productId', async (req, res) => {
    const { orderId, productId } = req.params;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.products = order.products.filter(item => item.product && item.product.toString() !== productId);
        order.totalAmount = await calculateTotalAmount(order.products);
        await order.save();
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// DELETE route to delete an order by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



// Получение последнего заказа и профиля пользователя
router.get('/last-order/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const lastOrder = await Order.findOne({ user: userId }).sort({ date: -1 });
        if (!lastOrder) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.json({
            profile: {
                name: user.name,
                email: user.email,
                address: user.address || lastOrder.address,
                phoneNumber: user.phoneNumber || lastOrder.phoneNumber
            },
            lastOrder
        });
    } catch (error) {
        console.error('Error fetching last order or user profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router;


