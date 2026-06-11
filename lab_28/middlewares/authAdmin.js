// Middleware для перевірки ролі адміністратора
const verifyAdmin = (req, res, next) => {
    // Цей middleware ставиться ПІСЛЯ verifyToken, тому req.user вже існує
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Доступ заборонено. Потрібні права адміністратора.' });
    }
    next();
};

module.exports = verifyAdmin;