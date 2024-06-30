const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');
const {authenticateToken} = require("../middleware/authenticateToken");
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");
const fs = require("fs");



// Получение списка всех продавцов
router.get('/', async (req, res) => {
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

// Обновление информации о продавце

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
router.put('/update-profile', authenticateToken, async (req, res) => {
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
router.put('/update-password', authenticateToken, async (req, res) => {
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
router.post('/products', authenticateToken, async (req, res) => {
    try {
        const { name, description, price, category, direction, type, brand, gender, characteristics, images, sizes, colors, quantity = 10 } = req.body;

        const sellerId = req.user.sellerId;

        const newProduct = new Product({
            name,
            description,
            price,
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


        // Добавление ID нового продукта к массиву продуктов продавца
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



// Удаление товара
// Удаление товара
router.delete('/products/:productId', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.params;
        // Удаляем товар из базы данных по _id
        await Product.findByIdAndDelete(productId);
        // Удаляем ссылку на товар из массива products у продавца
        const updatedSeller = await Seller.findByIdAndUpdate(
            req.user.sellerId,
            { $pull: { products: productId } },
            { new: true }
        );
        // Возвращаем обновленный список продуктов продавца
        res.json(updatedSeller.products);
    } catch (error) {
        res.status(500).json({ message: error.message });
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


router.get('/sales-history', authenticateToken, async (req, res) => {
    try {
        const { page = 1, perPage = 15 } = req.query;
        const sellerId = req.user.sellerId;
        const sellerProducts = await Product.find({ seller: sellerId });

        const orders = await Order.aggregate([
            { $match: { 'products.product': { $in: sellerProducts.map(product => product._id) } } },
            { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
            { $addFields: { user: { $arrayElemAt: ['$user', 0] } } },
            { $lookup: { from: 'products', localField: 'products.product', foreignField: '_id', as: 'productDetails' } },
            { $addFields: { products: { $filter: { input: '$products', as: 'product', cond: { $in: ['$$product.product', sellerProducts.map(product => product._id)] } } } } },
            { $addFields: { products: { $map: { input: '$products', as: 'product', in: { $mergeObjects: ['$$product', { product: { $arrayElemAt: [{ $filter: { input: '$productDetails', as: 'pd', cond: { $eq: ['$$pd._id', '$$product.product'] } } }, 0] } }] } } } } },
            { $addFields: { totalAmount: { $reduce: { input: '$products', initialValue: 0, in: { $add: ['$$value', { $multiply: ['$$this.product.price', '$$this.quantity'] }] } } } } },
            { $project: { guestInfo: 1, cart: 1, products: 1, totalAmount: 1, status: 1, date: 1, address: 1, phoneNumber: 1, paymentMethod: 1, comments: 1, user: { name: 1, email: 1 } } },
            { $sort: { date: -1 } }, // Сортировка по убыванию даты
            { $skip: (page - 1) * perPage },
            { $limit: parseInt(perPage, 10) }
        ]);

        const totalOrders = await Order.countDocuments({ 'products.product': { $in: sellerProducts.map(product => product._id) } });
        res.json({ orders, totalOrders, page: parseInt(page, 15), perPage: parseInt(perPage, 15) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




router.put('/:id', async (req, res) => {
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



router.delete('/images/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, '../uploads', imageName);

    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error('Error deleting image:', err);
            return res.status(500).json({ error: 'Failed to delete image' });
        }
        res.status(200).json({ message: 'Image deleted successfully' });
    });
});





module.exports = router;