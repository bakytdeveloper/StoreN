const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Order = require('../models/Order');
const {authenticateToken} = require("../middleware/authenticateToken");
const Seller = require("../models/Seller");
const {checkRole} = require("../middleware/authenticateToken");



// Обновление информации о текущем пользователе
router.put('/update-profile', authenticateToken,  checkRole(['customer']), async (req, res) => {
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



router.put('/update-profile/:userId', authenticateToken, async (req, res) => {
    const userId = req.params.userId;
    const { address, phoneNumber, name, email } = req.body;

    try {
        // Находим пользователя
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Обновляем данные профиля
        existingUser.orders.address = address;
        existingUser.orders.phoneNumber = phoneNumber;
        existingUser.name = name; // Добавлено для обновления имени
        existingUser.email = email; // Добавлено для обновления email

        // Сохраняем обновленного пользователя в базе данных
        const updatedUser = await existingUser.save();

        // Теперь найдем последний заказ пользователя и обновим в нем данные
        const latestOrder = await Order.findOne({ user: userId }).sort({ date: -1 });

        if (latestOrder) {
            latestOrder.address = address;
            latestOrder.phoneNumber = phoneNumber;
            await latestOrder.save();
        }

        // Возвращаем успешный ответ
        res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// Получение истории заказов текущего пользователя
router.get('/orders', authenticateToken,  checkRole(['customer']), async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('products.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Обновление пароля пользователя
router.put('/update-password/:userId', authenticateToken,  checkRole(['customer']), async (req, res) => {
    const userId = req.params.userId;
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Добавление роута для получения списка клиентов
router.get('/clients', async (req, res) => {
    try {
        const clients = await User.find({ role: 'customer' }).select('name email');
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Удаление клиента
router.delete('/clients/:id',  authenticateToken,  checkRole(['admin']), async (req, res) => {
    try {
        const clientId = req.params.id;
        await User.findByIdAndDelete(clientId);
        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting client', error });
    }
});

module.exports = router;