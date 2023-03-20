const express = require('express');
const router = express.Router();
const Search = require('../models/search');
const Spiel = require('../models/spiel')
const Group = require('../models/group')
const passport = require('passport');
const mongoose = require('mongoose');

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

//searching for posts by user
router.get('/user/spiels', passport.authenticate('jwt', { session: false }), (req, res) => {
    Spiel.find({user: req.body.user})
    .then(spiel => {
        res.json({ spiel: spiel });
    })
    .catch(err => {
        res.json({ message: 'Error occured... Please try again.'})
    });
});

//searching for posts by words contained in the post
router.get('/spiel', passport.authenticate('jwt', { session: false }), (req, res) => {
    Spiel.find({spiel: req.body.spiel})
    .then(spiel => {
        res.json({ spiel: spiel });
    })
    .catch(err => {
        res.json({ message: 'Error occured... Please try again.'})
    });
});

//search for groups
router.get('/group', passport.authenticate('jwt', { session: false }), (req, res) => {
    Group.findOne({group: group})
    .then(Group => {
        res.json({ Group: Group });
    })
    .catch(err => {
        res.json({ message: 'Error occured... Please try again.'})
    });
});




