const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');
const authenticateToken = require("../middleware/authenticateToken");

// Создание нового продавца
// // Создание нового продавца
// router.post('/register', async (req, res) => {
//     const { firstName, lastName, email, password, phone, companyName, companyDescription } = req.body;
//
//     try {
//         const existingSeller = await Seller.findOne({ email });
//
//         if (existingSeller) {
//             return res.status(400).json({ message: 'Seller already exists' });
//         }
//
//         const hashedPassword = await bcrypt.hash(password, 10);
//
//         const newSeller = new Seller({
//             firstName,
//             lastName,
//             email,
//             password: hashedPassword,
//             phone,
//             companyName,
//             companyDescription
//         });
//
//         await newSeller.save();
//
//         const token = jwt.sign({ seller: newSeller }, process.env.SECRET_KEY);
//
//         res.status(201).json({ seller: newSeller, token, success: true });
//     } catch (error) {
//         res.status(500).json({ message: error.message, success: false });
//     }
// });


// Создание нового продавца
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, phone, companyName, companyDescription, address } = req.body;

    try {
        const existingSeller = await Seller.findOne({ email });

        if (existingSeller) {
            return res.status(400).json({ message: 'Seller already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newSeller = new Seller({
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword,
            address, // Вы можете добавить свойство address в форму и обработать его здесь
            phoneNumber: phone,
            companyName,
            companyDescription,
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
// Обновление информации о текущем продавце
router.put('/update-profile/:sellerId', authenticateToken, async (req, res) => {
    const sellerId = req.params.sellerId;
    const {  name, email , address, phoneNumber} = req.body;

    try {
        // Находим продавца
        const existingSeller = await Seller.findById(sellerId);

        if (!existingSeller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        // Обновляем данные профиля
        existingSeller.name = name; // Добавлено для обновления имени
        existingSeller.email = email; // Добавлено для обновления email
        existingSeller.address = address;
        existingSeller.phoneNumber = phoneNumber;

        // Сохраняем обновленного продавца в базе данных
        const updatedSeller = await existingSeller.save();

        // Возвращаем успешный ответ
        res.json({ message: 'Profile updated successfully', seller: updatedSeller });
    } catch (error) {
        console.error('Error updating seller profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;
