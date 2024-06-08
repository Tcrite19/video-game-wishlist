const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    games: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
}, { timestamps: true });

userSchema.pre('save', function(next) {
    let hash = bcrypt.hashSync(this.password, 12);
    this.password = hash;
    next();
});

// create the model and export it
const User = mongoose.model('User', userSchema);

// make this model avaliable for the index file
module.exports = User;