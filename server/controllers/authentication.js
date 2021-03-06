const jwt = require('jsonwebtoken'),
      crypto = require('crypto'),
      User = require('../models/user'),
      config = require('../config/main'),
      Snippet = require('../models/snippet');


function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080 // in seconds
  });
}
// Set user info from request
function setUserInfo(request) {
  return {
    _id: request._id,
    name: request.name,
    email: request.email,
  };
}

//========================================
// User Login Route
//========================================

exports.login = function(req, res, next) {
  let userInfo = setUserInfo(req.user);
  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  });
}
//========================================
// User Registration Route
//========================================
exports.register = function(req, res, next) {
  // Check for registration errors
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.'});
  }
  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }
  User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }
      // If user is not unique, return error
      if (existingUser) {
        return res.status(422).send({ error: 'That email address is already in use.' });
      }
      // If email is unique and password was provided, create account
      let user = new User({
        email: email,
        password: password,
        name: name,
      });
      user.save(function(err, user) {
        if (err) { return next(err); }
        // Respond with JWT if user was created
        let userInfo = setUserInfo(user);
        res.status(201).json({
          token: 'JWT ' + generateToken(userInfo),
          user: userInfo
        });
      });
  });
}

//========================================
// Delete User Route
//========================================

exports.delete = (req, res, next) => {
  // console.log(req.user);
  // if (req.user._id === req.params.id) {
  User.deleteOne({_id: req.params.id})
    .then(data => {
      res.status(200).send({
        message: 'Successfully Removed'
      });
    })
    .catch(err => {
      res.status(404).send(err)
    })
  // } else {
  //   res.status(404).send('Bad Kitty')
  // }
}

//========================================
// Create Snippet Route
//========================================

exports.createSnippet = (req, res, next) => {

  let arr = req.body.tags.split(', ');

  let newSnippet = {
    username: 'jgordy24',
    title: req.body.title,
    code: req.body.code,
    notes: req.body.notes,
    language: req.body.language,
    tags: req.body.tags.split(', ')
  }

  Snippet.create(newSnippet)
  .then(data => {
    res.status(200).send({
      status: 'success',
      data: data
    })
  })
  .catch(err => {
    res.status(404).send({
      status: 'fail',
      data: err
    })
  });
}

//========================================
// Find Snippets Route
//========================================

exports.findSnippets = (req, res, next) => {
  Snippet.find({})
  .then(data => {
    res.status(200).send({
      status: 'success',
      data: data
    })
    .catch(err => {
      res.status(404).send({
        status: 'fail',
        data: err
      })
    })
  })
};

//========================================
// Update Snippet Route
//========================================

exports.updateSnippet =(req, res, next) => {

  let newSnippet = {
    title: req.body.title,
    code: req.body.code,
    notes: req.body.notes,
    language: req.body.language,
    tags: req.body.tags.split(', ')
  }

  Snippet.update({_id: req.params.id}, {$set: newSnippet
  })
  .then(data => {
    res.status(200).send({
      status: 'success',
      data: data
    })
    .catch(err => {
      res.status(404).send({
        status: 'fail',
        data: err
      })
    })
  })
};

//========================================
// Delete Snippet Route
//========================================

exports.deleteSnippet = (req, res, next) => {

  Snippet.deleteOne({_id: req.params.id})
    .then(data => {
      res.status(200).send({
        message: 'Successfully Removed'
      });
    })
    .catch(err => {
      res.status(404).send(err)
    })
}
