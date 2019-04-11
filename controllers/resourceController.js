const firestore = require('../config/firebase');
const _ = require('lodash');


module.exports = (collection) => {
    return {
        all: async (req, res) => {
            let reference = firestore.collection(collection);

            for (const key in req.query) {
                reference = reference.where(key, '==', req.query[key]);
            }

            const snap = await reference.get()
            const data = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            res.json(data);
        },
        get: async (req, res) => {
            const snap = await firestore.collection(collection).doc(req.params.id).get();
            const data = snap.data();

            if (!data) {
                return res.status(404).send();
            }

            res.json({
                id: snap.id,
                ...data
            });
        },
        post: async (req, res) => {
            const snap = await firestore.collection(collection).add(req.body);

            res.json({
                id: snap.id,
                ...req.body
            });
        },
        put: async (req, res) => {
            await firestore.collection(collection).doc(req.params.id).set(req.body);
            res.status(200).send();
        },
        patch: async (req, res) => {
            await firestore.collection(collection).doc(req.params.id).update(req.body);
            res.status(200).send();
        },
        delete: async (req, res) => {
            await firestore.collection(collection).doc(req.params.id).delete();
            res.status(200).send();
        }
    }

}