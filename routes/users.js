
const router = require('express').Router();
const users = require('../models/user');
const post = require('../models/post');
const bcrypt = require('bcrypt');

// Update
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(12);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await users.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );

            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json('You can only update your account');
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await users.findById(req.params.id);
            try {
                await post.deleteMany({ username: user.username });
                await users.findByIdAndDelete(req.params.id);
                res.status(200).json('User has been deleted');
            } catch (err) {
                res.status(404).json('User not found');
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json('You can only delete your account');
    }
});
//get post
router.get('/:id', async (req, res) => {
    try {
        const foundUser = await users.findById(req.params.id);
        const { password, ...others } = foundUser._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
