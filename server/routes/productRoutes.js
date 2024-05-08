const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authenticateToken = require("../middleware/authenticateToken");
const Seller = require("../models/Seller");



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


// Получение списка всех категорий
router.get('/categories', async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.json({ categories });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Получение списка всех категорий
router.get('/types', async (req, res) => {
    try {
        const types = await Product.distinct('type');
        res.json({ types });
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
router.post('/', async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Permission denied' });
    }

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
});




// Получение списка всех типов товаров по категории
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


// Обновление информации о продукте по ID (только для администратора)
router.put('/:id', async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Permission denied' });
    }

    const { name, description, price, category, type, brand, characteristics, images } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
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
});


// Удаление продукта по ID (только для администратора)
router.delete('/:id', async (req, res) => {
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



// // Получение всех товаров текущего продавца
// Получение всех товаров данного продавца на основе ID продукта
router.get('/:productId/seller/products', async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const sellerId = product.seller; // Получаем ID продавца из продукта
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
        const productType = product.type; // Получаем тип товара из продукта
        const relatedProducts = await Product.find({ type: productType });
        res.json(relatedProducts);
    } catch (error) {
        console.error('Error fetching related products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});






module.exports = router;
