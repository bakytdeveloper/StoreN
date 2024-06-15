const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Seller = require('../models/Seller');
const authenticateToken = require('../middleware/authenticateToken');

// Проверка уникальности email
router.get('/checkEmail', async (req, res) => {
    const { email } = req.query;
    try {
        const existingUser = await User.findOne({ email });
        const existingSeller = await Seller.findOne({ email });

        const unique = !existingUser && !existingSeller;

        res.json({ unique });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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
            role: role || 'customer',
        });
        await newUser.save();
        const token = jwt.sign({ user: newUser }, process.env.SECRET_KEY);
        res.status(201).json({ user: newUser, token, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// Регистрация нового продавца
router.post('/seller/register', async (req, res) => {
    const { firstName, lastName, email, password, phone, companyName, companyDescription, address } = req.body;
    try {
        const existingSeller = await Seller.findOne({ email });
        if (existingSeller) {
            return res.status(400).json({ message: 'Seller already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdAt = new Date();
        const newSeller = new Seller({
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword,
            address,
            phoneNumber: phone,
            companyName,
            companyDescription,
            createdAt,
            status: 'pending',
            role: 'seller',
            products: [],
        });
        await newSeller.save();
        const token = jwt.sign({ seller: newSeller }, process.env.SECRET_KEY);
        res.status(201).json({ seller: newSeller, token, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});



// Аутентификация пользователя, администратора и продавца
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Проверка администратора
        if (email.toLowerCase() === 'a' && password === 'a') {
            const adminRole = 'admin';
            const adminToken = jwt.sign({ email, role: adminRole }, process.env.SECRET_KEY);
            return res.json({ user: { name: 'Admin', role: adminRole }, token: adminToken, success: true });
        }

        // Проверка пользователя
        let user = await User.findOne({ email });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const token = jwt.sign({ userId: user._id, address: user.profile, email: user.email, role: user.role }, process.env.SECRET_KEY);
                return res.json({ user, token, success: true });
            }
        }

        // Проверка продавца
        let seller = await Seller.findOne({ email });
        if (seller) {
            const isPasswordValid = await bcrypt.compare(password, seller.password);
            if (isPasswordValid) {
                if (seller.status !== 'approved') {
                    return res.status(401).json({ message: 'Seller is not approved yet' });
                }
                const token = jwt.sign({ sellerId: seller._id, email: seller.email, role: seller.role }, process.env.SECRET_KEY);
                return res.json({ user: seller, token, success: true });
            }
        }

        // Если ни один из логинов не подошел
        return res.status(401).json({ message: 'Invalid email or password' });

    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});


// // Аутентификация пользователя и администратора
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         let user;
//
//         if (email.toLowerCase() === 'a' && password === 'a') {
//             const adminRole = 'admin';
//             const adminToken = jwt.sign({ email, role: adminRole }, process.env.SECRET_KEY);
//             return res.json({ user: { name: 'Admin', role: adminRole }, token: adminToken, success: true });
//         } else {
//             user = await User.findOne({ email });
//             if (!user) {
//                 return res.status(401).json({ message: 'Invalid email or password' });
//             }
//             const isPasswordValid = await bcrypt.compare(password, user.password);
//             if (!isPasswordValid) {
//                 return res.status(401).json({ message: 'Invalid email or password' });
//             }
//         }
//
//         const token = jwt.sign({ userId: user._id, address: user.profile, email: user.email, role: user.role }, process.env.SECRET_KEY);
//         res.json({ user, token, success: true });
//     } catch (error) {
//         res.status(500).json({ message: error.message, success: false });
//     }
// });


// // Аутентификация продавца
// router.post('/seller/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const seller = await Seller.findOne({ email });
//         if (!seller) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }
//         const isPasswordValid = await bcrypt.compare(password, seller.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }
//         if (seller.status !== 'approved') {
//             return res.status(401).json({ message: 'Seller is not approved yet' });
//         }
//         const token = jwt.sign({ sellerId: seller._id, email: seller.email, role: seller.role }, process.env.SECRET_KEY);
//         res.json({ seller, token, success: true });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });



// Получение информации о текущем пользователе
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Получение информации о текущем продавце
router.get('/seller/profile', authenticateToken, async (req, res) => {
    try {
        const seller = await Seller.findById(req.user.sellerId).select('-password');
        res.json(seller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
