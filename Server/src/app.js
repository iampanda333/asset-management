require('./db/mongoose');
require('./auth/passportConfig');

const express = require('express');
const cors = require('cors');
const passport = require('passport');

const userRouter = require('./routes/user.router');
const assetsRouter = require('./routes/assets.router');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', userRouter);
app.use('/api', assetsRouter);

// Handle error
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    } 
});

module.exports = app;
