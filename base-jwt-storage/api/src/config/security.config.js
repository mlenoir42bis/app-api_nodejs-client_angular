exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({
      error: "Access restricted",
      success: false
    });
  }
}
const fs = require('fs');
const secret = 'a2463421-b798-470a-b4ee-fd23783ec69d';
const jwt = require('jsonwebtoken');
const User = require('../database/models/user.model');

exports.isLoggedIn = (req, res, next) => {
 const token = req.headers.authorization;
 if (token) {
   jwt.verify(token, secret, (err, decoded) => {
     if (err) { return res.status(401).json('token invalid'); }
     const sub = decoded.subject || decoded.sub;
     User.findOne({ '_id': sub }).exec( (err, user) => {
       if (err || !user) { res.status(401).json('error') }
       req.user = user;
       next();
     })
   })
 } else {
  res.status(403).json({
    error: "Access restricted",
    success: false
  });
 }
}