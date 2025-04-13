const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');
const {authenticateToken, checkRole} = require("../middleware/authenticateToken");
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");


// Защищённый маршрут для получения списка всех продавцов
router.get('/active', authenticateToken, checkRole(['admin']), async (req, res) => {
    try {
        const sellers = await Seller.find();
        if (!sellers) {
            return res.status(404).json({ message: 'Sellers not found' });
        }
        res.json(sellers);
    } catch (error) {
        console.error('Error fetching sellers:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Получить всех продавцов (доступно только администраторам)
router.get('/', authenticateToken, checkRole(['admin']), async (req, res) => {
    try {
        const sellers = await Seller.find();
        if (!sellers) {
            return res.status(404).json({ message: 'Sellers not found' });
        }
        res.json(sellers);
    } catch (error) {
        console.error('Error fetching sellers:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Обновление статуса заказа
router.put('/update-status/:sellerId', async (req, res) => {
    const { sellerId } = req.params;
    const { status } = req.body;

    try {
        const updatedSeller = await Seller.findByIdAndUpdate(
            sellerId,
            {
                $set: { status },
                $push: { statusHistory: { status, time: Date.now() } },
            },
            { new: true }
        );

        if (updatedSeller) {
            res.json(updatedSeller);
        } else {
            res.status(404).json({ message: 'Seller not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Обновление информации о продавце
router.put('/update-profile', authenticateToken,  checkRole(['seller']), async (req, res) => {
    try {
        const { name, email, address, phoneNumber, companyName, companyDescription } = req.body;
        const updatedData = { name, email, address, phoneNumber, companyName, companyDescription };
        const updatedSeller = await Seller.findByIdAndUpdate(req.user.sellerId, updatedData, { new: true });

        res.json(updatedSeller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Смена пароля продавца
router.put('/update-password', authenticateToken,  checkRole(['seller']), async (req, res) => {
    try {
        const { newPassword } = req.body;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await Seller.findByIdAndUpdate(req.user.sellerId, { password: hashedPassword });

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Роут для создания нового товара
router.post('/products', authenticateToken, checkRole(['seller']), async (req, res) => {
    try {
        const { name, description, price, originalPrice, category, direction, type, brand, gender, characteristics, images, sizes, colors, quantity = 10 } = req.body;

        const sellerId = req.user.sellerId;

        const newProduct = new Product({
            name,
            description,
            price,
            originalPrice,
            category,
            direction,
            type,
            brand,
            gender,
            characteristics,
            images,
            sizes,
            colors,
            quantity,
            seller: sellerId
        });

        await newProduct.save();

        const updatedSeller = await Seller.findByIdAndUpdate(
            sellerId,
            { $push: { products: newProduct._id } }, // Добавление только ID продукта
            { new: true }
        );

        res.json(updatedSeller.products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.delete('/remove-image', authenticateToken, async (req, res) => {
    const { imageUrl } = req.body;
    try {
        const filePath = path.join(__dirname, '..', 'uploads', path.basename(imageUrl));
        if (fs.existsSync(filePath)) {
            // Удаление файла
            fs.unlinkSync(filePath);
        }

        // Удаление ссылки на изображение из базы данных
        await Product.updateMany({}, { $pull: { images: imageUrl } });

        res.status(200).send({ message: 'Изображение успешно удалено' });
    } catch (error) {
        console.error('Ошибка при удалении изображения:', error);
        res.status(500).send({ message: 'Ошибка при удалении изображения' });
    }
});


router.delete('/products/:productId', authenticateToken, checkRole(['seller']), async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Товар не найден' });
        }

        // Удаляем изображения товара с сервера
        for (const imageUrl of product.images) {
            const imagePath = path.join(__dirname, '..', 'uploads', path.basename(imageUrl));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        // Удаляем товар из базы данных
        await Product.findByIdAndDelete(productId);

        // Удаляем ссылку на товар у продавца
        await Seller.findByIdAndUpdate(
            req.user.sellerId,
            { $pull: { products: productId } },
            { new: true }
        );
        res.json({ message: 'Товар и его изображения успешно удалены' });
    } catch (error) {
        console.error('Ошибка при удалении товара:', error);
        res.status(500).json({ message: error.message });
    }
});

router.delete('/images/:imageName', authenticateToken, checkRole(['seller']), async (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, '../uploads', imageName);

    try {
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        // Удаление ссылки на изображение из базы данных
        const imageUrl = `${process.env.REACT_APP_API_URL}/uploads/${imageName}`;
        await Product.updateMany({}, { $pull: { images: imageUrl } });

        res.status(200).json({ message: 'Изображение успешно удалено' });
    } catch (err) {
        console.error('Ошибка при удалении изображения:', err);
        res.status(500).json({ message: 'Не удалось удалить изображение' });
    }
});






router.get('/products', authenticateToken, async (req, res) => {
    try {
        // Получаем ID текущего продавца из аутентификационного токена
        const sellerId = req.user.sellerId;

        // Получаем все товары текущего продавца
        const sellerProducts = await Product.find({ seller: sellerId });

        res.json(sellerProducts);
    } catch (error) {
        console.error('Ошибка при получении товаров продавца:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});


// Получение информации о конкретном товаре продавца
router.get('/products/:productId', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.params;
        const seller = await Seller.findById(req.user.sellerId);
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        const product = seller.products.find(prod => prod._id.toString() === productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching seller product details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Изменение информации о товаре
router.put('/products/:productId', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/sales-history', authenticateToken, checkRole(['seller']), async (req, res) => {
    try {
        const { page = 1, perPage = 15 } = req.query;
        const sellerId = req.user.sellerId;

        // Проверяем, существует ли sellerId
        if (!mongoose.Types.ObjectId.isValid(sellerId)) {
            return res.status(400).json({ message: "Invalid seller ID" });
        }

        // Получаем заказы текущего продавца
        const ordersQuery = Order.aggregate([
            { $unwind: '$products' },
            { $match: { 'products.seller.id': new mongoose.Types.ObjectId(sellerId) } },
            { $group: {
                    _id: '$_id',
                    date: { $first: '$date' },
                    status: { $first: '$status' },
                    products: { $push: '$products' },
                    totalAmount: { $sum: { $multiply: ['$products.quantity', '$products.price'] } },
                    user: { $first: '$user' }
                }},
            { $sort: { date: -1 } },
            { $skip: (page - 1) * perPage },
            { $limit: parseInt(perPage, 10) }
        ]);

        const orders = await ordersQuery;

        // Считаем общее количество заказов
        const totalOrders = await Order.countDocuments({
            'products.seller.id': new mongoose.Types.ObjectId(sellerId)
        });

        // Отправляем ответ клиенту
        res.json({ orders, totalOrders, page: parseInt(page, 10), perPage: parseInt(perPage, 10) });
    } catch (error) {
        console.error("Error fetching sales history:", error);
        res.status(500).json({ message: error.message });
    }
});




router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



// Получение информации о продавце по ID
router.get('/:sellerId', async (req, res) => {
    const { sellerId } = req.params;

    try {
        const seller = await Seller.findById(sellerId);
        if (!seller) {
            return res.status(404).json({ message: 'Продавец не найден' });
        }
        res.json(seller);
    } catch (error) {
        console.error('Ошибка при получении информации о продавце:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});


// Удаление продавца и его товаров
router.delete('/:id', authenticateToken, checkRole(['admin']), async (req, res) => {
    try {
        const sellerId = req.params.id;

        // Удаление всех продуктов, связанных с продавцом
        await Product.deleteMany({ seller: sellerId });

        // Удаление продавца
        await Seller.findByIdAndDelete(sellerId);

        res.status(200).json({ message: 'Seller and associated products deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting seller and products', error });
    }
});




// Роут для изменения видимости товаров продавца
router.put('/:id/toggle-products-visibility',  authenticateToken, checkRole(['seller']), async (req, res) => {
    try {
        const sellerId = req.params.id;
        const seller = await Seller.findById(sellerId);

        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        seller.isProductsVisible = !seller.isProductsVisible;
        seller.lastVisibilityChange = new Date();

        await seller.save();

        res.json({
            message: 'Products visibility updated',
            isProductsVisible: seller.isProductsVisible,
            lastVisibilityChange: seller.lastVisibilityChange
        });
    } catch (error) {
        console.error('Error toggling products visibility:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Добавьте новый маршрут для получения статуса продавца
router.get('/seller-status/:sellerId', async (req, res) => {
    const { sellerId } = req.params;

    try {
        const seller = await Seller.findById(sellerId);
        if (seller) {
            res.json({ status: seller.status });
        } else {
            res.status(404).json({ message: 'Seller not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;