const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: String,
    phone: Number,
    username: String,
    password: String,
    language: {
        type: String,
        default: 'uz'
    },
    limit: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;