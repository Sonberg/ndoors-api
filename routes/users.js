const firebase = require("./../services/firebase");
const routes = require('express').Router();

const firestore = firebase.firestore;
const collection = firebase.collections.users;

const userController = require('../controllers/resourceController')(collection);


routes.get('/profile', (req, res) => res.json(req.user));

routes.get('/', userController.all);

routes.get('/:id', userController.get);

routes.post('/',
    async (req, res) => {
        await firestore.collection(collection).doc(req.body.email).set(req.body);
        res.status(200).send();
    });

routes.put('/:id', userController.put);
routes.patch('/:id', userController.patch);
routes.delete('/:id', userController.delete);

module.exports = routes;