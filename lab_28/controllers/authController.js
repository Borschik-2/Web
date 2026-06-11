const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Реєстрація (Завдання 3)
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Перевіряємо, чи є вже такий користувач
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Користувач з таким email вже існує' });

        // Хешуємо пароль
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Зберігаємо в базу
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: 'Користувача успішно зареєстровано!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Логін (Завдання 4)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Шукаємо користувача
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Невірний email або пароль' });

        // Перевіряємо пароль
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Невірний email або пароль' });

        // Генеруємо Access Token (живе коротко, наприклад 15 хвилин)
        const accessToken = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: '15m' }
        );

        // Генеруємо Refresh Token (живе довго, наприклад 7 днів)
        const refreshToken = jwt.sign(
            { id: user._id }, 
            process.env.REFRESH_TOKEN_SECRET, 
            { expiresIn: '7d' }
        );

        // Зберігаємо refreshToken в базу даних для цього користувача
        user.refreshToken = refreshToken;
        await user.save();

        res.json({ accessToken, refreshToken, message: 'Успішний вхід' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Оновлення токена (Завдання 6)
exports.refreshToken = async (req, res) => {
    try {
        const { token } = req.body; // Отримуємо refresh token з тіла запиту
        if (!token) return res.status(401).json({ message: 'Немає Refresh Token' });

        // Шукаємо користувача з таким токеном у базі
        const user = await User.findOne({ refreshToken: token });
        if (!user) return res.status(403).json({ message: 'Недійсний Refresh Token (немає в базі)' });

        // Перевіряємо валідність токена
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Refresh Token протерміновано' });

            // Якщо все добре, генеруємо НОВИЙ Access Token
            const newAccessToken = jwt.sign(
                { id: user._id, role: user.role }, 
                process.env.ACCESS_TOKEN_SECRET, 
                { expiresIn: '15m' }
            );

            res.json({ accessToken: newAccessToken });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Вихід / Logout (Завдання 8)
exports.logout = async (req, res) => {
    try {
        const { token } = req.body; // Отримуємо refresh token
        if (!token) return res.status(400).json({ message: 'Необхідно надати Refresh Token' });

        // Знаходимо користувача і видаляємо токен (ставимо null)
        const user = await User.findOneAndUpdate({ refreshToken: token }, { refreshToken: null });
        
        if (!user) return res.status(403).json({ message: 'Токен не знайдено' });

        res.json({ message: 'Успішний вихід з системи. Токен видалено.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};