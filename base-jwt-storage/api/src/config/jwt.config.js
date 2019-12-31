
const secret = 'a2463421-b798-470a-b4ee-fd23783ec69d';

const jwt = require('jsonwebtoken');
const { findUserPerId } = require('../queries/user.queries');
const { app } = require('../../app');

const createJwtToken = ({ user = null, id = null }) => {
  const jwtToken = jwt.sign({ 
    subject: id || user._id.toString(),
    expiresIn: '20s'
  }, secret);
  return jwtToken;
}

exports.createJwtToken = createJwtToken;

const addJwtFeatures = (req, res, next) => {
  req.isAuthenticated = () => !!req.user;
  req.logout = () => res.clearCookie('jwt')
  req.login = (user) => {
    const token = createJwtToken({ user });
    res.cookie('jwt', token);
    return token;
  }
  next();
}

app.use(addJwtFeatures);