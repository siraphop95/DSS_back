var express = require('express')
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


mongoose = require('mongoose')
User = require('./api/models/userListModel')
Doc = require('./api/models/docListModel')
Drug = require('./api/models/drugListModel')

mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost/training', function(error){
//     if(error) throw error
//     console.log('Successfully connected');
// })
mongoose.connect('mongodb+srv://siraphop95:dss123456@cluster0-360oz.gcp.mongodb.net/DSS?retryWrites=true&w=majority', function (error) {
    if (error) throw error
    console.log('Successfully connected');
    mongoose.connection.close()
    
})



Doc = mongoose.model('Documents')
    var newDoc = new Doc(
        //put new doc here
    )
    newDoc.save(function (err, doc) {
        if (err) throw err
    })

    User = mongoose.model('Users')
    var newUser = new User(
        //put new user here
    )
    newUser.save(function(err, user){
        if(err) throw err
    })

