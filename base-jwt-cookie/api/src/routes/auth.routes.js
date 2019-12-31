const { signin, signout} = require('../controllers/auth.controller');
const router = require('express').Router();

router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;