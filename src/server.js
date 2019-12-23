'use strict';

var express = require('express');
var path = require('path');
var mongo = require('mongodb');
var routes = require('./app/routes/unfurl.js');
var api = require('./app/api/furl.js');
require('dotenv').config({
  silent: false //true
});
var app = express();
mongo.MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/5hr-ink', function(err, db) {

  if (err) {
    throw new Error('Database failed to connect!');
  } else {
    console.log('Successfully connected to MongoDB on port 27017.');
    console.log(db)
  }

  // The format follows as, alias to use for real path, also allows permission to such path.

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  db.createCollection("sites", {
    capped: true,
    size: 5242880,
    max: 5000
  });

  routes(app, db);
  api(app, db);

  var port = process.env.PORT || 8080;
  app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
  });

});