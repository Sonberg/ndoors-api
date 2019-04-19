const passportJWT = require('passport-jwt')
const passport = require('passport')
const firebase = require('./../../services/firebase')
const secret = require('./../generators/bearer').secret;

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const handle = async (payload, cb) => {
    const user = await firebase.user(payload.email);

    if (!user) {
        return cb('User not found');
    }
    return cb(null, user);
};

const strategy = new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}, handle);


module.exports = {
    strategy,
    authenticate: passport.authenticate('jwt', {
        session: false
    })
};