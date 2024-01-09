const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

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


// // Получение списка всех типов товаров по категории
// router.get('/types/:category', async (req, res) => {
//     try {
//         const types = await Product.distinct('type', { category: req.params.category });
//         const products = await Product.find({ category: req.params.category });
//
//         res.json({ types, products });
//     } catch (error) {
//         console.error('Error fetching products by category:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });



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




module.exports = router;
