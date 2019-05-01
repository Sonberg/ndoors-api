const routes = require('express').Router()
const Authentication = require('./../authentication')

const saveSocketIdToSession = (req, res, next) => {
    if (!req.query.socketId) {
        return res.status(400).json({
            message: 'SocketId missing from query'
        })
    }

    req.session.socketId = req.query.socketId
    next()
}

routes.get(
    '/authenticated',
    (req, res) => res.json({
        isAuthenticated: req.isAuthenticated()
    }));


// Facebook
routes.get(
    '/facebook',
    saveSocketIdToSession,
    Authentication.facebook.authenticate);

routes.get(
    '/facebook/callback',
    Authentication.facebook.authenticate,
    (req, res) => {
        req.session.socketId && req.app.get('io').in(req.session.socketId).emit('facebook', req.user)
        res.status(200).send()
    });

// Logout
routes.post(
    '/logout',
    async (req, res) => {
        req.session.destroy((err) => {
            res.send(err);
        });
    });

// Sign up with password
routes.post(
    '/signup',
    async (req, res) => {
        const body = req.body;
        const password = Authentication.password.generate(body.password);
        res.send(password);
    });

// Login using password
routes.post(
    '/login',
    Authentication.local.authenticate,
    async (req, res) => res.json(await Authentication.login(req)));

module.exports = routes;