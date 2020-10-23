const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const auth = require('../middleware/auth');

const router = express.Router();

const connectDb = require('../config/db');

async function postsCollection() {
    const connection = await connectDb;

    console.log(`MongoDB (posts): ${connection.topology.s.state}`);

    return connection.db('vue_express').collection('posts');
}

// Get posts
router.get('/', async (req, res) => {
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
        .toArray()
        .catch(err => {
            return res.status(500).json({
                success: false,
                msg: 'Unable to fetch posts',
                err: err.message,
            });
        });

    // Create pagination object
    const paginated = {
        total: count,
        data: filteredPosts,
        current_page: page,
        last_page: Math.ceil(count / pagination),
        per_page: req.query.pagination,
    };

    res.json({
        success: true,
        msg: 'Successfully fetched posts',
        paginated,
    });
});

// Add posts
router.post('/', auth, async (req, res) => {
    const posts = await postsCollection();

    if (!req.body.data)
        return res.status(400).json({
            success: false,
            msg: 'Please fill required fields',
        });

    await posts
        .insertOne({
            text: req.body.data,
            created_at: new Date(),
        })
        .then(post => {
            res.status(201).json({
                success: true,
                msg: 'Post created',
                post: post.ops[0],
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                msg: 'Unable to create post',
                err: err.message,
            });
        });
});

// Delete posts
router.delete('/:id', auth, async (req, res) => {
    const posts = await postsCollection();

    if (!req.params.id)
        return res.status(400).json({
            success: false,
            msg: 'Please provide an ID',
        });

    await posts
        .deleteOne({ _id: ObjectID(req.params.id) })
        .then(response => {
            if (!response.deletedCount)
                return res.status(404).json({
                    success: false,
                    msg: 'Post does not exist',
                });

            res.status(204).json({ success: true, msg: 'Post deleted' });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                msg: 'Unable to delete post',
                err: err.message,
            });
        });
});

module.exports = router;
