const express = require('express');
const router = express.Router();

// Example instruction: If someone asks for all users, tell them this
router.get('/', (req, res) => {
    res.json({ message: 'Here are all the users!' });
});

module.exports = router;