const firebase = require('./../../services/firebase')
const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

const handle = async (email, password, done) => {
    const user = await firebase.user(email);

    if (!user) {
        return done(null, false);
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        return done(true);
    }

    return done(null, user);

};

const strategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, handle);

module.exports = {
    strategy,
    authenticate: req => new Promise((resolve, reject) => {
        passport.authenticate('local', {
            session: false
        }, (error, user, info) => {
            if (error || !user) {
                return reject(err);
            }
            resolve(user);
        })(req)
    })
};