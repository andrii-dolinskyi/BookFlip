const Book = require('../models/Book');

exports.addBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully!' });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ message: 'Error adding book', error: error.message });
    }
};