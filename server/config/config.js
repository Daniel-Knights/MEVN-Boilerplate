const mongodb = require("mongodb");

const config = mongodb.MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = config;
