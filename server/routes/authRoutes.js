const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Seller = require('../models/Seller');
const {checkRole} = require("../middleware/authenticateToken");
const {authenticateToken} = require('../middleware/authenticateToken');
const {verifyOTP} = require("../smtp/otpService");
const {sendOTP} = require("../smtp/otpService");
const {transporter} = require('../smtp/otpService');

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


router.post('/check-email', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        const seller = await Seller.findOne({ email: email.toLowerCase() });

        if (user || seller) {
            return res.json({ exists: true });
        }

        return res.json({ exists: false });
    } catch (error) {
        console.error('Error checking email:', error);
        return res.status(500).send('Internal Server Error');
    }
});


// Маршрут для отправки OTP
router.post('/send-otp', (req, res) => {
    const { email } = req.body;
    sendOTP(email);
    res.status(200).json({ message: 'OTP sent' });
});

// Маршрут для проверки OTP
router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    const isValid = verifyOTP(email, otp);
    if (isValid) {
        res.status(200).json({ message: 'OTP verified' });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
});


router.post('/register', async (req, res) => {
    const { email, password, name, otp } = req.body;
    if (!verifyOTP(email, otp)) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

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
            role: 'customer', // or assign based on your logic
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

        const dateNew = new Date();

        const mailOptions = {
            from: 'your-email@gmail.com', // Замените на ваш email
            to: 'bakytdeveloper@gmail.com', // Email администратора
            subject: 'Новый запрос на регистрация продавца',
            text: `
                Имя: ${firstName} ${lastName}
                Электронная почта: ${email}
                Телефон: ${phone}
                Название компании: ${companyName}
                О компании: ${companyDescription}
                Адрес: ${address}
                Время заявки: ${dateNew}
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Email sent: ' + info.response);
        });

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


router.post('/login/admin', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email.toLowerCase() === 'a' && password === 'a') {
            const adminRole = 'admin';
            const adminToken = jwt.sign({ adminId: 'admin', email, role: adminRole }, process.env.SECRET_KEY);
            return res.json({ user: { name: 'Admin', role: adminRole }, token: adminToken, success: true });
        }
        // Если администратор не найден
        return res.status(401).json({ message: 'Invalid email or password' });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});



// Получение информации о текущем пользователе
router.get('/profile', authenticateToken,  checkRole(['customer']), async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Обновление профиля пользователя
router.put('/profile/:userId', authenticateToken,  checkRole(['customer']), async (req, res) => {
    const userId = req.params.userId;
    const { address, phoneNumber } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { address, phoneNumber },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Получение информации о текущем продавце
router.get('/seller/profile', authenticateToken,  checkRole(['seller']), async (req, res) => {
    try {
        const seller = await Seller.findById(req.user.sellerId).select('-password');
        res.json(seller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Обновление пароля пользователя по email
router.put('/update-password-by-email', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
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


module.exports = router;
