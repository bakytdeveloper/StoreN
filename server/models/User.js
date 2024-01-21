
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['guest', 'customer', 'admin'], default: 'guest' },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    profile: {
        fullName: { type: String },
        address: { type: String },
        phoneNumber: { type: String },
        // Дополнительные поля профиля
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],

});

const User = mongoose.model('User', userSchema);

module.exports = User;
