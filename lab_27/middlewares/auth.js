const jwt = require('jsonwebtoken');

// 1. Перевірка наявності та валідності токена
const verifyToken = (req, res, next) => {
    // Отримуємо токен з заголовків
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Доступ заборонено. Немає токена.' });

    try {
        // Розшифровуємо токен
        const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = verified; // Зберігаємо дані користувача в об'єкті запиту
        next();
    } catch (err) {
        res.status(400).json({ message: 'Недійсний токен.' });
    }
};

// 2. Перевірка прав адміністратора
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Доступ заборонено. Потрібні права адміністратора.' });
    }
    next();
};

module.exports = { verifyToken, isAdmin };