
const userController = require('../controllers/userController');

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-otp', authController.verifyOtp);
router.post('/reset-password', authController.resetPassword);




// GET all users
router.get('/', userController.getAllUsers);

// GET user by ID
router.get('/:id', userController.getUserById);

// POST create new user
router.post('/', userController.createUser);

// PUT update user
router.put('/:id', userController.updateUser);

// DELETE delete user
router.delete('/:id', userController.deleteUser);

module.exports = router;

module.exports = router;
