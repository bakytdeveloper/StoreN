

const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
});

const statusHistorySchema = new mongoose.Schema({
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], required: true },
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
        },
    ],
    totalAmount: { type: Number, required: true },

    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },

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
