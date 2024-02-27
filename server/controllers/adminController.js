// server/controllers/adminController.js
const Product = require('../models/Product');

// Получение списка всех продуктов
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Создание нового продукта
const createProduct = async (req, res) => {
    const {
        name,
        description,
        price,
        category,
        type,
        brand,
        characteristics,
        images,
    } = req.body;

    const product = new Product({
        name,
        description,
        price,
        category,
        type,
        brand,
        characteristics,
        images,
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Редактирование продукта
const editProduct = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        description,
        price,
        category,
        type,
        brand,
        characteristics,
        images,
    } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                name,
                description,
                price,
                category,
                type,
                brand,
                characteristics,
                images,
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Удаление продукта
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    editProduct,
    deleteProduct,
};



// Помоги мне, пожалуйста, подскажи почему у меня на странице сайта отображается , только статическая информация  из VPS, а информация из бэкэнд части  из VPS , не попадает на страницу, хотя база данны подключенна к бэкэнд части кода на VPS. И в чём может быть проблема, я думал что в Nginx, где я создал свой путь к своему Nginx,
// по адресу /etc/nginx/sites-available/kiosk.kg :  server {
//     listen 80;
//     listen [::]:80;
//     server_name kiosk.kg;
//     # Корневая директория для фронтенда
//     root /var/www/kiosk.kg/html;
//     index index.html;
//     # Настройка обслуживания статических файлов  location / {
//         try_files $uri $uri/ /index.html;
// }
//
//     # Проксирование запросов на бэкенд
//     location /api {
//         proxy_pass http://localhost:5500;
//             proxy_http_version 1.1;
//         proxy_set_header Upgrade $http_upgrade;
//         proxy_set_header Connection 'upgrade';
//         proxy_set_header Host $host;
//         proxy_cache_bypass $http_upgrade;
//     }
// }