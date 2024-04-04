// models/Seller.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: { type: String, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    // Другие поля для товара, такие как цена, количество и т.д.
});

const sellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, unique: true  },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
    products: [productSchema]
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
