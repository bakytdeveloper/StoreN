const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// // Регистрация нового пользователя
// router.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;
//
//     try {
//         const existingUser = await User.findOne({ email });
//
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }
//
//         const hashedPassword = await bcrypt.hash(password, 10);
//
//         const newUser = new User({
//             name,
//             email,
//             password: hashedPassword,
//         });
//
//         await newUser.save();
//
//         // Создаем токен для нового пользователя
//         const token = jwt.sign({ user: newUser }, process.env.SECRET_KEY);
//
//         res.status(201).json({ user: newUser, token });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });



// Регистрация нового пользователя
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

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
            role: role || 'customer', // Если не указана роль, по умолчанию 'guest'
        });

        // Для создания администратора, расскомментируйте следующую строку
        // newUser.role = 'admin';

        await newUser.save();

        // Создаем токен для нового пользователя
        const token = jwt.sign({ user: newUser }, process.env.SECRET_KEY);

        res.status(201).json({ user: newUser, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// Аутентификация пользователя
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        let role = user.role;

        // Добавим проверку для администратора
        if (email === 'admin@gmail.com' && password === 'admin') {
            role = 'admin';
        }

        // Создаем токен для пользователя
        const token = jwt.sign({ userId: user._id, email: user.email, role }, process.env.SECRET_KEY);

        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// // Аутентификация пользователя
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//
//     try {
//         const user = await User.findOne({ email });
//
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }
//
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }
//
//         // Создаем токен для пользователя
//         const token = jwt.sign({ user }, process.env.SECRET_KEY);
//
//         res.json({ user, token });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

module.exports = router;
