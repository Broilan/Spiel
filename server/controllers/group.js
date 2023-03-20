const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const User = require('../models/user')
const Spiel = require('../models/spiel');
const passport = require('passport');
const mongoose = require('mongoose');

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

//find groups by group name
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Group.find({})
    .then(group => {
        res.json({ group: group });
    })
    .catch(err => {
        res.json({ message: 'Error occured... Please try again.'})
    });
});

//render group feed page
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Group.findById(req.params.id)
    .then(foundGroup => {
         Spiel.find({_id: foundGroup.spiels})
         .then(groupSpiels => {
            res.json({ foundGroup: foundGroup, groupSpiels: groupSpiels});
            console.log("groupSpiels ==>", groupSpiels, "foundGroup ==>", foundGroup)
         })

    })
    .catch(err => {
        res.json({ message: 'Error occured... Please try again.'})
    });
   
});

//render group feed page
router.get('/group/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
    Group.find({name: req.params.name})
        .then(foundGroup => {
            res.json({foundGroup:foundGroup})
        })

    .catch(err => {
        res.json({ message: 'Error occured... Please try again.'})
    });
   
});

//user can create a group

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Group.create({
        groupName: req.body.groupName,
        description: req.body.description
    })
    .then(group => {
        console.log('New group =>>', group);
        console.log(req)
        res.header("Authorization", req.headers["Authorization"])
        res.redirect("/group");
    })
    .catch(error => { 
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" })
    });
});

router.put('/:group/spiels/:spielID', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('route is being on PUT')
    Group.findOne({groupName: req.params.group})
    .then(foundGroup => {
        console.log("FOUND GROUP",foundGroup)
        const spielsOfGroup = foundGroup.spiels
        console.log("found group spiels ==>", spielsOfGroup)
    
    Spiel.findById(req.params.spielID)
        .then(foundSpiel => {
            console.log('spiel found', foundSpiel._id);
            const fGroup = String(foundSpiel._id)
            spielsOfGroup.push(fGroup)
            console.log("spiels added ===>", spielsOfGroup)
            Group.findOneAndUpdate({groupName: req.params.group},
                {
                    spiels: spielsOfGroup
                })
                .then(Group => {
                    res.json({Group: Group})
                    console.log('User was updated, old info ---->', User);
                })
                .catch(error => {
                    console.log('error', error)
                    res.json({ message: "Error ocurred, please try again" })
                })
        })
        .catch(error => {
            console.log('error', error)
            res.json({ message: "Error ocurred, please try again" })
        })})
});

router.put('/:idx/users/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('route is being on PUT')
    Group.findById({_id: req.params.idx})
    .then(foundGroup => {
        console.log("FOUND GROUP",foundGroup)
        const usersofGroup = foundGroup.users
        console.log("found group users ==>", usersofGroup)
    
    User.findById(req.params.id)
        .then(foundUser => {
            console.log('user found', foundUser._id);
            const fGroup = String(foundUser._id)
            usersofGroup.push(fGroup)
            console.log("users added ===>", usersofGroup)
            Group.findByIdAndUpdate({_id: req.params.idx},
                {
                    users: usersofGroup
                })
                .then(Group => {
                    res.json({Group: Group})
                    console.log('Group was updated, old info ---->', Group);
                })
                .catch(error => {
                    console.log('error', error)
                    res.json({ message: "Error ocurred, please try again" })
                })
        })
        .catch(error => {
            console.log('error', error)
            res.json({ message: "Error ocurred, please try again" })
        })})

});

//user can edit the group
router.put('/:groupName', passport.authenticate('jwt', { session: false }), (req, res) => {
    Group.findOneAndUpdate(req.params.groupName, req.body, { new: true })
    .then(updatedExample => {
        console.log('Example updated', updatedExample);
        res.redirect(`/group/${req.params.groupName}`);
    })
    .catch(err => {
        console.log('Error in example#update:', err);
        res.json({ message: 'Error occured... Please try again.'});
    });
});

//user can delete a group
router.delete('/:id',passport.authenticate('jwt', { session: false }), (req, res) => {
    Group.findByIdAndDelete(req.params.id)
    .then(response => {
        console.log(`Group ${req.params.id} was deleted`, response);
        res.header("Authorization", req.headers["Authorization"])
        res.redirect("/group");
    })
    .catch(err => {
        console.log('Error in example#delete:', err);
        res.json({ message: 'Error occured... Please try again.'});
    });
});

module.exports = router;