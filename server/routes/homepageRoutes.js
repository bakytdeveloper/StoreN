// routes/homepage.js
const express = require('express');
const router = express.Router();
const Homepage = require('../models/Homepage');

// Получение данных о главной странице
router.get('/', async (req, res) => {
    try {
        const homepage = await Homepage.findOne();
        res.json(homepage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Создание или обновление данных о главной странице
router.post('/', async (req, res) => {
    try {
        const { sliderImages, genderImages, promotions } = req.body;
        const homepage = await Homepage.findOneAndUpdate(
            {},
            { sliderImages, genderImages, promotions },
            { new: true, upsert: true }
        );
        res.json(homepage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Удаление изображения из слайдера
router.delete('/slider/:imageUrl', async (req, res) => {
    try {
        const { imageUrl } = req.params;
        const homepage = await Homepage.findOne();
        homepage.sliderImages = homepage.sliderImages.filter(url => url !== imageUrl);
        await homepage.save();
        res.json(homepage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Удаление изображения для полов
router.delete('/gender/:imageUrl', async (req, res) => {
    try {
        const { imageUrl } = req.params;
        const homepage = await Homepage.findOne();
        homepage.genderImages = homepage.genderImages.filter(url => url !== imageUrl);
        await homepage.save();
        res.json(homepage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Обновление акции
router.patch('/promotion', async (req, res) => {
    try {
        const { title, description, startDate, endDate } = req.body;
        const homepage = await Homepage.findOne();
        homepage.promotions = { title, description, startDate, endDate };
        await homepage.save();
        res.json(homepage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
