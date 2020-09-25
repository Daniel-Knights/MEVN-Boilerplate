const mongodb = require('mongodb');

const connectDb = mongodb.MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(err => console.error(err));

if (connectDb) console.log('MongoDB Connected');

module.exports = connectDb;
