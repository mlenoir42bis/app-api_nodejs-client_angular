const { userCreate, userGetCurrent } = require('../controllers/user.controller');
const router = require('express').Router();

const { ensureAuthenticated } = require('../config/security.config');


router.post('/', userCreate);
router.get('/current', ensureAuthenticated, userGetCurrent)
  
module.exports = router;