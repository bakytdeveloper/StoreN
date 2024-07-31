const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const {authenticateToken} = require("../middleware/authenticateToken");
const Seller = require("../models/Seller");
const {checkRole} = require("../middleware/authenticateToken");




// Добавление нового продукта
router.post('/add', authenticateToken, async (req, res) => {
    const { name, price, description, seller } = req.body;

    try {
        const newProduct = new Product({
            name,
            price,
            description,
            seller
        });

        await newProduct.save();

        res.status(201).json({ product: newProduct, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});



// // Роут для получения всех товаров с учетом видимости продавца
// router.get('/', async (req, res) => {
//     try {
//         // Получаем все товары и подгружаем данные о продавце
//         const products = await Product.find()
//             .populate('seller');
//
//         // Фильтруем товары на основе видимости продавца
//         const filteredProducts = products.filter(product => {
//             // Проверяем, существует ли продавец и видимость товаров
//             return product.seller && product.seller.isProductsVisible;
//         });
//
//         res.json(filteredProducts);
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });


// Роут для получения всех товаров с учетом видимости продавца
router.get('/', async (req, res) => {
    try {
        // Получаем все товары и подгружаем данные о продавце
        const products = await Product.find()
            .populate('seller');

        // Фильтруем товары на основе видимости продавца
        const filteredProducts = products.filter(product => {
            // Проверяем, существует ли продавец и видимость товаров
            return product.seller && product.seller.isProductsVisible;
        });

        // Разделяем товары на активные и неактивные
        const activeProducts = filteredProducts.filter(product => product.isActive);
        const inactiveProducts = filteredProducts.filter(product => !product.isActive);

        // Объединяем активные и неактивные товары
        const sortedProducts = [...activeProducts, ...inactiveProducts];

        res.json(sortedProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
});




// Роут для получения полов товаров
router.get('/genders', async (req, res) => {
    try {
        const genders = await Product.distinct('gender');
        res.json({ genders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Получение списка всех категорий
router.get('/categories', async (req, res) => {
    try {
        const { gender } = req.query;
        let query = {};
        if (gender) {
            query.gender = gender;
        }
        const categories = await Product.distinct('category', query);
        res.json({ categories });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Получение списка всех типов товаров по категории
router.get('/types', async (req, res) => {
    try {
        const { gender, category } = req.query;
        let query = {};
        if (gender) {
            query.gender = gender;
        }
        if (category) {
            query.category = category;
        }
        const types = await Product.distinct('type', query);
        res.json({ types });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Получение всех типов товаров по категории
router.get('/types/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const { type } = req.query;
        let query = { category };
        if (type) {
            query = { ...query, type };
        }
        const types = await Product.distinct('type', { category });
        const products = await Product.find(query);
        res.json({ types, products });
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// // Роут для фильтрации продуктов по полу, категории и типу
// router.get('/products', async (req, res) => {
//     try {
//         const { gender, category, type, search } = req.query;
//
//         let query = {};
//         if (gender) {
//             query.gender = gender;
//         }
//         if (category) {
//             query.category = category;
//         }
//         if (type) {
//             query.type = type;
//         }
//         if (search) {
//             query.$or = [
//                 { name: new RegExp(search, 'i') },
//                 { description: new RegExp(search, 'i') },
//                 { brand: new RegExp(search, 'i') },
//                 { type: new RegExp(search, 'i') }
//             ];
//         }
//
//
//
//         const products = await Product.find(query);
//         res.json(products);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });


// Роут для фильтрации продуктов по продавцу
router.get('/products', async (req, res) => {
    try {
        const { gender, category, type, search, sellerId } = req.query;

        let query = {};
        if (gender) {
            query.gender = gender;
        }
        if (category) {
            query.category = category;
        }
        if (type) {
            query.type = type;
        }
        if (search) {
            query.$or = [
                { name: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') },
                { brand: new RegExp(search, 'i') },
                { type: new RegExp(search, 'i') }
            ];
        }
        if (sellerId) {
            query.seller = sellerId; // Добавляем фильтрацию по sellerId
        }

        const products = await Product.find(query).populate('seller');

        console.log("SELLER:", products);

        if (!Array.isArray(products)) {
            return res.status(500).json({ message: 'Error: Products is not an array' });
        }

        // Фильтруем товары на основе видимости продавца
        const filteredProducts = products.filter(product => {
            // Проверяем, существует ли продавец и видимость товаров
            return product.seller && product.seller.isProductsVisible;
        });

        // Разделяем товары на активные и неактивные
        const activeProducts = filteredProducts.filter(product => product.isActive);
        const inactiveProducts = filteredProducts.filter(product => !product.isActive);

        // Объединяем активные и неактивные товары
        const sortedProducts = [...activeProducts, ...inactiveProducts];

        res.json(sortedProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



// Получение списка самых новых продуктов
router.get('/newest', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 18; // Получаем limit из запроса, либо используем значение 18 по умолчанию
        const newestProducts = await Product.find().sort({ createdAt: -1 }).limit(limit);
        res.json(newestProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Получение информации о конкретном продукте по ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        // const product = await Product.findById(req.params.id).populate('seller');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // // Проверяем видимость товаров у продавца
        // if (!product.seller.isProductsVisible) {
        //     return res.status(403).json({ message: 'Products from this seller are not visible' });
        // }

        res.json({ product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Создание нового продукта (только для администратора)
router.post('/', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Permission denied' });
    }
    const {
        name,
        description,
        price,
        category,
        direction,
        type,
        brand,
        characteristics,
        images,
    } = req.body;

    const product = new Product({
        name,
        description,
        price,
        category,
        direction,
        type,
        brand,
        characteristics,
        images,
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Обновление информации о продукте по ID (только для администратора)
router.put('/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Permission denied' });
    }
    const { name, description, price, category, direction, type, brand, characteristics, images } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                price,
                category,
                direction,
                type,
                brand,
                characteristics,
                images,
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Удаление продукта по ID (только для администратора)
router.delete('/:id', authenticateToken,  checkRole(['admin']), async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Permission denied' });
    }
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Получение всех товаров данного продавца на основе ID продукта
router.get('/:productId/seller/products', async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const sellerId = product.seller;
        const sellerProducts = await Product.find({ seller: sellerId });
        res.json(sellerProducts);
    } catch (error) {
        console.error('Error fetching related seller products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Получение всех товаров текущего типа
router.get('/related/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId).populate('seller');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const productType = product.type;
        const sellerId = product.seller._id;

        // Получение всех продуктов текущего типа, исключая товары скрытых продавцов
        const relatedProducts = await Product.find({
            type: productType,
            seller: { $ne: sellerId } // Исключение товаров от того же продавца
        }).populate('seller');

        // Фильтрация товаров скрытых продавцов
        const visibleRelatedProducts = relatedProducts.filter(p => p.seller.isProductsVisible);

        res.json(visibleRelatedProducts);
    } catch (error) {
        console.error('Error fetching related products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Получение аксессуаров по направлению с учетом видимости товаров продавца
router.get('/accessories/:direction', async (req, res) => {
    try {
        const { direction } = req.params;

        // Найти аксессуары по направлению и присоединить информацию о продавце
        const accessories = await Product.find({ direction })
            .populate('seller'); // Присоединяем информацию о продавце

        // Фильтрация товаров, исключая те, у которых продавец скрыт
        const visibleAccessories = accessories.filter(product => product.seller.isProductsVisible);

        res.json(visibleAccessories);
    } catch (error) {
        console.error('Error fetching accessories by direction:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});




// Роут для поиска продавца по ID товара
router.get('/product/:productId/seller', async (req, res) => {
    const productId = req.params.productId;

    try {
        // Находим товар по его ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Товар не найден' });
        }

        // Находим продавца товара по ссылке в поле seller
        const seller = await Seller.findById(product.seller);

        if (!seller) {
            return res.status(404).json({ message: 'Продавец не найден' });
        }

        // Отправляем информацию о продавце
        res.json(seller);
    } catch (err) {
        console.error('Ошибка при поиске продавца:', err.message);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});




// Получение всех товаров продавца по его ID
router.get('/seller/:sellerId/products', async (req, res) => {
    try {
        const { sellerId } = req.params;

        // Находим все продукты, у которых поле seller соответствует sellerId
        const sellerProducts = await Product.find({ seller: sellerId });

        res.json(sellerProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/:productId/toggle-active',  authenticateToken, checkRole(['seller']), async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.isActive = !product.isActive;

        // Используем метод `save` с опцией `validateModifiedOnly` чтобы избежать полной валидации
        await product.save({ validateModifiedOnly: true });

        res.status(200).json({ message: 'Product activity toggled successfully', product });
    } catch (error) {
        console.error('Error toggling product activity:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = router;