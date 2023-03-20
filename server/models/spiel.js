const mongoose = require('mongoose');
const { Schema } = mongoose;

const spielSchema = new Schema({
    name: String,
    group: String,
    message: String,
    likes: Number,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bookmarks'
    }],
    date: {
        type: Date,
        default: Date.now()
    }
})

const Spiel = mongoose.model('Spiel', spielSchema);

module.exports = Spiel;