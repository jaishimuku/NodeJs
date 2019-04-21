const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

router.get('/list', (req, res) => {
    User.find({}, function (err, docs) {
        if (err) {
            res.send(err);
        } else {
            res.send(docs);
        }
    });
});

router.post('/signup', (req, res, next) => {

    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(422).json({
                    messsage: 'Email already exists'
                })
            } else {

                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save().then(result => {
                            console.log(result);
                            res.status(200).json({
                                messsage: 'User created',
                            });
                        }).catch(err => {
                            console.log(err);
                            res.status(404).json({
                                error: err
                            })
                        })
                    }
                });
            }
        });
});

router.delete('/:userID', (req, res, next) => {
    const id = req.params.userID;
    User.deleteOne({ _id: id }, function (err, data) {
        if (!data) {
            res.status(404).json({
                message: "User of given ID is not found"
            })
        } else {
            console.log(data);
            res.status(200).json({
                message: "User has been deleted",
                data: data
            });
        }
    });
})

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth Failed 1 'no any user' in db"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth Failed 'Any Error'"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userID: user[0]._id
                    }, 'SecretPrivacyKey',
                        {
                            expiresIn: "1h"
                        }
                    );
                    console.log('Token ' + token);
                    return res.status(200).json({
                        message: "Auth sucessful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth Failed 3 'incorrect password'"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;