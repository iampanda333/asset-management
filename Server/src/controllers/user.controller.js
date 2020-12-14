const passport = require('passport');
const User = require('../models/user.model');

module.exports.register = (req, res, next) => {
    let user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, userData) => {
        if (!err) {
            res.send(userData);
        } else {
            if (err.code == 11000) {
                res.status(422).send(['Email address already registered']);
            } else {
                return next(err);
            }
        }
    });
}

module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(400).json({ authenticate: false, err});
        } else if(user) {
            return res.status(200).json({ authenticate: true, "token": user.generateJwt() });
        } else {
            return res.status(404).json({ authenticate: false, message: info.message});
        }
    })(req, res);
}
