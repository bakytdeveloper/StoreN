
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Добавлено обязательное поле password
    role: { type: String, enum: ['guest', 'customer', 'admin'], default: 'guest' },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    address: { type: String }, // Добавлено поле для адреса
    phoneNumber: { type: String } // Добавлено поле для номера телефона

});

const User = mongoose.model('User', userSchema);

module.exports = User;
