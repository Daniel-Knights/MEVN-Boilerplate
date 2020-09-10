const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const ObjectID = require('mongodb').ObjectID;

const router = express.Router();

const connectDb = require('../config/db');

async function usersCollection() {
    const connection = await connectDb;

    console.log(`MongoDB (auth): ${connection.topology.s.state}`);

    return connection.db('vue_express').collection('users');
}

router.get('/user', auth, async (req, res) => {
    const users = await usersCollection();

    const user = await users
        .find({ _id: ObjectID(req.user.id) })
        // All fields except password
        .project({ password: 0 })
        .toArray();

    res.send(user);
});

// Login user
router.post('/login', async (req, res) => {
    const users = await usersCollection();

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    users.findOne({ email }).then(user => {
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        // Validate password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: '7d',
                },
                (err, token) => {
                    if (err) throw err;

                    const userInfo = {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        created_at: user.created_at,
                    };

                    res.json({
                        token,
                        userInfo,
                        message: 'User logged in',
                    }).send();
                }
            );
        });
    });
});

// Signup user
router.post('/signup', async (req, res) => {
    const users = await usersCollection();

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    await users.findOne({ email }).then(user => {
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const newUser = {
            name,
            email,
            password,
        };

        // Create salt and hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
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
                            {
                                expiresIn: '7d',
                            },
                            (err, token) => {
                                if (err) throw err;

                                const userInfo = {
                                    id: user.ops[0]._id,
                                    name: user.ops[0].name,
                                    email: user.ops[0].email,
                                    created_at: user.ops[0].created_at,
                                };

                                res.json({
                                    token,
                                    userInfo,
                                    message: 'User signed up successfully',
                                }).send();
                            }
                        );
                    })
                    .catch(err => {
                        console.error(err);

                        res.status(400).json({
                            msg: 'Something went wrong, please try again or contact support',
                        });
                    });
            });
        });
    });
});

module.exports = router;
