const Strategy = require('passport-facebook').Strategy
const passport = require('passport')
const firebase = require('./../../services/firebase')

const FACEBOOK_APP_ID = '1108539459333624'
const FACEBOOK_APP_SECRET = 'ba7b8485b048cfb7d9a8e6207cb928f3'

const handle = async (accessToken, refreshToken, profile, cb) => {

    for (const email of profile.emails) {
        const user = await firebase.user(email.value)

        if (!user) {
            continue;
        }

        firebase.patch(firebase.collections.users, user.id, {
            facebookId: profile.id
        });

        return cb(null, user);
    }

    // Create user
    const user = {
        name: profile.name,
        facebookId: profile.id,
        email: profile.emails && profile.emails[0] && profile.emails[0].value
    }

    await firebase.post(firebase.collections.users, user);

    return cb(null, user);
};

const strategy = new Strategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3001/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
}, handle)

module.exports = {
    strategy,
    authenticate: passport.authenticate('facebook', {
        scope: ['email']
    })
}