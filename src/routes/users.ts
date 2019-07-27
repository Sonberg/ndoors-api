import Firebase from '../services/firebase';
import { Router } from 'express';
import ResourceController from '../controllers/resourceController';

const routes = Router();

const firestore = Firebase.firestore;
const collection = Firebase.collections.users;
const controller = ResourceController(collection);

routes.get('/profile', (req, res) => res.json(req.user));

routes.get('/', controller.all);

routes.get('/:id', controller.get);

routes.post('/', async (req, res) => {
	await firestore.collection(collection).doc(req.body.email).set(req.body);
	res.status(200).send();
});

routes.put('/:id', controller.put);
routes.patch('/:id', controller.patch);
routes.delete('/:id', controller.delete);

export default routes;
