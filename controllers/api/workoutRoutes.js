const router = require('express').Router();
const Workout = require('../../models').Workout;
const Exercise = require('../../models').Exercise;

// TODO: get GET route to populate properly
router.get('/', (req, res) => {
    Workout
        .find({})
        .then(wos => {
            console.log(wos[0])
            wos? res.status(200).json(wos) :
                res.status(400).json({ message: 'No workouts found' });
        });
});
router.post('/', (req, res) => {
    Workout
        .create({})
        .then(({ _id }) => {
            _id ? res.status(200).json({ _id }) : 
                res.status(400).json({ message: 'Failed to create workout'});
        });
});
router.put('/:id', (req, res) => {
    Workout
        .findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } })
        .then(wo => {
            wo ? res.status(200).json(wo) :
                res.status(400).json({ message: 'Workout not found' });
        });
});
router.get('/range', (req, res) => {
    Workout
        .find({})
        .sort([['day', -1]])
        .limit(7)
        .then(data => {
            data ? res.status(200).json(data) :
                res.status(400).json({ message: 'No workouts found' });
        });
});

module.exports = router;