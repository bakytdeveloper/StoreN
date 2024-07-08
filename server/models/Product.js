

const mongoose = require('mongoose');

const characteristicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number }, // Новое поле для цены до скидки
    category: { type: String, required: true },
    type: { type: String, required: true },
    direction: { type: String },
    brand: { type: String, required: true },
    gender: { type: String, required: true },
    characteristics: [characteristicSchema],
    sizes: [{ type: String }],
    colors: [{
        name: { type: String, required: true },
        value: { type: String, required: true },
    }],
    images: [{ type: String }],
    // quantity: { type: Number }, // Новое поле для количества товара
    quantity: { type: Number, default: 10 }, // Новое поле для количества товара
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
    createdAt: { type: Date, default: Date.now }  // Добавлено поле createdAt с датой по умолчанию
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
