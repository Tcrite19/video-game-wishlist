const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    system: String,
    ratings: Object,
    platforms: String,
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}]

}, { timestamps: true });

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;