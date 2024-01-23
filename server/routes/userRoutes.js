const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Order = require('../models/Order');
const authenticateToken = require("../middleware/authenticateToken");




// Регистрация нового пользователя
router.post('/register', async (req, res) => {
    const { name, email, password, role, profile } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            profile,
            role: role || 'customer', // Если не указана роль, по умолчанию 'guest'
        });

        // Для создания администратора, расскомментируйте следующую строку
        // newUser.role = 'admin';

        await newUser.save();

        // Создаем токен для нового пользователя
        const token = jwt.sign({ user: newUser }, process.env.SECRET_KEY);

        res.status(201).json({ user: newUser, token, success: true  });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});





// Аутентификация пользователя
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user;

        // Добавим проверку для администратора
        if (email === 'admin@gmail.com' && password === 'admin') {
            // Если введенные данные администратора
            const adminRole = 'admin';
            const adminToken = jwt.sign({ email, role: adminRole }, process.env.SECRET_KEY);

            return res.json({ user: { name: 'Admin', role: adminRole }, token: adminToken, success: true });
        } else {
            // Поиск пользователя
            user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: 'Неверно указанны учетные данные' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Неверно указанны учетные данные' });
            }
        }

        // Создаем токен для пользователя
        const token = jwt.sign({ userId: user._id, address: user.profile, email: user.email, role: user.role }, process.env.SECRET_KEY);
        console.log(token, user.role);
        res.json({ user, token, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});




// Получение информации о текущем пользователе
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        // Теперь req.user должен быть установлен после прохождения middleware
        const user = await User.findById(req.user.userId).select('-password');

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Обновление информации о текущем пользователе
router.put('/update-profile', authenticateToken, async (req, res) => {
    try {
        console.log('Update profile endpoint reached');
        console.log('Request body:', req.body);

        const { userId, profile } = req.body;

        if (!userId || !profile || (!profile.address && !profile.phoneNumber)) {
            return res.status(400).json({ message: 'Invalid request. User ID and profile data are required.' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { profile } },
            { new: true }
        ).select('-password');

        console.log('Updated user:', updatedUser);
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(400).json({ message: error.message });
    }
});





router.put('/update-profile/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { address, phoneNumber } = req.body;

    try {
        // Находим пользователя
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Обновляем данные профиля
        existingUser.orders.address = address;
        existingUser.orders.phoneNumber = phoneNumber;

        // Сохраняем обновленного пользователя в базе данных
        const updatedUser = await existingUser.save();

        // Теперь найдем последний заказ пользователя и обновим в нем данные
        const latestOrder = await Order.findOne({ user: userId }).sort({ date: -1 });

        if (latestOrder) {
            latestOrder.address = address;
            latestOrder.phoneNumber = phoneNumber;
            await latestOrder.save();
        }

        res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// 0703 524643


// Получение истории заказов текущего пользователя
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('products.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
