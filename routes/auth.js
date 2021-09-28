var express = require('express');
var router = express.Router();
const { createUser, auth } = require('../controllers/authControllers');

/* GET users listing. */
router.post('/create', createUser);
router.post('/login', auth);

module.exports = router;
