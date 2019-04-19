const jwt = require('jsonwebtoken');

const secret = '042e4e84-5bd7-4bbb-a514-09f45ba52908';
const generate = user => jwt.sign(user, secret, {
    expiresIn: '48h'
});

module.exports = {
    secret,
    generate
}