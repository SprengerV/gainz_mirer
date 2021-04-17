const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const routes = require('./controllers');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(routes);

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('CONNECTED TO MONGODB');
    app.listen(PORT, () => {
        console.log(`APP LISTENING ON PORT ${PORT}`);
    });
});