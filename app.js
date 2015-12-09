// setup Express
var app = require('./models/express.js');

// setup mongoose
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/list');

// models
var api = require('./models/api.js');
var User = require('./models/user.js');
var Item = require('./models/item.js');

// start the server
var server = app.listen(3000, "", function () {
    console.log("Started on port 3000");
    var host = server.address().address;
    var port = server.address().port;
});

var http = require ('http');         // For serving a basic web page.
var mongoose = require ("mongoose"); // The reason for this demo.

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/HelloMongoose';

// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = process.env.PORT || 5000;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});
