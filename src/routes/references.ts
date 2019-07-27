import { Router } from 'express';
import Firebase from '../services/firebase';
import ReferenceController from '../controllers/resourceController';

const controller = ReferenceController(Firebase.collections.references);
const routes = Router();

routes.get('/', controller.all);

// Load created by user
routes.get('/created', (req, res) => {
	return controller.all(
		{
			query: {
				userEmail: req.user.email
			}
		},
		res
	);
});

// Load references for user
routes.get('/recived', (req, res) => {
	return controller.all(
		{
			query: {
				referentEmail: req.user.email
			}
		},
		res
	);
});

routes.get('/:id', controller.get);
routes.post('/', controller.post);
routes.put('/:id', controller.put);
routes.patch('/:id', controller.patch);
routes.delete('/:id', controller.delete);

export default routes;
