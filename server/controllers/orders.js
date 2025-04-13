const Order = require('../models/Order');

exports.getSellerPurchaseHistory = async (req, res) => {
    const sellerId = req.user.sellerId;
    try {
        const purchases = await Order.find({ seller: sellerId });
        res.json(purchases);
    } catch (error) {
        console.error('Error fetching seller purchase history:', error);
        res.status(500).json({ message: 'Ошибка при загрузке истории покупок' });
    }
};