const Strategy = require('passport-facebook').Strategy
const passport = require('passport')
const firebase = require('./../../services/firebase')
const config = require('./../../config')


const handle = async (accessToken, refreshToken, profile, cb) => {

    for (const email of profile.emails) {
        const user = await firebase.user(email.value)

        // User not found
        if (!user) {
            continue;
        }

        // User found and have facebook id saved
        if (user.facebookId === profile.id) {
            return cb(null, user);
        }

        firebase.patch(firebase.collections.users, email.value, {
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
    clientID: config.FACEBOOK_APP_ID,
    clientSecret: config.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3001/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
}, handle)

module.exports = {
    strategy,
    authenticate: passport.authenticate('facebook', {
        scope: ['email']
    })
}