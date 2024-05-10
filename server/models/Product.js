


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
    characteristics: [characteristicSchema],
    images: [{ type: String }], // Добавлено поле для картинок
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' } // Ссылка на продавца

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
