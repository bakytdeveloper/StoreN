const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');
const authenticateToken = require("../middleware/authenticateToken");


// Создание нового продавца
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, phone, companyName, companyDescription, address } = req.body;

    try {
        const existingSeller = await Seller.findOne({ email });

        if (existingSeller) {
            return res.status(400).json({ message: 'Seller already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createdAt = new Date(); // Устанавливаем текущую дату и время

        const newSeller = new Seller({
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword,
            address, // Вы можете добавить свойство address в форму и обработать его здесь
            phoneNumber: phone,
            companyName,
            companyDescription,
            createdAt, // Устанавливаем дату и время создания
            status: 'pending', // Установка значения по умолчанию для поля status
            role: 'seller', // Установка значения по умолчанию для поля role
            products: [] // Установка пустого массива для продуктов
        });

        await newSeller.save();

        const token = jwt.sign({ seller: newSeller }, process.env.SECRET_KEY);

        res.status(201).json({ seller: newSeller, token, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});







// Аутентификация продавца
// Аутентификация продавца
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const seller = await Seller.findOne({ email });

        if (!seller) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, seller.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (seller.status !== 'approved') {
            return res.status(401).json({ message: 'Seller is not approved yet' });
        }

        const token = jwt.sign({ sellerId: seller._id, email: seller.email }, process.env.SECRET_KEY);
        res.json({ seller, token, success: true });
    } catch (error) {
        console.error('Error authenticating seller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});




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

// Получение информации о текущем продавце
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const seller = await Seller.findById(req.user.sellerId).select('-password');
        res.json(seller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Создание нового товара
router.post('/products', authenticateToken, async (req, res) => {
    try {
        const { name, description, price, category, type, brand, characteristics, images, quantity = 10 } = req.body;
        const newProduct = { name, description, price, category, type, brand, characteristics, images, quantity };
        const updatedSeller = await Seller.findByIdAndUpdate(req.user.sellerId, { $push: { products: newProduct } }, { new: true });

        res.json(updatedSeller.products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Удаление товара
router.delete('/products/:productId', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.params;
        const updatedSeller = await Seller.findByIdAndUpdate(req.user.sellerId, { $pull: { products: { _id: productId } } }, { new: true });

        res.json(updatedSeller.products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Получение списка всех товаров продавца
router.get('/products', authenticateToken, async (req, res) => {
    try {
        const seller = await Seller.findById(req.user.sellerId);
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        res.json(seller.products);
    } catch (error) {
        console.error('Error fetching seller products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
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




module.exports = router;