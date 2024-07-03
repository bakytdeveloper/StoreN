const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const {authenticateToken} = require("../middleware/authenticateToken");
const Seller = require("../models/Seller");
const {checkRole} = require("../middleware/authenticateToken");




// Добавление нового продукта
router.post('/add', authenticateToken, async (req, res) => {
    const { name, price, description, seller } = req.body;

    try {
        const newProduct = new Product({
            name,
            price,
            description,
            seller
        });

        await newProduct.save();

        res.status(201).json({ product: newProduct, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// Получение списка всех продуктов
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Роут для получения полов товаров
router.get('/genders', async (req, res) => {
    try {
        const genders = await Product.distinct('gender');
        res.json({ genders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Получение списка всех категорий
router.get('/categories', async (req, res) => {
    try {
        const { gender } = req.query;
        let query = {};
        if (gender) {
            query.gender = gender;
        }
        const categories = await Product.distinct('category', query);
        res.json({ categories });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Получение списка всех типов товаров по категории
router.get('/types', async (req, res) => {
    try {
        const { gender, category } = req.query;
        let query = {};
        if (gender) {
            query.gender = gender;
        }
        if (category) {
            query.category = category;
        }
        const types = await Product.distinct('type', query);
        res.json({ types });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Получение всех типов товаров по категории
router.get('/types/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const { type } = req.query;
        let query = { category };
        if (type) {
            query = { ...query, type };
        }
        const types = await Product.distinct('type', { category });
        const products = await Product.find(query);
        res.json({ types, products });
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Роут для фильтрации продуктов по полу, категории и типу
router.get('/products', async (req, res) => {
    try {
        const { gender, category, type, search } = req.query;

        let query = {};
        if (gender) {
            query.gender = gender;
        }
        if (category) {
            query.category = category;
        }
        if (type) {
            query.type = type;
        }
        if (search) {
            query.$or = [
                { name: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') },
                { brand: new RegExp(search, 'i') },
                { type: new RegExp(search, 'i') }
            ];
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Получение списка самых новых продуктов
router.get('/newest', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 18; // Получаем limit из запроса, либо используем значение 18 по умолчанию
        const newestProducts = await Product.find().sort({ createdAt: -1 }).limit(limit);
        res.json(newestProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Получение информации о конкретном продукте по ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Создание нового продукта (только для администратора)
router.post('/', authenticateToken,  checkRole(['admin']), async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Permission denied' });
    }
    const {
        name,
        description,
        price,
        category,
        direction,
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
        direction,
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
});

// Обновление информации о продукте по ID (только для администратора)
router.put('/:id', authenticateToken,  checkRole(['admin']), async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Permission denied' });
    }
    const { name, description, price, category, direction, type, brand, characteristics, images } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                price,
                category,
                direction,
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
});

// Удаление продукта по ID (только для администратора)
router.delete('/:id', authenticateToken,  checkRole(['admin']), async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Permission denied' });
    }
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Получение всех товаров данного продавца на основе ID продукта
router.get('/:productId/seller/products', async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const sellerId = product.seller;
        const sellerProducts = await Product.find({ seller: sellerId });
        res.json(sellerProducts);
    } catch (error) {
        console.error('Error fetching related seller products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Получение всех товаров текущего типа
router.get('/related/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const productType = product.type;
        const relatedProducts = await Product.find({ type: productType });
        res.json(relatedProducts);
    } catch (error) {
        console.error('Error fetching related products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Получение аксессуаров по направлению
router.get('/accessories/:direction', async (req, res) => {
    try {
        const { direction } = req.params;
        const accessories = await Product.find({ direction });
        res.json(accessories);
    } catch (error) {
        console.error('Error fetching accessories by direction:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;