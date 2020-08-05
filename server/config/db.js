const mongodb = require("mongodb");

const connectDb = mongodb.MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err =>
    res.status(400).json({ msg: "Could not connect to MongoDB", err })
);

module.exports = connectDb;
