const config = {
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
    ELKS_CREDENTIALS: process.env.ELKS_CREDENTIALS && process.env.ELKS_CREDENTIALS.split(',').map(x => {
        const [username, password] = x.split(':');
        return {
            username,
            password
        }
    }),
    REDIS_URL: process.env.REDIS_URL
}
module.exports = config