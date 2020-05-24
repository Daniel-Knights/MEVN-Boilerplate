const mongodb = require("mongodb");
const keys = require("./default.json");

const config = mongodb.MongoClient.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = config;
