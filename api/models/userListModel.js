'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    username: {
        type: String,
        allowNull: false,
        isUnique: true,
        Required: true
    },
    password: {
        type: String,
        allowNull: false,
        Required: true
    },
    firstName: {
        type: String,
        Required: true
    },
    lastName: {
        type: String,
        Required: true
    },
    email: {
        type: String,
        isEmail: true,
        Required: true
    },
    userType: {
        type: String,
        Required: true
    },
    createdDate:{
        type: Date,
        default :Date.now
    },
})

//Users==collection users
module.exports = mongoose.model('Users', UserSchema)