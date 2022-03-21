const express = require('express');

const router = express.Router();
const {
  createUser, editUser, auth, getAllUsers, getSingleUser,
} = require('../controllers/authController');
const { secureAdmin } = require('../middlewares/auth');

router.get('/all', secureAdmin, getAllUsers);
router.post('/create', secureAdmin, createUser);
router.get('/:id/', secureAdmin, getSingleUser);
router.put('/:id/edit', secureAdmin, editUser);
router.post('/login', auth);

module.exports = router;
