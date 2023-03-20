const express = require('express');
const router = express.Router();
const Example = require('../models/example');
const passport = require('passport');

// put this inside route to authenticate -> passport.authenticate('jwt', { session: false })

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Purpose: Fetch all examples from DB and return
    console.log('=====> Inside GET /examples');

    Example.findById(req.params.id)
    .then(foundExamples => {
        res.json({ example: foundExamples });
    })
    .catch(err => {
        console.log('Error in example#index:', err);
        res.json({ message: 'Error occured... Please try again.'})
    });
});

router.get('/query', (req, res) => {
    // Purpose: Fetch one example by searching in DB and return
    console.log('=====> Inside GET /examples/query');
    console.log('=====> req.query', req.query);

    Example.find(req.query)
    .then(example => {
        res.json({ example: example });
    })
    .catch(err => {
        console.log('Error in example#query:', err);
        res.json({ message: 'Error occured... Please try again.'})
    });
});

router.get('/:id', (req, res) => {
    // Purpose: Fetch one example from DB and return
    console.log('=====> Inside GET /examples/:id');

    Example.findById(req.params.id)
    .then(example => {
        res.json({ example: example });
    })
    .catch(err => {
        console.log('Error in example#show:', err);
        res.json({ message: 'Error occured... Please try again.'})
    });
});


router.post('/', (req, res) => {
    // Purpose: Create one example by adding body to DB, and return
    console.log('=====> Inside POST /examples');
    console.log('=====> req.body', req.body); // object used for creating new example

    Example.create(req.body)
    .then(newExample => {
        console.log('New example created', newExample);
        res.redirect(`/examples/${newExample.id}`);
    })
    .catch(err => {
        console.log('Error in example#create:', err);
        res.json({ message: 'Error occured... Please try again.'});
    })
});



router.put('/:id', (req, res) => {
    // Purpose: Update one example in the DB, and return
    console.log('=====> Inside PUT /examples/:id');
    console.log('=====> req.params', req.params); // object used for finding example by id
    console.log('=====> req.body', req.body); // object used for updating example

    Example.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedExample => {
        console.log('Example updated', updatedExample);
        res.redirect(`/examples/${req.params.id}`);
    })
    .catch(err => {
        console.log('Error in example#update:', err);
        res.json({ message: 'Error occured... Please try again.'});
    });
});

router.delete('/:id', (req, res) => {
    // Purpose: Update one example in the DB, and return
    console.log('=====> Inside DELETE /examples/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding example by id
    
    Example.findByIdAndRemove(req.params.id)
    .then(response => {
        console.log(`Example ${req.params.id} was deleted`, response);
        res.redirect(`/examples`);
    })
    .catch(err => {
        console.log('Error in example#delete:', err);
        res.json({ message: 'Error occured... Please try again.'});
    });
});

module.exports = router;