'use strict';

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3003,
  
  User = require('./api/models/userModel'),
  NoteBookSchema = require('./api/models/notesBookModels'),
  bodyParser = require('body-parser'),
  jsonwebtoken = require("jsonwebtoken");


const mongoose = require('mongoose');
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000 
};


// pass these options to mongo client connect request to avoid DeprecationWarning for current Server Discovery and Monitoring engine
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };


mongoose.connect('mongodb://127.0.0.1:27017/database', mongoClientOptions).then(function(){
    //connected successfully
    console.log("connecting scces")
}, function(err) {
    //err handle
    console.log("connecting error", err)
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function(req, res, next) {
  console.log("req.headers 1", req.headers )
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'SECRET', function(err, decode) {
      if (err) req.user = undefined;
      console.log("req.headers error", err )
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next(); 
  }
});
var routes = require('./api/routes/appRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);

console.log(' RESTful API server started on: ' + port);

module.exports = app;