'use strict';
let { URL } = require('url');
var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  User = mongoose.model('User');

exports.register = function(req, res) {
  var newUser = new User(req.body);
    //   console.log('Url ===>', new URL("http://localhost:3000" + req.url))
  
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function(err, user) {
    if (err) {
      // Check if the user already exist
      User.findOne({
        email: req.body.email
      }, (er, resp) => {
        if(er){
          return res.status(400).send({
            message: err.message
          });
        } else if (resp) {
          return res.status(400).send({
            message: "user already exist"
          });
        }
      })
    } else {
      user.hash_password = undefined;
      return res.status(200).json({message: "Your account is successfuly created, you can login now and start creating notebooks"});
    }
  });
};

exports.sign_in = function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    console.log("kflkdlfkldkfl")
    if (err) throw err;
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
    return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'SECRET'), user: user });
  });
};

exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {

    return res.status(401).json({ message: 'Unauthorized user!!' });
  }
};
exports.profile = function(req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  } 
  else {
   return res.status(401).json({ message: 'Invalid token' });
  }
};