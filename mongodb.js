var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://h4s:HackforSweden@cluster0-swioq.mongodb.net/test?retryWrites=true";

module.exports = function (callback) {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) {
      return;
    }

    callback(db.db('ndoors'));
  });
}
