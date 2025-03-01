const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            // User is new, create a new user.
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ email, password: hashedPassword });
            user = await newUser.save(); // Assign the saved user to user variable
            res.status(200).json({
                message: 'User created and logged in',
                token: generateToken(user._id),
                user: {
                    id: user._id,
                    email: user.email,
                    profileComplete: user.additionalDetailsProvided,
                },
            });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            res.status(200).json({
                message: 'Login successful',
                token: generateToken(user._id),
                user: {
                    id: user._id,
                    email: user.email,
                    profileComplete: user.additionalDetailsProvided, // Send the additionalDetailsProvided flag
                },
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        // req.user is populated by the protect middleware
        const user = await User.findById(req.user.id).select('-password');

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
};

exports.updateProfileComplete = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { additionalDetailsProvided: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};