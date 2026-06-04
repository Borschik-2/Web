const Product = require('../models/Product');

// Читання (Read) - доступно всім
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Створення (Create) - тільки адмін
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ message: "Продукт створено", product: newProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Оновлення (Update) - тільки адмін
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: "Не знайдено" });
        res.json({ message: "Оновлено", product: updatedProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Видалення (Delete) - тільки адмін
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Не знайдено" });
        res.json({ message: "Продукт видалено" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};