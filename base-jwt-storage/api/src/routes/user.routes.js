const { userCreate, userGetCurrent } = require('../controllers/user.controller');
const router = require('express').Router();

const { ensureAuthenticated, isLoggedIn } = require('../config/security.config');

router.post('/', userCreate);
router.get('/current', isLoggedIn, userGetCurrent)
  
module.exports = router;