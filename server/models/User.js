const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Name: { type: String, required: true, maxlength: 50 },
    Surname: { type: String, required: true, maxlength: 50 },
    Country: { type: String, required: true },
    Nationality: { type: String, required: false },
    Languages: { type: String, required: false },
    DateOfBirth: { type: Date, required: false },
    additionalDetailsProvided: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);