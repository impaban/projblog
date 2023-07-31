const router = require('express').Router();
const users = require('../models/user');
const bcrypt = require('bcrypt');

// Register route
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(12);
        const hashedpass = await bcrypt.hash(req.body.password, salt);
        const newUser = new users({
            username: req.body.username,
            email: req.body.email,
            password: hashedpass,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const foundUser = await users.findOne({ username: req.body.username });
        if (!foundUser) {
            return res.status(400).json('Invalid user or password');
        }

        const validated = await bcrypt.compare(req.body.password, foundUser.password);
        if (!validated) {
            return res.status(400).json('Invalid user or password');
        }
 
        res.status(200).json(foundUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
