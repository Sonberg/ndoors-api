const passport = require('passport')
const firebase = require('./../services/firebase')

// Generators
const Bearer = require('./generators/bearer')
const RefreshToken = require('./generators/refreshToken')
const Password = require('./generators/password')

// Strategies
const facebook = require('./strategies/facebook')
const local = require('./strategies/local')
const jwt = require('./strategies/jwt')

const login = (user, req) => new Promise((resolve, reject) => {
    req.login(user, {
        session: false
    }, err => {

        if (err) {
            return reject(err);
        }

        const token = Bearer.generate({
            email: user.email
        });

        const refreshToken = RefreshToken.generate();

        // Save refresh token
        firebase.put(firebase.collections.refreshTokens, refreshToken, {
            email: user.email,
            created: new Date(),
            expires: RefreshToken.expires()
        });

        return resolve({
            user,
            token,
            refreshToken
        });
    });
});

const refresh = refreshToken => new Promise(async (resolve, reject) => {
    const data = await firebase.get(firebase.collections.refreshTokens, refreshToken);

    if (!data) {
        return reject();
    }

    const token = Bearer.generate({
        email: data.email
    });

    resolve({
        token
    });
});

module.exports = {
    login,
    refresh,
    facebook,
    local,
    jwt,
    bearer: Bearer,
    password: Password,
    refreshToken: RefreshToken,
    init: app => {
        passport.use(facebook.strategy)
        passport.use(local.strategy)
        passport.use(jwt.strategy)

        app.use(passport.initialize());
        app.use(passport.session());
    }
}