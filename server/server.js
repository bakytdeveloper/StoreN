const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
// const helmet = require('helmet');
const compression = require('compression');


// Роуты
const adminRoutes = require('./routes/adminRoutes'); // Добавлен импорт adminRoutes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5504;


// Подключение к базе данных
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('И БАЗА ДАННЫХ MONGODB ПОДКЛЮЧЕННА!!!'));

// Middleware
// app.use(cors());
// app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes); // Добавлен новый маршрут для администратора

app.use(compression());

// Запуск сервера
app.listen(PORT, () => {
        console.log(`СЕРВЕР РАБОТАЕТ НА ${PORT} ПОРТУ!!!`);
});



// "start": "nodemon server.js",

// "nodemon": "^3.0.2"