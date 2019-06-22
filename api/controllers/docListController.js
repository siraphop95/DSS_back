'use strict'
var mongoose = require('mongoose')
Doc = mongoose.model('Documents')
User = mongoose.model('Users')

exports.listAllDocuments = function(req, res){
    var query = { sort: { createdDate: 1 } }
    Doc.find({}, null, query, function(err, doc){
        if(err) throw err
        //console.log("user")
        res.json(doc)
    })
}

exports.createADocument = function(req, res){
    var newDoc = new Doc(req.body)
    
    newDoc.save(function(err, doc){
        if(err) throw err
        res.json(doc)
    })
}
exports.listNewDocuments = function(req, res){
    var query = { sort: { createdDate: 1 } }

    Doc.find({ medicalPersonalUsername: 'x' }, null, query, function(err, doc){
        if(err) throw err
        //console.log(user)
        res.json(doc)
    })
}

exports.listQnDocuments = function(req, res){
    var query = { sort: { createdDate: 1 } }

    Doc.find({ clientUsername: req.params.username }, null, query, function(err, doc){
        if(err) throw err
        //console.log(user)
        res.json(doc)
    })
}

exports.listAnsDocuments = function(req, res){
    var query = { sort: { createdDate: 1 } }

    Doc.find({ medicalPersonalUsername: req.params.username }, null, query, function(err, doc){
        if(err) throw err
        //console.log(user)
        res.json(doc)
    })
}

exports.readADocument = function(req, res){
    //console.log(req.params.docId)
    //console.log("test")
    Doc.findById(req.params.docId, function(err, doc){
        if(err) throw err
        
        res.json(doc)
    })
}
/*
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

*/
exports.updateADocument = function(req, res){
    console.log(req.params.docId)
    var newDoc = {}
    newDoc = req.body
    console.log(newDoc)
    Doc.findByIdAndUpdate(req.params.docId, newDoc, {new: true}, function(err, doc){
        if(err) throw err
        console.log(doc)
        res.json(doc)
    })
    
}
