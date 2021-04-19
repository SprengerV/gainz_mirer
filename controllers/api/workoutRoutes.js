const router = require('express').Router();
const Workout = require('../../models').Workout;
const Exercise = require('../../models').Exercise;

// TODO: get GET route to populate properly
router.get('/', (req, res) => {
    Workout
        .find({})
        .populate('exercises')
        .then(wos => {
            if (!wos) {
                res
                    .status(400)
                    .json({ message: 'No workouts found' });
                return;
            }
            res
                .status(200)
                .json(wos);
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
    const id = req.params.id;
    Exercise
        .create(req.body)
        .then((ex) => {
            if (!ex) {
                res
                    .status(400)
                    .json({ message: 'Exercise not created' });
                return;
            }
            Workout
                .findOneAndUpdate({ _id: id }, { $push: { exercises: ex } })
                .then(wo => {
                    if (!wo) {
                        res
                            .status(400)
                            .json({ message: 'Workout not found' });
                        return;
                    }
                    res
                        .status(200)
                        .json(wo);
                });
        });
});
router.get('/range', (req, res) => {
    Workout
        .find({})
        .sort([['day', -1]])
        .limit(7)
        .populate('exercises')
        .then(data => {
            data ?
                res
                    .status(200)
                    .json(data)
                :
                res
                    .status(400)
                    .json({ message: 'No workouts found' });
        });
});

module.exports = router;