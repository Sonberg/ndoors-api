const firebase = require("firebase");

firebase.initializeApp( {
    apiKey: "AIzaSyCOrnS1700rpSB_4DUnGpxgqOk5GYr1bbs",
    authDomain: "ndoors-57f85.firebaseapp.com",
    databaseURL: "https://ndoors-57f85.firebaseio.com",
    projectId: "ndoors-57f85",
    storageBucket: "ndoors-57f85.appspot.com",
    messagingSenderId: "122727952272"
  });

const db = firebase.firestore();

module.exports = db;
