const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now() },
});

const Reviews = mongoose.model('Reviews', reviewsSchema);

module.exports = Reviews;