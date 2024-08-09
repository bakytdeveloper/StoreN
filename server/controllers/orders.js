// controllers/orders.js
const Order = require('../models/Order');
const Seller = require('../models/Seller');

// Получить историю покупок для текущего продавца
exports.getSellerPurchaseHistory = async (req, res) => {
    try {
        const sellerId = req.user._id; // Получаем ID продавца из токена
        const orders = await Order.find({ 'seller.id': sellerId }).populate('products.product');
        res.json(orders);
    } catch (error) {
        console.error('Error fetching seller purchase history:', error);
        res.status(500).json({ message: 'Ошибка при загрузке истории покупок' });
    }
};
