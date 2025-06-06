const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require("../models/User");
const {authenticateToken} = require("../middleware/authenticateToken");
const Seller = require("../models/Seller");
const Product = require("../models/Product");
const {getSellerPurchaseHistory} = require("../controllers/orders");
const {jwtDecode} = require("jwt-decode");
const {checkRole} = require("../middleware/authenticateToken");
const {transporter} = require('../smtp/otpService');


// Возврат товаров на склад
async function returnProductsToStock(products) {
    for (const item of products) {
        try {
            await Product.findByIdAndUpdate(
                item.product,
                { $inc: { quantity: item.quantity } },
                { new: true }
            );
        } catch (error) {
            console.error(`Error returning product ${item.product} to stock:`, error);
        }
    }
}

// Уменьшение количества товаров на складе
async function deductProductsFromStock(products) {
    for (const item of products) {
        try {
            const product = await Product.findById(item.product);
            if (product.quantity < item.quantity) {
                throw new Error(`Insufficient quantity for product ${product.name}`);
            }
            product.quantity -= item.quantity;
            await product.save();
        } catch (error) {
            console.error(`Error deducting product ${item.product} from stock:`, error);
            throw error;
        }
    }
}


router.post('/', async (req, res) => {
    const { user, guestInfo, products, totalAmount, firstName, address, phoneNumber, paymentMethod, comments } = req.body;
    let userId;
    let sellerId = null;

    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        try {
            const decodedToken = jwtDecode(token);  // Это может быть проблемным, если токен некорректен
            sellerId = decodedToken.role === 'seller' ? decodedToken.sellerId : null;
        } catch (error) {
            console.error('Это гость, он без токена');
        }
    }

    // Обработка пользователя
    try {
        if (user) {
            let existingUser = await User.findOne({ email: user.email });
            if (!existingUser) {
                const newUser = new User({
                    name: user.firstName,
                    email: user.email,
                    address: user.address
                });
                const savedUser = await newUser.save();
                userId = savedUser._id;
            } else {
                userId = existingUser._id;
            }
        }
    } catch (error) {
        console.error('Error handling user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    let insufficientProducts = [];
    let orderProducts = [];
    try {
        const productUpdates = products.map(async ({ product, quantity, size, color }) => {
            const existingProduct = await Product.findById(product).populate('seller');
            if (!existingProduct) {
                throw new Error(`Product not found: ${product}`);
            }
            if (existingProduct.quantity < quantity) {
                insufficientProducts.push({ name: existingProduct.name, available: existingProduct.quantity });
            } else {
                orderProducts.push({
                    product: existingProduct._id,
                    name: existingProduct.name,
                    brand: existingProduct.brand,
                    type: existingProduct.type,
                    description: existingProduct.description,
                    price: existingProduct.price,
                    quantity,
                    size,
                    color,
                    seller: {
                        id: existingProduct.seller._id,
                        name: existingProduct.seller.name,
                        email: existingProduct.seller.email,
                        companyName: existingProduct.seller.companyName,
                        phoneNumber: existingProduct.seller.phoneNumber,
                    }
                });
                // Обновление количества продукта
                await Product.findByIdAndUpdate(product, { $inc: { quantity: -quantity } }, { new: true });
            }
        });
        await Promise.all(productUpdates);

        if (insufficientProducts.length > 0) {
            return res.status(400).json({ message: 'Insufficient product quantities', products: insufficientProducts });
        }
    } catch (error) {
        console.error('Error processing products:', error);
        return res.status(500).json({ message: 'Failed to process products' });
    }

    // Уведомление продавцов
    try {
        await notifySellersAboutLowQuantity(products);
    } catch (error) {
        console.error('Error notifying sellers:', error);
    }

    // Создание заказа
    const order = new Order({
        user: userId || null,
        seller: sellerId || null,  // Устанавливаем идентификатор продавца
        guestInfo: userId ? undefined : guestInfo,
        cart: [],
        products: orderProducts,
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
        if (sellerId) {
            await Seller.findByIdAndUpdate(sellerId, { $push: { orders: newOrder._id } });  // Добавляем заказ к продавцу
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



// Функция для отправки уведомлений продавцам о низком количестве товаров
async function notifySellersAboutLowQuantity(products) {
    for (const { product, quantity } of products) {
        const existingProduct = await Product.findById(product).populate('seller');
        if (existingProduct && existingProduct.quantity <= 3 && existingProduct.quantity >= 1) {
            const seller = existingProduct.seller;
            if (seller && seller.email) {
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: seller.email,
                    subject: `Оповещение о низком уровне запаса товара: ${existingProduct.name}`,
                    text: `Дорогой ${seller.name},\n\nНастоящим сообщением, мы хотели сказать, что товара "${existingProduct.name}" осталось мало на складе, осталось всего ${existingProduct.quantity} шт.\n\nПожалуйста, пополните запасы как можно скорее.\n\nС уважением,\nВаш Магазин`,
                };
                await transporter.sendMail(mailOptions);
            }
        }
    }
}


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
            const newQuantity = order.cart[existingCartItemIndex].quantity + quantity;
            const existingProduct = await Product.findById(product);
            if (existingProduct && existingProduct.quantity >= newQuantity) {
                order.cart[existingCartItemIndex].quantity = newQuantity;
            } else {
                return res.status(400).json({ message: `Insufficient quantity for product: ${existingProduct.name}` });
            }
        } else {
            const existingProduct = await Product.findById(product);
            if (existingProduct && existingProduct.quantity >= quantity) {
                order.cart.push({ product, quantity, size, color });
                order.products.push({ product, quantity, size, color });
            } else {
                return res.status(400).json({ message: `Insufficient quantity for product: ${existingProduct.name}` });
            }
        }


        order.totalAmount = order.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

        await order.save();

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/my-orders', authenticateToken, checkRole(['customer']), async (req, res) => {
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
router.get('/', async (req, res) => {
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
router.get('/:orderId',  async (req, res) => {
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
// Обновление статуса заказа с возвратом товаров при отмене
router.put('/update-status/:orderId', authenticateToken, checkRole(['admin']), async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Если статус меняется на "cancelled", возвращаем товары на склад
        if (status === 'cancelled' && order.status !== 'cancelled') {
            await returnProductsToStock(order.products);
        }
        // Если статус был "cancelled" и меняется на другой, снова уменьшаем количество товаров
        else if (order.status === 'cancelled' && status !== 'cancelled') {
            await deductProductsFromStock(order.products);
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                $set: { status },
                $push: { statusHistory: { status, time: Date.now() } },
            },
            { new: true }
        );

        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Обновление комментариев админа
router.put('/update-comments-admin/:orderId', authenticateToken,  checkRole(['admin']), async (req, res) => {
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


// Обновление количества товара в заказе
// Обновление количества товара в заказе
router.put('/update-product-quantity/:orderId', authenticateToken, checkRole(['admin']), async (req, res) => {
    const { orderId } = req.params;
    const { productIndex, quantity } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const productItem = order.products[productIndex];
        if (!productItem) {
            return res.status(404).json({ message: 'Product not found in order' });
        }

        // Находим продукт в базе данных
        const product = await Product.findById(productItem.product);
        if (!product) {
            return res.status(404).json({ message: 'Original product not found' });
        }

        // Вычисляем разницу в количестве
        const quantityDifference = quantity - productItem.quantity;

        // Проверяем, достаточно ли товара на складе для увеличения количества
        if (quantityDifference > 0 && product.quantity < quantityDifference) {
            return res.status(400).json({
                message: 'Insufficient product quantity',
                available: product.quantity
            });
        }

        // Обновляем количество в заказе
        productItem.quantity = quantity;

        // Обновляем количество товара у продавца
        product.quantity -= quantityDifference;
        await product.save();

        // Пересчитываем общую сумму заказа
        order.totalAmount = order.products.reduce(
            (total, item) => total + (item.price || 0) * (item.quantity || 0),
            0
        );

        await order.save();
        res.json(order);
    } catch (error) {
        console.error('Error updating product quantity:', error);
        res.status(500).json({ message: error.message });
    }
});



// Удаление товара из заказа
// Удаление товара из заказа с возвратом на склад
router.delete('/remove-product/:orderId', authenticateToken, checkRole(['admin']), async (req, res) => {
    const { orderId } = req.params;
    const { productIndex } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (productIndex < 0 || productIndex >= order.products.length) {
            return res.status(404).json({ message: 'Product not found in order' });
        }

        // Получаем информацию о товаре перед удалением
        const productToRemove = order.products[productIndex];

        // Удаляем товар из заказа
        order.products.splice(productIndex, 1);

        // Возвращаем товар на склад
        await Product.findByIdAndUpdate(
            productToRemove.product,
            { $inc: { quantity: productToRemove.quantity } },
            { new: true }
        );

        // Пересчитываем общую сумму
        order.totalAmount = order.products.reduce(
            (total, item) => total + (item.price || 0) * (item.quantity || 0),
            0
        );

        // Если после удаления товаров в заказе их не осталось, удаляем заказ
        if (order.products.length === 0) {
            await Order.findByIdAndDelete(orderId);
            return res.json({ message: 'Order deleted as it has no products left' });
        }

        await order.save();
        res.json(order);
    } catch (error) {
        console.error('Error removing product from order:', error);
        res.status(500).json({ message: error.message });
    }
});


// Удаление заказа с возвратом товаров
router.delete('/:id', authenticateToken, checkRole(['admin']), async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Возвращаем товары на склад перед удалением заказа
        await returnProductsToStock(order.products);

        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



// Получение последнего заказа и профиля пользователя
router.get('/last-order/:userId', authenticateToken, async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const lastOrder = await Order.findOne({ user: userId }).sort({ date: -1 });
        if (!lastOrder) {
            return res.json({ lastOrder: null });
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




router.post('/send-email', async (req, res) => {
    const { email, firstName, address, phoneNumber, cartItems, totalPrice } = req.body;

    const dateNew = new Date();

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.SMTP_USER,
        subject: 'Поступил Новый заказ',
        text: `
            Новый заказ от ${firstName} (${email})
            Адрес доставки: ${address}
            Номер телефона: ${phoneNumber}
            Сумма заказа: ${totalPrice} сом
            Товары: ${cartItems.map(item => `${item.name} - ${item.quantity} шт`).join(', ')}
            Время заказа: ${dateNew}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});



// Получить историю покупок для текущего продавца
router.get('/seller/purchase-history', authenticateToken, checkRole(['seller']), getSellerPurchaseHistory);




module.exports = router;


