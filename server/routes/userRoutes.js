const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
//Add other routes as needed.
module.exports = router;