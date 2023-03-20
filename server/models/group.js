const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    groupName: String,
    description: String,
     spiels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spiel'
    }],
    date: {
        type: Date,
        default: Date.now()
    }

})

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
