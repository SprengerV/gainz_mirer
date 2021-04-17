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
// possibly get workout to populate on save
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
// TODO get GET to return last 7 workouts
router.get('/range', (req, res) => {

});

module.exports = router;