const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    GameName: {
        type: String,
        required: true
    },
    ImageURL: {
        type: String,
        required: true
    },
    VoteCount: {
        type: Number,
        default: 0
    },

});

const User = mongoose.model('games', GameSchema);
module.exports = User;