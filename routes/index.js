const routes = require('express').Router();
const passport = require('passport')

const isAuthenticated = (req, res, next) => {
    return req.isAuthenticated() ? next() : res.status(401).send();
};

// Routes
routes.use('/api/references/', isAuthenticated, require('./references'));
routes.use('/api/users/', isAuthenticated, require('./users'));
routes.use('/api/skills/', isAuthenticated, require('./skills'));
routes.use('/api/csv/', isAuthenticated, require('./csv'));
routes.use('/api/sms/', isAuthenticated, require('./sms'));

// Authenticate
routes.use('/api/auth/', require('./auth'));

module.exports = routes;