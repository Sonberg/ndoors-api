import { check, validationResult, body } from 'express-validator';
import { Router } from 'express';
import { Password, login, local } from '../authentication';
import Firebase from '../services/firebase';

const routes = Router();

routes.get('/authenticated', (req, res) => {
	res.json({
		isAuthenticated: req.isAuthenticated(),
		expires: req.isAuthenticated() && req.session && req.session.cookie ? req.session.cookie.expires : null,
		user: req.user
	});
});

// Logout
routes.post('/logout', async (req, res) => {
	req.session.destroy((err) => {
		res.send(err);
	});
});

// Sign up with password
routes.post(
	'/signup',
	[
		check('name').not().isEmpty(),
		check('email').not().isEmpty().isEmail(),
		check('password').not().isEmpty(),
		body('repeatPassword').custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Password confirmation does not match password');
			}
			return true;
		}),
		body('email').custom(async (value) => {
			if (await Firebase.user(value)) {
				throw new Error('E-mail already in use');
			}
		})
	],
	async (req, res, next) => {
		const result = validationResult(req);

		if (!result.isEmpty()) {
			return res.status(422).json({ errors: result.array() });
		}

		const { name, email, password } = req.body;
		const hashedPassword = Password(password);

		await Firebase.post(Firebase.collections.users, { name, email, password: hashedPassword });

		next();
	},
	local.authenticate,
	async (req, res) => res.json(await login(req))
);

// Login using password
routes.post('/login', local.authenticate, async (req, res) => res.json(await login(req)));

export default routes;

// // Facebook
// routes.get(
//     '/facebook',
//     saveSocketIdToSession,
//     Authentication.facebook.authenticate);

// routes.get(
//     '/facebook/callback',
//     Authentication.facebook.authenticate,
//     (req, res) => {
//         req.session.socketId && req.app.get('io').in(req.session.socketId).emit('facebook', req.user)
//         res.status(200).send()
//     });

// const saveSocketIdToSession = (req, res, next) => {
//     if (!req.query.socketId) {
//         return res.status(400).json({
//             message: 'SocketId missing from query'
//         })
//     }

//     req.session.socketId = req.query.socketId
//     next()
// }
