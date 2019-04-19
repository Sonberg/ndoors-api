const routes = require('express').Router();
const Jwt = require('./../authentication/strategies/jwt');

// Routes
routes.use('/api/references/', Jwt.authenticate, require('./references'));
routes.use('/api/users/', Jwt.authenticate, require('./users'));
routes.use('/api/skills/', Jwt.authenticate, require('./skills'));
routes.use('/api/csv/', Jwt.authenticate, require('./csv'));
routes.use('/api/sms/', Jwt.authenticate, require('./sms'));

// Authenticate
routes.use('/api/auth/', require('./auth'));

module.exports = routes;