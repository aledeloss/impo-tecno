const express = require('express');

const router = express.Router();
const {
  createUser, editUser, auth, getAllUsers,
} = require('../controllers/authController');
const { secureAdmin } = require('../middlewares/auth');

router.post('/create', secureAdmin, createUser);
router.put('/:id/edit', secureAdmin, editUser);
router.post('/login', auth);
router.get('/all', secureAdmin, getAllUsers);

module.exports = router;
