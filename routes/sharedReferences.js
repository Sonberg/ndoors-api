const routes = require('express').Router();
const firestore = require('./../config/index');
const referenceLinksDb = firestore.collection('References')

routes.get('/:id', async (req, res) => {
    referenceLinksDb.get().then(querySnapshot => {
        if (querySnapshot) {
            let dataList = [];
            querySnapshot.forEach(function (doc) {
                if (doc.data().userEmail === req.params.id) {
                    dataList.push(doc.data());
                }
            });
            res.send(dataList);
        } else {
            res.send({ status: "Not Found" });
        }
    })
})

module.exports = routes;
