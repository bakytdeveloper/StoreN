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
const fs = require("fs");
const sharp = require("sharp");
const {sendOTP} = require("./smtp/otpService");
dotenv.config();

const app = express();
app.use(cors());

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5506;


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
app.use(router);




// Папка для загрузки оригинальных изображений
const uploadDir = path.join(__dirname, 'uploads');

// Настройка хранилища для Multer
const storage = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, uploadDir); // Путь для сохранения оригинальных файлов
        },
        filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname)); // Уникальное имя файла
        }
});



// Инициализация Multer с хранилищем
const upload = multer({ storage: storage });

// Обработка POST запроса на загрузку изображения
app.post('/api/sellers/upload', upload.single('image'), async (req, res) => {
        try {
                // Путь к загруженному файлу
                const originalImagePath = path.join(uploadDir, req.file.filename);
                // Изменение размера изображения до 600x900px и сжатие до 250KB
                const resizedImage = await sharp(originalImagePath)
                    .resize({ width: 600, height: 900 })
                    .toFormat('jpeg')  // Формат jpeg для уменьшения размера файла
                    .jpeg({ quality: 80 }) // Качество сжатия JPEG
                    .toBuffer();

                // Путь для сохранения измененного изображения
                const resizedImagePath = path.join(uploadDir, 'resized_' + req.file.filename);

                // Сохранение измененного изображения
                fs.writeFileSync(resizedImagePath, resizedImage);

                // Отправка успешного ответа с URL измененного изображения
                res.status(200).json({ imageUrl: `/uploads/${path.basename(resizedImagePath)}` });

                // Удаление оригинального изображения (если требуется)
                fs.unlinkSync(originalImagePath);
        } catch (error) {
                console.error('Error uploading image:', error);
                res.status(400).json({ message: 'Ошибка при загрузке и обработке изображения' });
        }
});




// app.post('/api/auth/sendOtp', (req, res) => {
//         const { email } = req.body;
//         sendOTP(email);
//         console.log(`Sending OTP to ${email}`);
//         res.status(200).json({ message: 'OTP sent' });
// });





// Обслуживание статических файлов в папке uploads
app.use('/uploads', express.static(uploadDir));

// Запуск сервера
app.listen(PORT, () => {
        console.log(`СЕРВЕР РАБОТАЕТ НА ${PORT} ПОРТУ!!!`);
});



// "start": "nodemon server.js",

// "nodemon": "^3.0.2"