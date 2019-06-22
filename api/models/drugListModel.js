'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var DrugSchema = new Schema({
    tradeName: {
        type: String,
        Required: 'Please enter'
    },
    genericName: {
        type: String,
        Required: 'Please enter'
    }
})

//Users==collection users
module.exports = mongoose.model('Drugs', DrugSchema)