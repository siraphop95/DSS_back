'use strict'
var bcrypt = require('bcrypt')
var mongoose = require('mongoose')
User = mongoose.model('Users')
var jwt = require('jsonwebtoken')

exports.listAllUsers = function (req, res) {
    ensureToken(req, res)
    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            var query = { sort: { firstName: 1 } }
            User.find({}, null, query, function (err, user) {
                if (err) throw err
                res.json(user)
            })
            //Fin

        }
    });



}

exports.createAUser = function (req, res) {

            var newUser = new User(req.body)
            var query = { sort: { firstName: 1 } }
            User.find({username: newUser.username}, null, query, function (err, user) {
                if (err) throw err

                if(typeof user[0]!=='undefined'){
                    //username already exist
                    res.sendStatus(201)
                
                }
                else {
                    //username not exist
                    const saltRounds = 10;
                    bcrypt.hash(newUser.password, saltRounds).then(function (hash) {
                        newUser.password = hash
                        newUser.save(function (err, user) {
                            if (err) throw err
                            res.json(user)
                        })
                    });
                }
            })
            
}

exports.readAUser = function (req, res) {
    ensureToken(req, res)
    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            User.findById(req.params.userId, function (err, user) {
                if (err) throw err
                res.json(user)
            })
            //Fin
        }
    });

}

exports.deleteAUser = function (req, res) {
    ensureToken(req, res)
    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            User.findByIdAndRemove(req.params.userId, function (err, user) {
                if (err) throw err
                const response = {
                    message: "Delete user id: " + req.params.userId + " successfully",
                    id: user._id
                }
                res.json(response)
            })
            //Fin
        }
    });

}

exports.updateAUser = function (req, res) {
    ensureToken(req, res)
    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            var newUser = {}
            newUser = req.body
            console.log(newUser)
            User.findByIdAndUpdate(req.params.userId, newUser, { new: true }, function (err, user) {
                if (err) throw err
                console.log(user)
                res.json(user)
            })
            //Fin
        }
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





