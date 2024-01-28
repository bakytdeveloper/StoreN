

// server/models/Order.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
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
        },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'pending' },
    // «ожидает», «завершено», «отменено»
    date: { type: Date, default: Date.now },

    // Дополнительные поля от заказчика
    firstName: { type: String },
    // lastName: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    paymentMethod: { type: String },
    comments: { type: String },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
