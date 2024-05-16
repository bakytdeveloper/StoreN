

const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
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
    guestInfo: {
        name: { type: String },
        email: { type: String },
    },
    cart: [cartItemSchema],
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            size: { type: String }, // Добавляем поле для хранения размера продукта
            color: { type: String }, // Добавляем поле для хранения цвета продукта

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
    statusHistory: [statusHistorySchema], // Добавлено поле для хранения истории статусов
    commentsAdmin: { type: String },

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
