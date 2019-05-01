const routes = require('express').Router();
const firebase = require('./../services/firebase')
const referenceController = require('../controllers/resourceController')(firebase.collections.references);

routes.get('/', referenceController.all);

// Load created by user
routes.get('/created', (req, res) => {
    return referenceController.all({
        query: {
            userEmail: req.user.email
        }
    }, res);
});

// Load references for user
routes.get('/recived', (req, res) => {
    return referenceController.all({
        query: {
            referentEmail: req.user.email
        }
    }, res);
});

routes.get('/:id', referenceController.get);
routes.post('/', referenceController.post);
routes.put('/:id', referenceController.put);
routes.patch('/:id', referenceController.patch);
routes.delete('/:id', referenceController.delete);

module.exports = routes;