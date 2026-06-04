const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../middlewares/auth');

// Маршрути для продуктів (з урахуванням авторизації)
router.get('/', getAllProducts); // Переглядати можуть всі
router.post('/', verifyToken, isAdmin, createProduct); // Створювати - тільки адмін
router.put('/:id', verifyToken, isAdmin, updateProduct); // Оновлювати - тільки адмін
router.delete('/:id', verifyToken, isAdmin, deleteProduct); // Видаляти - тільки адмін

module.exports = router;