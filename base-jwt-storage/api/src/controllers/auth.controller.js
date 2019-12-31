const secret = 'a2463421-b798-470a-b4ee-fd23783ec69d';

const jwt = require('jsonwebtoken');

const { findUserPerEmail } = require('../queries/user.queries');

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserPerEmail(email);
    if (user) {
      const match = await user.comparePassword(password);
      if (match) {
        const token = req.login(user);

        const ret = {
          success: true,
          token: token
        }
        res.status(200).json( ret );
      } else {
        res.status(500).json({
          error: 'Wrong password',
          success: false
        });
      }
    } else {
      res.status(500).json({
        error: 'User not found',
        success: false
      });
    }
  } catch(e) {
    res.status(500).json({
      error: e.message,
      success: false
    });
  }

}

exports.signout = (req, res, next) => {
  req.logout();
  res.json({
    success: true
  });
}

exports.refreshToken = (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) { return res.status(403).json('wrong token') }
      const newToken = jwt.sign({}, secret, {
        expiresIn: '20s',
        subject: decoded.subject || decoded.sub
      })
      res.cookie('jwt', newToken);
      res.status(200).json(newToken);
    })
  } else {
    res.status(403).json('no token to refresh !');
  }
 };