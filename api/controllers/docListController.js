'use strict'
var mongoose = require('mongoose')
Doc = mongoose.model('Documents')
User = mongoose.model('Users')
var jwt = require('jsonwebtoken')

exports.listAllDocuments = function (req, res) {
    ensureToken(req, res)
    jwt.verify(req.token, 'Secret', function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            var query = { sort: { createdDate: -1 } }
            Doc.find({}, null, query, function (err, doc) {
                if (err) throw err
                //console.log("user")
                res.json(doc)
            })
            //Fin
        }
    });

}

exports.createADocument = function (req, res) {

    ensureToken(req, res)
    jwt.verify(req.token, 'Secret', function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            var newDoc = new Doc(req.body)
            newDoc.save(function (err, doc) {
                if (err) throw err
                res.json(doc)
            })
            //Fin
        }
    });

}
exports.listNewQuestions = function (req, res) {

    ensureToken(req, res)
    
    jwt.verify(req.token, 'Secret', function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            var query = { sort: { createdDate: -1 } }
            Doc.find({ medicalPersonalUsername: 'x' }, null, query, function (err, doc) {
                if (err) throw err
                //console.log(user)
                res.json(doc)
            })
            //Fin
        }
    });

}

exports.listMyQnDocuments = function (req, res) {

    ensureToken(req, res)
    jwt.verify(req.token, 'Secret', function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            var query = { sort: { createdDate: -1 } }

            Doc.find({ clientUsername: req.params.username , medicalPersonalUsername: 'x'}, null, query, function (err, doc) {
                if (err) throw err
                //console.log(user)
                res.json(doc)
            })
            //Fin
        }
    });

}

exports.listMyAnsDocuments = function (req, res) {

    ensureToken(req, res)
    jwt.verify(req.token, 'Secret', function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            var query = { sort: { modifiedDate: -1 } }

            Doc.find({ medicalPersonalUsername: req.params.username }, null, query, function (err, doc) {
                if (err) throw err
                //console.log(user)
                res.json(doc)
            })
            //Fin
        }
    });

}

exports.listreplyInboxDocuments = function (req, res) {

    ensureToken(req, res)
    jwt.verify(req.token, 'Secret', function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            var query = { sort: { modifiedDate: -1 } }

            Doc.find({ clientUsername: req.params.username, medicalPersonalUsername: { $ne: 'x' } }, null, query, function (err, doc) {
                if (err) throw err
                //console.log(user)
                res.json(doc)
            })
            //Fin
        }
    });

}

exports.readADocument = function (req, res) {

    ensureToken(req, res)
    jwt.verify(req.token, 'Secret', function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            Doc.findById(req.params.docId, function (err, doc) {
                if (err) throw err

                res.json(doc)
            })
            //Fin
        }
    });

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
exports.updateADocument = function (req, res) {
    console.log("Test")
    ensureToken(req, res)
    jwt.verify(req.token, 'Secret', function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            console.log("DATE:xx"+new Date())
            var newDoc = {}
            newDoc = req.body
            newDoc.modifiedDate = new Date()
            console.log(newDoc)
            Doc.findByIdAndUpdate(req.params.docId, newDoc, { new: true }, function (err, doc) {
                if (err) throw err
                console.log(doc)
                res.json(doc)
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