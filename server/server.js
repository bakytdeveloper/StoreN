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
const Product = require("./models/Product");
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

const uploadDir = 'uploads';

// Инициализация хранилища Multer
const storage = multer.diskStorage({
        destination: (req, file, cb) => {
                cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
                cb(null, Date.now() + path.extname(file.originalname));
        }
});

// Инициализация Multer с хранилищем
const upload = multer({ storage: storage });




// Добавьте этот тестовый роут в server.js
app.get('/api/products/debug', (req, res) => {
        console.log("=== Debug Products Request ===");
        console.log("Headers:", req.headers);
        console.log("Query params:", req.query);

        Product.find().limit(2) // Ограничиваем для теста
            .then(products => {
                    console.log("First product:", products[0]?.name);
                    res.json({ success: true, count: products.length, sample: products[0] });
            })
            .catch(err => {
                    console.error("DB Error:", err);
                    res.status(500).json({ error: err.message });
            });
});




// Обработка POST запроса на загрузку изображения
app.post('/api/sellers/upload', upload.single('image'), async (req, res) => {
        try {
                // Путь к загруженному файлу
                const originalImagePath = path.join(uploadDir, req.file.filename);

                // Получение информации о загруженном изображении
                const image = sharp(originalImagePath);
                const metadata = await image.metadata();

                let resizedImage;
                let resizedImagePath;

                // Проверка формата изображения
                if (metadata.format === 'png') {
                        // Если изображение в формате PNG, просто изменить его размер
                        resizedImage = await image
                            .resize({ width: 800, height: 800, fit: 'inside'  })
                            .toBuffer();
                        resizedImagePath = path.join(uploadDir, req.file.filename); // Сохранение с тем же именем
                } else {
                        // Если изображение не в формате PNG, изменить его размер и формат на JPEG
                        resizedImage = await image
                            .resize({ width: 800, height: 800, fit: 'inside'  })
                            .toFormat('jpeg')
                            .jpeg({ quality: 80 })
                            .toBuffer();
                        resizedImagePath = path.join(uploadDir, path.parse(req.file.filename).name + '.jpeg'); // Сохранение с расширением .jpeg
                }

                // Сохранение измененного изображения
                fs.writeFileSync(resizedImagePath, resizedImage);

                // Отправка успешного ответа с URL измененного изображения
                res.status(200).json({ imageUrl: `/uploads/${path.basename(resizedImagePath)}` });

                // Удаление оригинального изображения, если оно было преобразовано
                if (metadata.format !== 'png') {
                        fs.unlinkSync(originalImagePath);
                }
        } catch (error) {
                console.error('Error uploading image:', error);
                res.status(400).json({ message: 'Ошибка при загрузке и обработке изображения' });
        }
});

// Обслуживание статических файлов в папке uploads
app.use('/uploads', express.static(uploadDir));

// Запуск сервера
app.listen(PORT, () => {
        console.log(`СЕРВЕР РАБОТАЕТ НА ${PORT} ПОРТУ!!!`);
});


// "nodemon": "^3.0.2"