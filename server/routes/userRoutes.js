const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Order = require('../models/Order');
const authenticateToken = require("../middleware/authenticateToken");


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

        res.status(201).json({ user: newUser, token, success: true  });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});



//
// // Аутентификация пользователя
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//
//     try {
//         /** @type {Object} */
//
//         const user = await User.findOne({ email });
//
//         if (!user) {
//             return res.status(401).json({ message: 'Неверно указанны учетные данные' });
//         }
//
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Неверно указанны учетные данные' });
//         }
//
//         let role = user.role;
//
//         // Добавим проверку для администратора
//         if (email === 'admin@gmail.com' && password === 'admin') {
//             name = "Admin";
//             role = 'admin';
//         }
//
//         // Создаем токен для пользователя
//         const token = jwt.sign({ userId: user._id, email: user.email, role }, process.env.SECRET_KEY);
//         console.log(token, role)
//         res.json({ user, token, success: true });
//     } catch (error) {
//         res.status(500).json({ message: error.message, success: false });
//     }
// });




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
        const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.SECRET_KEY);
        console.log(token, user.role);
        res.json({ user, token, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});




// Получение информации о текущем пользователе
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
router.patch('/profile', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true }).select('-password');
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

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
