import { Strategy } from 'passport-facebook';
import * as  passport from 'passport'
import Firebase from '../../services/firebase'
import config from '../../config';


const handle = async (accessToken, refreshToken, profile, cb) => {

    for (const email of profile.emails) {
        const user = await Firebase.user(email.value)

        // User not found
        if (!user) {
            continue;
        }

        setFacebookIdIfNeeded(user, profile);
        setImageIfNeeded(user, profile);

        return cb(null, user);
    }

    // Create user
    const user = {
        name: profile.displayName,
        facebookId: profile.id,
        email: profile.emails && profile.emails[0] && profile.emails[0].value,
        image: profile.photos && profile.photos[0] && profile.photos[0].value
    }
    console.log(user, profile)
    await Firebase.put(Firebase.collections.users, user.email, user);

    return cb(null, user);
};

const setFacebookIdIfNeeded = (user, profile) => {
    if (user.facebookId) {
        return
    }

    Firebase.patch(Firebase.collections.users, email.value, {
        facebookId: profile.id
    });
}

const setImageIfNeeded = (user, profile) => {
    if (user.image) {
        return
    }

    const image = profile.photos && profile.photos[0] && profile.photos[0].value
    if (!image) {
        return
    }

    Firebase.patch(Firebase.collections.users, user.email, {
        image
    });
}


const strategy = new Strategy({
    clientID: config.FACEBOOK_APP_ID,
    clientSecret: config.FACEBOOK_APP_SECRET,
    callbackURL: "/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
}, handle)

module.exports = {
    strategy,
    authenticate: passport.authenticate('facebook', {
        scope: ['email']
    })
}