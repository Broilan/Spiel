const express = require('express');
const router = express.Router();
const Spiel = require('../models/spiel');
const Group = require('../models/group');
const Comment = require('../models/comment');
const Notification = require('../models/notification')
const passport = require('passport');
const mongoose = require('mongoose');

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

router.get('/test', (req, res) => {
    res.json({ message: 'User endpoint OK! ✅' });
});

// router.get('/:id', (req, res) => {
//     // Purpose: Fetch one example from DB and return
//     console.log('=====> Inside GET /users/:id');

//     User.findById(req.params.id)
//     .then(user => {
//         res.json({ user: user });
//     })
//     .catch(err => {
//         console.log('Error in user#show:', err);
//         res.json({ message: 'Error occured... Please try again.'})
//     });
// });

router.get('/:username', (req, res) => {
    Notification.find({to: req.params.username})
    .then(foundNotifs => {
        console.log("found notifs", foundNotifs)
        res.json({ foundNotifs: foundNotifs });
    })
    .catch(err => {
        console.log('Error in user#show:', err);
        res.json({ message: 'Error occured... Please try again.'})
    });
});



router.post('/:from/:to/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Notification.create({
        from: req.params.from,
        to: req.params.to,
        likeCommentOrFollow: req.body.likeCommentOrFollow,
        content: req.body.content,
        spielID: req.params.id
    })
    .then(notif => {
        console.log('New notif =>>', notif);
        res.json({notif: notif._id})
    })
    .catch(error => { 
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" })
    });
});



module.exports = router;