const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    name: String,
    group: String,
    message: String,
    likes: Number,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    spielID: String,
    date: {
        type: Date,
        default: Date.now()
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;