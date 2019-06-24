var express = require('express')
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var cors = require('cors')




app = express()
port = process.env.PORT || 3000
mongoose = require('mongoose')
User = require('./api/models/userListModel')
Doc = require('./api/models/docListModel')
Drug = require('./api/models/drugListModel')

mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost/training', function(error){
//     if(error) throw error
//     console.log('Successfully connected');
// })
mongoose.connect('mongodb+srv://siraphop95:dss123456@cluster0-360oz.gcp.mongodb.net/DSS?retryWrites=true&w=majority', function(error){
    if(error) throw error
    console.log('Successfully connected');
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.set({
        'content-type': 'application/json', 
        "X-Content-Type-Options": "nosniff",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, Authorization",
        "Access-Control-Allow-Origin": "*"
     });
    next();
  });
var routes = require('./api/routes/listRoutes')
routes(app)

app.listen(port)

console.log('User List started on : '+ port)