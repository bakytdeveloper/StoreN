// const mongoose = require('mongoose');
//
// const characteristicSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     value: { type: String, required: true },
// });
//
// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     category: { type: String, required: true },
//     type: { type: String, required: true },
//     brand: { type: String, required: true },
//     characteristics: [characteristicSchema],
//     images: [{ type: String }], // Добавлено поле для картинок
// });
//
// const Product = mongoose.model('Product', productSchema);
//
// module.exports = Product;
//
//
//
//
//
// // {
// //     name: 'Metcon 8',
// //     description: 'Мужские кроссовки Nike Metcon 8 для тренировок',
// //     price: 149.24,
// //     category: 'Обувь',
// //     type: 'Кроссовки',
// //     brand: 'Nike',
// //     characteristics: [
// //     { name: 'Инструкции по уходу', value: 'Машинная стирка' },
// //     { name: 'Материал подошвы', value: 'Резина' },
// //     { name: 'Высота вала', value: 'Ремешок на щиколотке' },
// //     { name: 'Внешний материал', value: 'Синтетический' },
// // ],
// //     images: ['https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/711q2ZXR7NL._AC_SY695_.jpg',
// //     'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71Anw+2OAqL._AC_SY695_.jpg',
// //     'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71xV1rsribL._AC_SY695_.jpg',
// //     'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71Ou58BpBKL._AC_SY695_.jpg',
// //     'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71D97d6mLRL._AC_SY695_.jpg',
// //     'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81SyenzQCmL._AC_SY695_.jpg'],
// // },
// // {
// //     name: 'Solar Glide 3',
// //     description: 'Мужские кроссовки Adidas Solar Glide 3',
// //     price: 89,
// //     category: 'Обувь',
// //     type: 'Кроссовки',
// //     brand: 'Adidas',
// //     characteristics: [
// //     { name: 'Инструкции по уходу', value: 'Машинная стирка' },
// //     { name: 'Материал подошвы', value: 'Резина' },
// //     { name: 'Тип закрытия', value: 'Зашнуровать' },
// //     { name: 'Подошва', value: 'Boost' },
// // ],
// //     images: ['https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61xoCQbuv9L._AC_SX695_.jpg',
// //     'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61-rICaHjJL._AC_SX695_.jpg',
// //     'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/615WRHAmEiL._AC_SX695_.jpg',
// //     'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/51sI7xLVgqL._AC_SX695_.jpg',
// // },






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
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
