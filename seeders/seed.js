
let mongoose = require('mongoose');
let db = require('../models');
  
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
  
const addWorkout = async (x) => {
    const workout = await db.Workout
        .create({ day: new Date().setDate(new Date().getDate()-x) });
    return workout._id;
};
const addExercise = async (ex) => {
    const exercise = await db.Exercise.create(ex);
    return exercise._id;
};
const modWorkout = async (id, exId) => {
    await db.Workout.findOneAndUpdate({ _id: id }, {
        $push: { exercises: [exId] }
    });
};
const larry = async () => {
    await db.Exercise.deleteMany({});
    await db.Workout.deleteMany({});
    let woId = await addWorkout(10);
    let exId = await addExercise(
        {
            type: 'resistance',
            name: 'Bicep Curl',
            duration: 20,
            weight: 100,
            reps: 10,
            sets: 4
        }
    );
    await modWorkout(woId, exId);
  
  
    woId = await addWorkout(9);
    exId = await addExercise(
        {
            type: 'resistance',
            name: 'Lateral Pull',
            duration: 20,
            weight: 300,
            reps: 10,
            sets: 4
        }
    );
    await modWorkout(woId, exId);
  
    woId = await addWorkout(8);
    exId = await addExercise(
        {
            type: 'resistance',
            name: 'Push Press',
            duration: 25,
            weight: 185,
            reps: 8,
            sets: 4
        }
    );
    await modWorkout(woId, exId);
  
    woId = await addWorkout(8);
    exId = await addExercise(
        {
            type: 'cardio',
            name: 'Running',
            duration: 25,
            distance: 4
        }
    );
    await modWorkout(woId, exId);

    woId = await addWorkout(8);
    exId = await addExercise(
        {
            type: 'resistance',
            name: 'Bench Press',
            duration: 20,
            weight: 285,
            reps: 10,
            sets: 4
        }
    );
    await modWorkout(woId, exId);
  
    woId = await addWorkout(7);
    exId = await addExercise(
        {
            type: 'resistance',
            name: 'Bench Press',
            duration: 20,
            weight: 300,
            reps: 10,
            sets: 4
        }
    );
    await modWorkout(woId, exId);
  
    woId = await addWorkout(6);
    exId = await addExercise(
        {
            type: 'resistance',
            name: 'Quad Press',
            duration: 30,
            weight: 300,
            reps: 10,
            sets: 4
        }
    );
    await modWorkout(woId, exId);
    
    woId = await addWorkout(5);
    exId = await addExercise(
        {
            type: 'resistance',
            name: 'Bench Press',
            duration: 20,
            weight: 300,
            reps: 10,
            sets: 4
        }
    );
    await modWorkout(woId, exId);
  
    woId = await addWorkout(5);
    exId = await addExercise(
        {
            type: 'resistance',
            name: 'Military Press',
            duration: 20,
            weight: 300,
            reps: 10,
            sets: 4
        }
    );
    await modWorkout(woId, exId);
    process.exit();
};
  
larry();