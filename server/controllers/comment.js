const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const User = require('../models/user')
const Comment = require('../models/comment')
const Spiel = require('../models/spiel');
const passport = require('passport');
const mongoose = require('mongoose');

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;



router.get('/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
    Comment.find({name: req.params.name})
    .then(comment => {
        res.json({ comment: comment });
    })
    .catch(err => {
        res.json({ message: 'Error occured... Please try again.'})
    });
});
router.get('/findbyid/:spielID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Comment.find({spielID: req.params.spielID})
    .then(comment => {
        res.json({ comment: comment });
    })
    .catch(err => {
        res.json({ message: 'Error occured... Please try again.'})
    });
});

router.post('/:spielid', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body)
    Comment.create({
        name: req.body.name,
        group: req.body.group,
        message: req.body.comment,
        likes: 0,
        comments: [],
        spielID: req.params.spielid
    })
    .then(comment => {

        console.log('New comment =>>', comment);
        res.json({comment: comment})
    })
    .catch(error => { 
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" })
    });
});

router.put('/:spielid/comment', (req, res) => {   
     console.log('route is being on PUT')
    Spiel.findById(req.params.spielid)
    .then (foundSpiel => {
        const spielComments = foundSpiel.comments
        console.log("foundspiel", foundSpiel)
    Comment.find({spielID: req.params.spielid})
        .then(foundComment => {
            console.log("foundcomment", foundComment)
            foundComment.map((c) =>{ spielComments.push(c._id) })  
            console.log('Spiel comments found', spielComments);
        
            Spiel.findByIdAndUpdate(req.params.spielid,
                {
                    comments: spielComments
                })
                .then(post => {
                    console.log('Post was updated', post);
                })})
                .catch(error => {
                    console.log('error', error)
                    res.json({ message: "Error ocurred, please try again" })
                })
        })
        .catch(error => {
            console.log('error', error)
            res.json({ message: "Error ocurred, please try again" })
        })
});

module.exports = router;