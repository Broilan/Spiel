const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookmarkSchema = new Schema({
    UserID: String,
    spiel: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'Spiel'
    },
    spielID: String, 
    marked: Boolean
})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;