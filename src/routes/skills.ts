import { Router } from 'express';
import Firebase from '../services/firebase';

import ReferenceController from '../controllers/resourceController';

const controller = ReferenceController(Firebase.collections.skills);
const routes = Router();

routes.get('/', controller.all);
routes.get('/:id', controller.get);
routes.post('/', controller.post);
routes.put('/:id', controller.put);
routes.patch('/:id', controller.patch);
routes.delete('/:id', controller.delete);

export default routes;
