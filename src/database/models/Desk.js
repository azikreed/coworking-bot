const mongoose = require('mongoose');

const deskSchema = new mongoose.Schema({
    number: Number,
    available: {
        type: Boolean,
        default: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

const Desk = mongoose.model('Desk', deskSchema);

module.exports = Desk;