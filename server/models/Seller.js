


const mongoose = require('mongoose');

const characteristicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: String, required: true },
});

const statusHistorySchema = new mongoose.Schema({
    status: { type: String, enum: ['pending', 'approved','suspend'], required: true },
    time: { type: Date, default: Date.now },
});

const sellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    companyName: { type: String, required: true }, // Название компании покупателя
    companyDescription: { type: String }, // Описание компании
    status: { type: String, enum: ['pending', 'approved', 'suspend'], default: 'pending' },
    role: { type: String, enum: ['seller'], default: 'seller' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // Ссылка на продукты продавца
    createdAt: { type: Date, default: Date.now },
    statusHistory: [statusHistorySchema], // Добавлено поле для хранения истории статусов
    isProductsVisible: { type: Boolean, default: true }, // Добавлено поле для видимости товаров
    lastVisibilityChange: { type: Date, default: Date.now  }, // Добавлено поле для хранения времени последнего изменения видимости товаров
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] // Добавлено поле для хранения заказов
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
