const mongoose = require('mongoose');
const { Schema } = mongoose;

const searchSchema = new Schema({
    user: {
        type: String,
        required: false
    },
    group: {
        type: String,
        required: false
    },
    post: {
        type: String,
        required: false
    }
});

const Search = mongoose.model('Search', searchSchema);

module.exports = Search;
