const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    image: {
        type: String,
    },
    bio: {
        type: String
    },
    likedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spiel'
    }],
    comments: [{
        type: Array
    }],
    spiels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spiel'
    }],
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notifications'
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

const User = mongoose.model('User', userSchema);

module.exports = User;