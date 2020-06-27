const express = require("express");
const mongodb = require("mongodb");
const auth = require("../middleware/auth");

const router = express.Router();

const connectDb = require("../config/db");

async function postsCollection() {
    const connection = await connectDb;

    console.log(`MongoDB (posts): ${connection.topology.s.state}`);

    return connection.db("vue_express").collection("posts");
}

// Get posts
router.get("/", async (req, res) => {
    const posts = await postsCollection();

    const count = await posts.estimatedDocumentCount();
    const pagination = 5;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const filteredPosts = await posts
        // Empty object gets all, but could set 'name: "whatever"' for example
        .find({})
        .skip((page - 1) * pagination)
        .limit(pagination)
        .sort({ created_at: -1 })
        .toArray();

    // Create pagination object
    const paginated = {
        total: count,
        data: filteredPosts,
        current_page: page,
        last_page: Math.ceil(count / pagination),
        per_page: req.query.pagination
    };

    res.send(paginated);
});

// Add posts
router.post("/", auth, async (req, res) => {
    const posts = await postsCollection();

    await posts.insertOne({
        text: req.body.data,
        created_at: new Date()
    });
    res.status(201).send();
});

// Delete posts
router.delete("/:id", auth, async (req, res) => {
    const posts = await postsCollection();

    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});

module.exports = router;
