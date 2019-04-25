const routes = require('express').Router();
const firebase = require('./../services/firebase')
const referenceController = require('../controllers/resourceController')(firebase.collections.references);

routes.get('/', referenceController.all);
routes.get('/:id', referenceController.get);
routes.post('/', referenceController.post);
routes.put('/:id', referenceController.put);
routes.patch('/:id', referenceController.patch);
routes.delete('/:id', referenceController.delete);

module.exports = routes;