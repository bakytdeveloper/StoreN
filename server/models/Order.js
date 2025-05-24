const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true }, // Добавлено поле для хранения продавца
    quantity: { type: Number, required: true },
});

const statusHistorySchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled', 'inProgress'],
        default: 'pending',
        required: true },
    time: { type: Date, default: Date.now },
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' }, // Добавлено поле для хранения информации о продавце
    guestInfo: {
        name: { type: String },
        email: { type: String },
    },
    cart: [cartItemSchema],
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            name: { type: String, required: true },
            brand: { type: String },
            type: { type: String },
            category: { type: String },
            description: { type: String },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            size: { type: String }, // Поле для хранения размера продукта
            color: { type: String }, // Поле для хранения цвета продукта
            seller: { // Добавлено поле для хранения информации о продавце
                id: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
                name: { type: String, required: true },
                email: { type: String, required: true },
                companyName: { type: String, required: true },
                phoneNumber: { type: String, required: true },
            },
        },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled', 'inProgress'], default: 'pending' },
    date: { type: Date, default: Date.now },
    firstName: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    paymentMethod: { type: String },
    comments: { type: String },
    statusHistory: [statusHistorySchema], // Поле для хранения истории статусов
    commentsAdmin: { type: String },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
