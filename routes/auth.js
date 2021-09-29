const express = require('express');

const router = express.Router();
const { createUser, auth } = require('../controllers/authControllers');
const { secureAdmin } = require('../middlewares/auth');

router.post('/create', secureAdmin, createUser);
router.post('/login', auth);

module.exports = router;
