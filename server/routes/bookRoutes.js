const express = require('express');
const router = express.Router();

// Example instruction: If someone asks for all books, tell them this
router.get('/', (req, res) => {
    res.json({ message: 'Here are all the books!' });
});

module.exports = router;