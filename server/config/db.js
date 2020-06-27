const mongodb = require("mongodb");

const connectDb = mongodb.MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connectDb;
