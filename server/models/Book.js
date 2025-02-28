const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    author: { type: String, required: true, maxlength: 40 },
    bookName: { type: String, required: true, maxlength: 40 },
    genre: { type: String, required: true},
    language: { type: String, required: true},
    numberOfPages: { type: Number, required: false },
    publishedYear: { type: Date, required: false },
    text: { type: String, required: true, maxlength: 200000 * 5 }, // Roughly 5 characters per word
});

module.exports = mongoose.model('Book', bookSchema);