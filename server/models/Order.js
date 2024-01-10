// const mongoose = require('mongoose');
//
// const orderSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     userName: { type: String, required: true }, // Добавленное поле
//     products: [
//         {
//             product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//             quantity: { type: Number, required: true },
//         },
//     ],
//     totalAmount: { type: Number, required: true },
//     status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
//     date: { type: Date, default: Date.now },
// });
//
// const Order = mongoose.model('Order', orderSchema);
//
// module.exports = Order;






// // server/models/Order.js
//
// const mongoose = require('mongoose');
//
// const orderSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Зарегистрированный пользователь
//     guestInfo: {
//         name: { type: String, required: true },
//         email: { type: String, required: true },
//         // Дополнительные данные о госте, если необходимо
//     },
//     products: [
//         {
//             product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//             quantity: { type: Number, required: true },
//         },
//     ],
//     totalAmount: { type: Number, required: true },
//     status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
//     date: { type: Date, default: Date.now },
// });
//
// const Order = mongoose.model('Order', orderSchema);
//
// module.exports = Order;





// server/models/Order.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    guestInfo: {
        name: { type: String },
        email: { type: String },
    },
    cart: [cartItemSchema], // Добавлено поле для корзины
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    date: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
