const passport = require('passport')
const firebase = require('./../services/firebase')

// Generators
const Password = require('./generators/password')

// Strategies
const facebook = require('./strategies/facebook')
const local = require('./strategies/local')

const login = req => new Promise(async (resolve, _) => resolve({
    user: req.user
}));


module.exports = {
    login,
    facebook,
    local,
    password: Password,
    init: app => {
        passport.serializeUser((user, done) => done(null, user.email));
        passport.deserializeUser(async (email, done) => done(null, await firebase.user(email)));

        passport.use(facebook.strategy)
        passport.use(local.strategy)

        app.use(passport.initialize());
        app.use(passport.authenticate('session'));
    }
}