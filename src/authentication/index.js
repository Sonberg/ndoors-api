import * as passport from 'passport'
import Firebase from '../services/firebase'

// Generators
export const Password = require('./generators/password')

// Strategies
export const facebook = require('./strategies/facebook')
export const local = require('./strategies/local')

export const login = req => new Promise(async (resolve, _) => resolve({
    user: req.user,
    isAuthenticated: req.isAuthenticated(),
    expires: req.isAuthenticated() && req.session && req.session.cookie ? req.session.cookie.expires : null
}));


export default app => {
    passport.serializeUser((user, done) => done(null, user.email));
    passport.deserializeUser(async (email, done) => done(null, await Firebase.user(email)));

    passport.use(facebook.strategy)
    passport.use(local.strategy)

    app.use(passport.initialize());
    app.use(passport.authenticate('session'));
}