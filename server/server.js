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

const PORT = process.env.PORT || 5050;


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


//
// server {
//     listen 80;
//     server_name kiosk.kg;
//
//     # Настройка прокси для фронтенда
//     location / {
//         proxy_pass http://localhost:3000;
//     proxy_set_header Host $host;
//     proxy_set_header X-Real-IP $remote_addr;
//     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
//     proxy_set_header X-Forwarded-Proto $scheme;
// }
//
//     # Настройка прокси для бэкенда
//     location /api {
//         proxy_pass http://localhost:5502;
//             proxy_set_header Host $host;
//         proxy_set_header X-Real-IP $remote_addr;
//         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
//         proxy_set_header X-Forwarded-Proto $scheme;
//     }
// }
//





//
// user bakyt staff;
// worker_processes  auto;
//
// events {
//     worker_connections  1024;
// }
//
// http {
//     include       mime.types;
//     default_type  application/octet-stream;
//     error_log /var/log/nginx/error.log;
//     sendfile        on;
//     keepalive_timeout  65;
//
//     include /Users/bakyt/Desktop/StoreN/sites-available/kiosk.kg.conf;
// }
//













// server {
//     listen 80;
//     server_name kiosk.kg;
//
//     location / {
//         root /build;
//     index index.html index.htm;
//     try_files $uri $uri/ /index.html;
// }
//
//     location /api/ {
//         proxy_pass http://localhost:5502;
//     proxy_http_version 1.1;
//     proxy_set_header Upgrade $http_upgrade;
//     proxy_set_header Connection 'upgrade';
//     proxy_set_header Host $host;
//     proxy_cache_bypass $http_upgrade;
// }
// }


//
// server {
//     listen 80;
//     server_name kiosk.kg;
//
//     # Настройка прокси для фронтенда
//     location / {
//         root /root/build;  # Изменяем путь к корню вашего сайта
//     index index.html index.htm;
//     try_files $uri $uri/ /index.html;
// }
//
//     # Настройка прокси для бэкенда
//     location /api/ {
//         proxy_pass http://localhost:5502;
//     proxy_http_version 1.1;
//     proxy_set_header Upgrade $http_upgrade;
//     proxy_set_header Connection 'upgrade';
//     proxy_set_header Host $host;
//     proxy_cache_bypass $http_upgrade;
// }
// }



