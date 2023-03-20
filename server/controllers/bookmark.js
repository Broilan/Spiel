require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Spiel = require('../models/spiel');
const Bookmark = require('../models/Bookmark');
const multer = require('multer');
const { JWT_SECRET } = process.env;

router.get('/:userID', (req, res) => {
    Bookmark.find({UserID: req.params.userID})
    .then(foundBookmarks => {

            Spiel.find({_id: foundBookmarks[0].spielID})
           .then(bookmarked => {
              console.log(bookmarked)
              res.json({bookmarked:bookmarked})
            })
    })
})

module.exports = router;