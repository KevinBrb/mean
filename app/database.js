const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'tutoriel';

const clientPromise = MongoClient.connect(url, { useUnifiedTopology: true });

module.exports = clientPromise.then(client => client.db(dbName));