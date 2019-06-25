'use strict'
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var mongoose = require('mongoose')
User = mongoose.model('Users')

exports.login = function (req, res) {
    var query = { sort: { createdDate: 1 } }
    User.findOne({ username: req.body.username }, null, query, function (err, checkUser) {
        if (err) throw err
        if (!checkUser) {
            res.json({ message: "user does not exist", status: 403 })
        }
        else {
            const { password } = req.body
            const hash = checkUser.password
            bcrypt.compare(password, hash, function (err, isValid) {
                if (isValid) {
                    var token = jwt.sign({ user: checkUser.id }, "Secret", {
                        expiresIn: '24h' // expires in 24 hours
                    });
                    let auser = {
                        _id: checkUser._id,
                        username: checkUser.username,
                        firstName: checkUser.firstName,
                        lastName: checkUser.lastName,
                        email: checkUser.email,
                        userType: checkUser.userType,
                        profession: checkUser.profession,
                        createdDate: checkUser.createdDate
                    }
                    var user = auser;
                    res.json({
                        user,
                        message: 'Authenticated! Use this token in the "Authorization" header',
                        token: token,
                        status: 200
                    });
                }
                else {
                    res.json({ message: "password does not match", status: 403 })
                }
            });
        }
    })
}

exports.authentication = function (req, res) {
    ensureToken(req, res)
    jwt.verify(req.token, 'Secret', function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            res.sendStatus(200);
        }
    });


    
}



exports.logout = function (req, res) {
    const token = req.params.token

    res.json({
        message: 'Logout successful'
    });
}

function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
    } else {
        return 403;
    }
}