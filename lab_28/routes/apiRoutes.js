const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/auth');
const verifyAdmin = require('../middlewares/authAdmin');

// Відкриті маршрути (Авторизація)
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

// Захищений маршрут для всіх авторизованих користувачів (Завдання 5)
router.get('/user-info', verifyToken, (req, res) => {
    // req.user містить дані, розшифровані з токена
    res.json({ 
        message: 'Це захищена інформація користувача.', 
        userData: req.user 
    });
});

// Захищений маршрут ТІЛЬКИ ДЛЯ АДМІНІСТРАТОРІВ (Завдання 7)
router.get('/admin', verifyToken, verifyAdmin, (req, res) => {
    res.json({ 
        message: 'Вітаємо, Адміністраторе! Ви маєте доступ до панелі керування.' 
    });
});

module.exports = router;