const routes = require('express').Router();

// Map api routes
routes.use('/api/references/', require('./references'));
routes.use('/api/verify-reference/', require('./verifyReference'));
routes.use('/api/users/', require('./users'));
routes.use('/api/skills/', require('./skills'));
routes.use('/api/csv/', require('./csv'));
routes.use('/api/sms/', require('./sms'));
routes.use('/api/shared-references/', require('./sharedReferences'));

module.exports = routes;
