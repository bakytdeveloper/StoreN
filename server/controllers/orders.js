// controllers/orders.js
const Order = require('../models/Order');
const Seller = require('../models/Seller');

// Получить историю покупок для текущего продавца
// exports.getSellerPurchaseHistory = async (req, res) => {
//     const sellerId = req.user._id; // Получаем ID продавца из токена
//     console.log("SELLER_TOKEN", sellerId)
//     try {
//
//         // const orders = await Order.find({ 'seller': sellerId }).populate('products.product');
//         // res.json(orders);
//
//         const purchases = await Order.find({ sellerId: sellerId }); // Фильтрация по ID продавца
//         res.json(purchases);
//
//
//
//     } catch (error) {
//         console.error('Error fetching seller purchase history:', error);
//         res.status(500).json({ message: 'Ошибка при загрузке истории покупок' });
//     }
// };


exports.getSellerPurchaseHistory = async (req, res) => {
    console.log("Сервер Authenticated user:", req.user); // Вывод данных из токена
    const sellerId = req.user.sellerId; // Используйте req.user.id, если id присутствует в токене

    console.log("SELLER_TOKEN", sellerId);

    try {
        const purchases = await Order.find({ seller: sellerId }); // Используйте правильное поле для поиска
        res.json(purchases);
    } catch (error) {
        console.error('Error fetching seller purchase history:', error);
        res.status(500).json({ message: 'Ошибка при загрузке истории покупок' });
    }
};