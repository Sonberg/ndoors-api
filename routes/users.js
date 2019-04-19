const firebase = require("./../services/firebase");
const routes = require('express').Router();
const validate = require('../middleware/validate');

const firestore = firebase.firestore;
const collection = firebase.collections.users;

const userController = require('../controllers/resourceController')(collection);
const {
    check
} = require('express-validator/check');

routes.get('/', validate, userController.all);
routes.get('/profile', async (req, res) => {
    res.json(req.user);
});

routes.get('/:id', validate, userController.get);

routes.post('/', [
        check('email').isEmail(),
        check('name').exists()
    ],
    validate,
    async function (req, res) {
        await firestore.collection(collection).doc(req.body.email).set(req.body);
        res.status(200).send();
    });

routes.put('/:id', validate, userController.put);
routes.patch('/:id', validate, userController.patch);
routes.delete('/:id', validate, userController.delete);

module.exports = routes;