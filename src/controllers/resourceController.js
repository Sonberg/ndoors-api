import Firebase from '../services/firebase'

const firestore = Firebase.firestore;

export default (collection) => {
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
            const data = await Firebase.get(collection, req.params.id);

            if (!data) {
                return res.status(404).send();
            }
            res.json(data);
        },
        post: async (req, res) => {
            const data = await Firebase.post(collection, req.body);
            res.json(data);
        },
        put: async (req, res) => {
            await Firebase.put(collection, req.params.id, req.body);
            res.status(200).send();
        },
        patch: async (req, res) => {
            await Firebase.patch(collection, req.params.id, req.body);
            res.status(200).send();
        },
        delete: async (req, res) => {
            await Firebase.remove(collection, req.params.id);
            res.status(200).send();
        }
    }

}