const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: String,
    releaseDate: Number,
    image: String,
    price: Number,
    system: String
}, { timestamps: true });

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;