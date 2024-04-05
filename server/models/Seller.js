// // models/Seller.js
// const mongoose = require('mongoose');
//
// const productSchema = new mongoose.Schema({
//     category: { type: String, required: true },
//     type: { type: String, required: true },
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     // Другие поля для товара, такие как цена, количество и т.д.
// });
//
// const sellerSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true, unique: true  },
//     address: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
//     role: { type: String, enum: ['seller'], default: 'seller' },
//     products: [productSchema]
// });
//
// const Seller = mongoose.model('Seller', sellerSchema);
//
// module.exports = Seller;





// models/Seller.js
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
    brand: { type: String, required: true },
    characteristics: [characteristicSchema],
    images: [{ type: String }], // Добавлено поле для картинок
    quantity: { type: Number, required: true },
    // Другие поля для товара, если необходимо
});

const sellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    companyName: { type: String, required: true }, // Название компании покупателя
    companyDescription: { type: String }, // Описание компании
    status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
    role: { type: String, enum: ['seller'], default: 'seller' },
    products: [productSchema],
    createdAt: { type: Date, default: Date.now },

});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
