const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;
const auth = require('../middleware/auth');

const router = express.Router();

const connectDb = require('../config/db');

async function usersCollection() {
    const connection = await connectDb;

    console.log(`MongoDB (auth): ${connection.topology.s.state}`);

    return connection.db('vue_express').collection('users');
}

router.get('/user', auth, async (req, res) => {
    const users = await usersCollection();

    if (!req.user.id)
        res.status(400).json({
            success: false,
            msg: 'Please provide an ID',
        });

    const user = await users
        .find({ _id: ObjectID(req.user.id) })
        // All fields except password
        .project({ password: 0 })
        .toArray()
        .then(() => {
            if (!user)
                return res.status(404).json({
                    success: false,
                    msg: 'User does not exist',
                });

            res.json({ success: true, user });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                msg: 'Unable to fetch user',
                err: err.message,
            });
        });
});

// Login user
router.post('/login', async (req, res) => {
    const users = await usersCollection();

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            msg: 'Please enter all fields',
        });
    }

    // Check for existing user
    users
        .findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: 'User does not exist',
                });
            }

            // Validate password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (!isMatch) {
                    return res.status(400).json({
                        success: false,
                        msg: 'Invalid credentials',
                    });
                }

                jwt.sign(
                    { id: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: '7d' },
                    (err, token) => {
                        if (err) throw err;

                        const userInfo = {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            created_at: user.created_at,
                        };

                        res.json({
                            success: true,
                            token,
                            userInfo,
                            message: 'User logged in',
                        });
                    }
                );
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                msg: 'Unable to log in user',
                err: err.message,
            });
        });
});

// Signup user
router.post('/signup', async (req, res) => {
    const users = await usersCollection();

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            msg: 'Please enter all fields',
        });
    }

    // Check for existing user
    await users.findOne({ email }).then(user => {
        if (user)
            return res.status(409).json({
                success: false,
                msg: 'User already exists',
            });

        const newUser = {
            name,
            email,
            password,
        };

        // Create salt and hash
        bcrypt.hash(newUser.password, 10, async (err, hash) => {
            if (err) throw err;
            newUser.password = hash;

            await users
                .insertOne({
                    name: newUser.name,
                    email: newUser.email,
                    password: newUser.password,
                    created_at: new Date(),
                })
                .then(user => {
                    jwt.sign(
                        { id: user.ops[0]._id },
                        process.env.JWT_SECRET,
                        { expiresIn: '7d' },
                        (err, token) => {
                            if (err) throw err;

                            const userInfo = {
                                id: user.ops[0]._id,
                                name: user.ops[0].name,
                                email: user.ops[0].email,
                                created_at: user.ops[0].created_at,
                            };

                            res.status(201).json({
                                success: true,
                                token,
                                userInfo,
                                message: 'User signed up successfully',
                            });
                        }
                    );
                })
                .catch(err => {
                    console.error(err);

                    res.status(500).json({
                        success: false,
                        msg: 'Something went wrong, please try again or contact support',
                        err: err.msg,
                    });
                });
        });
    });
});

module.exports = router;
