// setup Express
var app = require('./models/express.js');

// setup mongoose
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1:27017/list');

// models
var api = require('./models/api.js');
var User = require('./models/user.js');
var Item = require('./models/item.js');

// start the server
var server = app.listen(3000, function () {
    var host = server.address().address;
    console.log("started on host " + host);
    var port = server.address().port;
    console.log("Started on port " + port);

});


