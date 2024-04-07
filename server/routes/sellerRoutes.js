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



module.exports = router;
