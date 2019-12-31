const { createUser, findUserPerId } = require('../queries/user.queries');

exports.userCreate = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await createUser(body);
    req.login(user);
    res.send({
      success: true
    });
  } catch(e) {
    res.status(500).send({
      error: e.message,
      success: false
    });
  }
}

exports.userGetCurrent = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await findUserPerId(id);
    res.status(200).json(user);
  } catch(e) {
    res.status(500).json({
      error: e.message,
      success: false
    });
  }
}