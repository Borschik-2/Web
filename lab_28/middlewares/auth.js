const jwt = require('jsonwebtoken');

// Middleware для перевірки Access Token
const verifyToken = (req, res, next) => {
    // Токен зазвичай передається в заголовку Authorization у форматі "Bearer <token>"
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]; // Беремо саме токен

    if (!token) return res.status(401).json({ message: 'Доступ заборонено. Немає токена.' });

    try {
        // Перевіряємо валідність токена
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verified; // Додаємо дані користувача (id, role) в об'єкт запиту
        next(); // Пропускаємо далі
    } catch (err) {
        res.status(403).json({ message: 'Токен недійсний або його термін дії минув.' });
    }
};

module.exports = verifyToken;