const routes = require('express').Router();
const validate = require('../middleware/validate');
const firebase = require('./../services/firebase')
const referenceController = require('../controllers/resourceController')(firebase.collections.skills);

routes.get('/', validate, referenceController.all);
routes.get('/:id', validate, referenceController.get);
routes.post('/', validate, referenceController.post);
routes.put('/:id', validate, referenceController.put);
routes.patch('/:id', validate, referenceController.patch);
routes.delete('/:id', validate, referenceController.delete);

module.exports = routes;
