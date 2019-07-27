import Firebase from '../../services/firebase'
const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

const handle = async (email, password, done) => {
    const user = await Firebase.user(email);

    if (!user) {
        return done({ errors: [{ param: 'password', msg: 'Email or password incorrect' }] });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        return done({ errors: [{ param: 'password', msg: 'Email or password incorrect' }] });
    }

    return done(null, user);

};

export const strategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, handle);

export const authenticate = () => passport.authenticate('local', {});