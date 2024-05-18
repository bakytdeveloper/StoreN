

const mongoose = require('mongoose');

const characteristicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    direction: { type: String },
    brand: { type: String, required: true },
    gender: { type: String, required: true }, // Добавлено поле gender
    characteristics: [characteristicSchema],
    sizes: [{ type: String }],
    colors: [{
        name: { type: String, required: true },
        value: { type: String, required: true },
    }],
    images: [{ type: String }],
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
