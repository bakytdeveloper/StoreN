const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
// const helmet = require('helmet');
const compression = require('compression');
const router = express.Router();


const apiRoutes = require('./routes/index');
const path = require("path");
const multer = require("multer");
dotenv.config();

const app = express();
app.use(cors());

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5504;


// Подключение к базе данных
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('И БАЗА ДАННЫХ MONGODB ПОДКЛЮЧЕННА!!!'));

// Middleware
// app.use(cors());
// app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api', apiRoutes);

app.use(compression());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(router);

// Настройка хранилища для multer
const storage = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, 'uploads/'); // Путь для сохранения файлов
        },
        filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname)); // Уникальное имя файла
        }
});

// Инициализация multer
const upload = multer({ storage: storage });

// Добавление маршрута для загрузки изображения
router.post('/api/sellers/upload', upload.single('image'), (req, res) => {
        if (!req.file) {
                return res.status(400).json({ message: 'Файл не загружен' });
        }
        res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
});


// Запуск сервера
app.listen(PORT, () => {
        console.log(`СЕРВЕР РАБОТАЕТ НА ${PORT} ПОРТУ!!!`);
});



// "start": "nodemon server.js",

// "nodemon": "^3.0.2"