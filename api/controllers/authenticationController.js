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
            res.json({ message: "user does not exist",status: 404 })
        }
        else {
            const { password } = req.body
            const hash = checkUser.password
            bcrypt.compare(password, hash, function (err, isValid) {
                if (isValid) {
                    var token = jwt.sign({ user: checkUser.id }, "Stack", {
                        expiresIn: '1h'
                    });
                    let auser = {
                        _id: checkUser._id,
                        username: checkUser.username,
                        firstName: checkUser.firstName,
                        lastName: checkUser.lastName,
                        email: checkUser.email,
                        createdDate: checkUser.createdDate
                    }
                    var user= auser;

                    res.json({
                        user,
                        message: 'Authenticated! Use this token in the "Authorization" header',
                        token: token,
                    });
                }
                else {
                    res.json({ message: "password does not match",status: 405})
                }
            });


        }
        //const { password } = req.body.password

        /*
        var token = jwt.sign({user: user.id }, "Stack", {
            expiresIn: '1h' 
       });
            res.json({
            user,
            message: 'Authenticated! Use this token in the "Authorization" header',
            token: token,
        });
*/

    })

    // then return a token, secret key should be an env variable
    //const token = jwt.sign({ user: user.id }, 'secret_key_goes_here');
    /*
    var token = jwt.sign({user: user.id }, "Stack", {
        expiresIn: '1h' 
   });

    res.json({
        user: {
            name: 'test',
            id: '123'
        },
        message: 'Authenticated! Use this token in the "Authorization" header',
        token: token
    });
    */
}

exports.logout = function (req, res) {
    const token = req.params.token

    res.json({
        message: 'Logout successful'
    });
}

