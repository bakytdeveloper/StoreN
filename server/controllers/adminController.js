const Product = require('../models/Product');

// Получение списка всех продуктов
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// Создание нового продукта
const createProduct = async (req, res) => {
    const {
        name,
        description,
        price,
        category,
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
};

// Редактирование продукта
const editProduct = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        description,
        price,
        category,
        type,
        brand,
        characteristics,
        images,
    } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                name,
                description,
                price,
                category,
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
};

// Удаление продукта
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    editProduct,
    deleteProduct,
};



