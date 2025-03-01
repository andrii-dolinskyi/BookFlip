const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Import protect

router.get('/', userController.getAllUsers);
router.post('/login', userController.loginUser);
router.get('/profile', protect, userController.getUserProfile); // Protect the /profile route
router.put('/profile/complete', protect, userController.updateProfileComplete); // New route

module.exports = router;