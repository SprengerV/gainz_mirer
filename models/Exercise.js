const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    type: {
        type: String,
        trim: true,
        required: 'Exercise type is required'
    },
    name: {
        type: String,
        trim: true,
        required: 'Exercise name is required'
    },
    duration: {
        type: Number,
        required: 'Exercise duration is required'
    },
    distance: Number,
    weight: Number,
    reps: Number,
    sets: Number
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;