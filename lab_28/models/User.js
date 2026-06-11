const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Унікальний email
    password: { type: String, required: true }, // Хешований пароль
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    refreshToken: { type: String, default: null } // Поле для збереження refresh-токена в базі
});

module.exports = mongoose.model('User', userSchema);