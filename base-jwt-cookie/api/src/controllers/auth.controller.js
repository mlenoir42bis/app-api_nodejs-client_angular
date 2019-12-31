const { findUserPerEmail } = require('../queries/user.queries');

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserPerEmail(email);
    if (user) {
      const match = await user.comparePassword(password);
      if (match) {
        const token = req.login(user);
        res.status(200).json(user);
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
  console.log("signout controller");
  req.logout();
  res.status(200).json({
    success: true
  });
}