const mongoose = require('mongoose');

// Створюємо схему (schema) для продукту
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true }
}, { timestamps: true }); // Автоматично додає час створення/оновлення

// Експортуємо модель
module.exports = mongoose.model('Product', productSchema);