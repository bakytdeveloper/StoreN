const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');
const authenticateToken = require("../middleware/authenticateToken");
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");


// Создание нового продавца
router.post('/register', async (req, res) => {
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
            products: []
        });

        await newSeller.save();

        const token = jwt.sign({ seller: newSeller }, process.env.SECRET_KEY);

        res.status(201).json({ seller: newSeller, token, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// Проверка уникальности email
router.get('/checkEmail', async (req, res) => {
    const { email } = req.query;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.json({ unique: false });
        } else {
            res.json({ unique: true });
        }
    } catch (error) {
        console.error('Error checking email uniqueness:', error);
        res.status(500).json({ message: 'Internal Server Error' });
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

        // Получаем ID текущего продавца из аутентификационного токена
        const sellerId = req.user.sellerId;

        // Создание нового продукта с использованием модели Product
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            type,
            brand,
            characteristics,
            images,
            quantity,
            seller: sellerId // Устанавливаем продавца для нового товара
        });

        // Сохранение нового продукта
        await newProduct.save();

        // Добавление ID нового продукта к массиву продуктов продавца
        const updatedSeller = await Seller.findByIdAndUpdate(
            sellerId,
            { $push: { products: newProduct._id } }, // Добавление только ID продукта
            { new: true }
        );

        res.json(updatedSeller.products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Удаление товара
// Удаление товара
router.delete('/products/:productId', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.params;
        // Удаляем товар из базы данных по _id
        await Product.findByIdAndDelete(productId);
        // Удаляем ссылку на товар из массива products у продавца
        const updatedSeller = await Seller.findByIdAndUpdate(
            req.user.sellerId,
            { $pull: { products: productId } },
            { new: true }
        );
        // Возвращаем обновленный список продуктов продавца
        res.json(updatedSeller.products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});





// router.get('/products', authenticateToken, async (req, res) => {
//     try {
//         const seller = await Seller.findById(req.user.sellerId).populate('products'); // Используем метод populate для получения информации о продуктах
//         if (!seller) {
//             return res.status(404).json({ message: 'Продавец не найден' });
//         }
//         res.json(seller.products); // Возвращаем массив продуктов, содержащий информацию о каждом продукте
//     } catch (error) {
//         console.error('Ошибка при получении товаров продавца:', error);
//         res.status(500).json({ message: 'Внутренняя ошибка сервера' });
//     }
// });


router.get('/products', authenticateToken, async (req, res) => {
    try {
        // Получаем ID текущего продавца из аутентификационного токена
        const sellerId = req.user.sellerId;

        // Получаем все товары текущего продавца
        const sellerProducts = await Product.find({ seller: sellerId });

        res.json(sellerProducts);
    } catch (error) {
        console.error('Ошибка при получении товаров продавца:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
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


// Изменение информации о товаре
router.put('/products/:productId', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.get('/sales-history', authenticateToken, async (req, res) => {
    try {
        // Получаем ID текущего продавца из аутентификационного токена
        const sellerId = req.user.sellerId;

        // Получаем все продукты текущего продавца
        const sellerProducts = await Product.find({ seller: sellerId });

        // Выполняем агрегацию для поиска заказов, содержащих продукты текущего продавца
        const orders = await Order.aggregate([
            {
                // Находим заказы, в которых содержатся продукты текущего продавца
                $match: {
                    'products.product': { $in: sellerProducts.map(product => product._id) }
                }
            },
            {
                // Добавляем информацию о пользователе, сделавшем заказ
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                // Выбираем первого найденного пользователя
                $addFields: {
                    user: { $arrayElemAt: ['$user', 0] }
                }
            },
            {
                // Добавляем подробную информацию о продуктах заказа, подключая коллекцию "products"
                $lookup: {
                    from: 'products',
                    localField: 'products.product',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            {
                // Фильтруем продукты в заказе, оставляем только те, которые принадлежат текущему продавцу
                $addFields: {
                    products: {
                        $filter: {
                            input: '$products',
                            as: 'product',
                            cond: {
                                $in: ['$$product.product', sellerProducts.map(product => product._id)]
                            }
                        }
                    }
                }
            },
            // Добавляем информацию о типе и названии каждого товара
            {
                $addFields: {
                    products: {
                        $map: {
                            input: '$products',
                            as: 'product',
                            in: {
                                $mergeObjects: [
                                    '$$product',
                                    {
                                        product: {
                                            $arrayElemAt: [
                                                { $filter: { input: '$productDetails', as: 'pd', cond: { $eq: ['$$pd._id', '$$product.product'] } } },
                                                0
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            // Фильтруем товары в заказе, оставляем только товары текущего продавца, и вычисляем сумму для каждого заказа
            {
                $addFields: {
                    totalAmount: {
                        $reduce: {
                            input: '$products',
                            initialValue: 0,
                            in: {
                                $add: ['$$value', { $multiply: ['$$this.product.price', '$$this.quantity'] }]
                            }
                        }
                    }
                }
            },
            // Оставляем только необходимые поля для вывода
            {
                $project: {
                    guestInfo: 1,
                    cart: 1,
                    products: 1,
                    totalAmount: 1,
                    status: 1,
                    date: 1,
                    address: 1,
                    phoneNumber: 1,
                    paymentMethod: 1,
                    comments: 1,
                    user: { name: 1, email: 1 }
                }
            }
        ]);

        // Отправляем список заказов в формате JSON
        res.json(orders);
    } catch (error) {
        // Если произошла ошибка, отправляем статус ошибки 500 и сообщение об ошибке
        res.status(500).json({ message: error.message });
    }
});




module.exports = router;