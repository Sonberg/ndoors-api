const firebase = require("firebase");

firebase.initializeApp({
  apiKey: "AIzaSyCOrnS1700rpSB_4DUnGpxgqOk5GYr1bbs",
  authDomain: "ndoors-57f85.firebaseapp.com",
  databaseURL: "https://ndoors-57f85.firebaseio.com",
  projectId: "ndoors-57f85",
  storageBucket: "ndoors-57f85.appspot.com",
  messagingSenderId: "122727952272"
});

const collections = {
  users: 'Users',
  skills: 'Skills',
  references: 'References',
  refreshTokens: 'RefreshTokens'
}

const firestore = firebase.firestore();


// ALL
const all = async (collection, query) => {
  let reference = firestore.collection(collection);

  for (const x of query) {
    reference = reference.where(...x);
  }

  const snap = await reference.get();
  return snap.docs.map(x => x.data());
}

// GET
const get = async (collection, id) => {
  const reference = firestore.collection(collection).doc(id);
  const snap = await reference.get();
  return snap.data();
}

// POST
const post = async (collection, body) => {
  const snap = await firestore.collection(collection).add(body);

  return {
    id: snap.id,
    ...body
  };
}

// PUT
const put = (collection, id, body) => firestore.collection(collection).doc(id).set(body);

// PATCH
const patch = (collection, id, body) => firestore.collection(collection).doc(id).update(body);

// DELETE
const remove = (collection, id) => firestore.collection(collection).doc(id).delete();

const user = async email => {
  return await get(collections.users, email);
};

module.exports = {
  collections,
  firestore,
  user,
  post,
  patch,
  put,
  remove,
  all,
  get
};