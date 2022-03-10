const express = require('express');

const router = express.Router();
const { createUser, auth, getAllUsers } = require('../controllers/authController');
const { secureAdmin } = require('../middlewares/auth');

router.post('/create', secureAdmin, createUser);
router.post('/login', auth);
router.get('/all', secureAdmin, getAllUsers);

module.exports = router;
