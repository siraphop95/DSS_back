'use strict'
var mongoose = require('mongoose')
Drug = mongoose.model('Drugs')

exports.listAllDrugs = function(req, res){
    var query = { sort: { createdDate: 1 } }
    Drug.find({}, null, query, function(err, drug){
        if(err) throw err
        //console.log(user)
        res.json(drug)
    })
}

exports.createADrug = function(req, res){
    var newDrug = new Drug(req.body)
    newDrug.save(function(err, drug){
        if(err) throw err
        res.json(drug)
    })
}
/*
exports.readAUser = function(req, res){
    //console.log(req.params.userId)
    User.findById(req.params.userId, function(err, user){
        if(err) throw err
        res.json(user)
    })
}

exports.deleteAUser = function(req, res){
    //console.log(req.params.userId)
    User.findByIdAndRemove(req.params.userId, function(err, user){
        if(err) throw err
        const response = {
            message: "Delete user id: "+ req.params.userId +" successfully",
            id: user._id
        }
        res.json(response)
    })
}

exports.updateAUser = function(req, res){
    console.log(req.params.userId)
    var newUser = {}
    newUser = req.body
    console.log(newUser)
    User.findByIdAndUpdate(req.params.userId, newUser, {new: true}, function(err, user){
        if(err) throw err
        console.log(user)
        res.json(user)
    })
    
}
*/