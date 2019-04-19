const routes = require('express').Router()
const Authentication = require('./../authentication')

routes.post('/token', async (req, res) => {
    try {
        res.json(await Authentication.refresh(req.body.refreshToken));
    } catch (error) {
        res.status(400).send();
    }
});

routes.get('/facebook',
    Authentication.facebook.authenticate,
    function (req, res) {
        // The request will be redirected to FaceBook for authentication, so this
        // function will not be called.
    });

routes.get('/facebook/callback',
    Authentication.facebook.authenticate,
    function (req, res) {
        res.send("ok");
    });

routes.post('/signup', async (req, res) => {
    const body = req.body;
    const password = Authentication.password.generate(body.password);

    res.send(password);
});

routes.post('/login', async (req, res) => {
    try {
        const user = await Authentication.local.authenticate(req);

        res.json(await Authentication.login(user, req));
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Login failed'
        });
    }

});


module.exports = routes;