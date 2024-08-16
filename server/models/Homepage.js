// // models/Homepage.js
// const mongoose = require('mongoose');
//
// const homepageSchema = new mongoose.Schema({
//     sliderImages: [String], // Массив URL-ов картинок для слайдера
//     genderImages: [String], // Массив URL-ов картинок для полов
//     promotions: {
//         title: String, // Название акции
//         description: String, // Описание акции
//         startDate: Date, // Дата начала акции
//         endDate: Date // Дата окончания акции
//     }
// });
//
// // module.exports = mongoose.model('Homepage', homepageSchema);
//
//
//
// const Homepage = mongoose.model('Homepage', homepageSchema);
//
// module.exports = Homepage;


// models/Homepage.js
const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    title: String,
    description: String,
    startDate: Date,
    endDate: Date
});

const sliderImageSchema = new mongoose.Schema({
    url: String,
    promotions: [promotionSchema]
});

const homepageSchema = new mongoose.Schema({
    sliderImages: [sliderImageSchema],
    genderImages: [String]
});

const Homepage = mongoose.model('Homepage', homepageSchema);

module.exports = Homepage;
