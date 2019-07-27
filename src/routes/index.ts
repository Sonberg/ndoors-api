import { Router } from 'express';

// Routes
import references from './references';
import users from './users';
import skills from './skills';
import csv from './csv';
import sms from './sms';
import auth from './auth';

const routes = Router();

const isAuthenticated = (req, res, next) => {
	return req.isAuthenticated() ? next() : res.status(401).send();
};

// Routes
routes.use('/api/references/', isAuthenticated, references);
routes.use('/api/users/', isAuthenticated, users);
routes.use('/api/skills/', isAuthenticated, skills);
routes.use('/api/csv/', isAuthenticated, csv);
routes.use('/api/sms/', isAuthenticated, sms);

// Authenticate
routes.use('/api/auth/', auth);
routes.use('/config', (req, res) => res.json(process.env));

export default routes;
