const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['guest', 'customer', 'admin'], default: 'guest' },
    profile: {
        name: { type: String },
        address: { type: String },
        // Дополнительные поля профиля
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
