const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            console.log('Decoded Token:', decoded); // Add this line

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                console.log('User not found in database'); // Add this line
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            console.log('User from Token:', req.user); // Add this line
            next();
        } catch (error) {
            console.error('Token Verification Error:', error); // Improved error logging
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        console.log('No Token Found'); // Add this line
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };