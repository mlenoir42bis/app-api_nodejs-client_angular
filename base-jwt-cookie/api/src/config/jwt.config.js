
const secret = 'a2463421-b798-470a-b4ee-fd23783ec69d';

const jwt = require('jsonwebtoken');
const { findUserPerId } = require('../queries/user.queries');
const { app } = require('../../app');

const createJwtToken = ({ user = null, id = null }) => {
  const jwtToken = jwt.sign({ 
    sub: id || user._id.toString(),
    exp: Math.floor(Date.now() / 1000) + 5 
  }, secret);
  return jwtToken;
}

exports.createJwtToken = createJwtToken;

const checkExpirationToken = (token, res) => {
  const tokenExp = token.exp;
  const nowInSec = Math.floor(Date.now() / 1000);
  if (nowInSec <= tokenExp) {
    return token
  } else if (nowInSec > tokenExp && ((nowInSec - tokenExp) < 60 * 60 * 24) ) {
    const refreshedToken = createJwtToken({ id: token.sub });
    res.cookie('jwt', refreshedToken, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
    return jwt.verify(refreshedToken, secret)
  } else {
    throw new Error('token expired');
  }
}

const extractUserFromToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      let decodedToken = jwt.verify(token, secret, { ignoreExpiration: true });
      decodedToken = checkExpirationToken(decodedToken, res);
      const user = await findUserPerId(decodedToken.sub);
      if (user) {
        req.user = user;
        next();
      } else {
        res.clearCookie('jwt');
        throw new Error('token doesn\'t match with user');
      }
    } catch(e) {
      res.clearCookie('jwt');
      throw new Error(e.message);
    }
  } else {
    next();
  }
}

const addJwtFeatures = (req, res, next) => {
  req.isAuthenticated = () => !!req.user;
  req.logout = () => {
    res.clearCookie('jwt');
    console.log("logout clear cookie");
  }
  req.login = (user) => {
    const token = createJwtToken({ user });
    res.cookie('jwt', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
    return token;
  }
  next();
}

app.use(extractUserFromToken);
app.use(addJwtFeatures);