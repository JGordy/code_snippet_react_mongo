const express = require('express'),
      app     = express(),
      logger  = require('morgan'),
      bodyParser = require('body-parser'),
      config  = require('./config/main'),
      mongoose = require('mongoose');



// Start the server
const server = app.listen(config.port);
console.log('Your server is running on port ' + config.port + '.');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev')); // Log requests to API using morgan

// Enable CORS from client-side
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


//database connection
var promise = mongoose.connect(config.database, {
  useMongoClient: true
});
