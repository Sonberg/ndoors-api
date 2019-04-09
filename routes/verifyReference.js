const routes = require('express').Router();
const firestore = require('./../config/index');
const referenceLinksDb = firestore.collection('References')

routes.get('/:id', async (req, res) => {
    referenceLinksDb.doc(req.params.id).get().then(snapshot => {
        if (snapshot.exists) {
            let results = snapshot.data();
            results["status"] = "Found";
            res.send(results);
        } else {
            res.send({status: "Not Found"})
        }
    })
})

routes.post('/:id/verified/:value', async (req, res) => {
    referenceLinksDb.doc(req.params.id).update({
        verified: (req.params.value === "true")
    })
})

routes.post('/:id/skills', async (req, res) => {
    referenceLinksDb.doc(req.params.id).update({'skills': req.body})
})
routes.post('/:id/abilities', async (req, res) => {
    referenceLinksDb.doc(req.params.id).update({'abilities': req.body})
})

routes.post('/:id/note', async (req, res) => {
    console.log("hello ", req.body)
    referenceLinksDb.doc(req.params.id).update({'referenceNote': req.body.note})
})

module.exports = routes;
