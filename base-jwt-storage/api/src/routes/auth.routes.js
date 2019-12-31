const { signin, signout, refreshToken} = require('../controllers/auth.controller');
const router = require('express').Router();

router.post('/signin', signin);
router.get('/signout', signout);

router.get('/refresh-token', refreshToken);

module.exports = router;