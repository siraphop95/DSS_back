'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var DocSchema = new Schema({
    title: {
        type: String
    },
    question: {
        type: String
    },
    drugName: {
        type: String
    },
    drugGroup: {
        type: String
    },
    tradeName: {
        type: String
    },
    questionType: {
    
    },
    keywords: {

    },
    age: {
        type: String
    },
    weight: {
        type: String
    },
    LBW: {
        type: String
    },
    height: {
        type: String
    },
    clientInfoETC: {
        type: String
    },
    
    purpose: {
        
    },
    respondTime: {
        type: String
    },
    answerDetail: {
        type: String,
        //Required: 'Please enter'
    },
    createdDate:{
        type: Date,
        default :Date.now
    },
    clientUsername: {
        type: String
    },
    medicalPersonalUsername: {
        type: String
    }
})

//Users==collection users
module.exports = mongoose.model('Documents', DocSchema)