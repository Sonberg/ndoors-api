const routes = require('express').Router();

// Map api routes
routes.use('/api/references/', require('./references'));
routes.use('/api/users/', require('./users'));
routes.use('/api/skills/', require('./skills'));
routes.use('/api/csv/', require('./csv'));
routes.use('/api/sms/', require('./sms'));

module.exports = routes;