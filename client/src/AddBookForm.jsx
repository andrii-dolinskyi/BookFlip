import './AddBookForm.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AddBookForm({ onClose }) {
    const [bookData, setBookData] = useState({
        author: '', bookName: '', genre: '', language: '',
        numberOfPages: '', publishedYear: null, text: ''
    });
    const [errors, setErrors] = useState({});
    const [showToast, setShowToast] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'numberOfPages' && value.length > 4) return;
        if (name === 'author' && value.length > 50) return;
        if (name === 'bookName' && value.length > 50) return;
        if (name === 'text' && value.split(' ').length > 200000) return;
        setBookData({ ...bookData, [name]: value });
        setErrors({ ...errors, [name]: null });
    };

    const handleYearChange = (date) => {
        setBookData({ ...bookData, publishedYear: date });
        setErrors({ ...errors, publishedYear: null });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        if (!bookData.author) { newErrors.author = 'Enter name of the author'; isValid = false; }
        if (!bookData.bookName) { newErrors.bookName = 'Enter book name'; isValid = false; }
        if (!bookData.genre) { newErrors.genre = 'Select genre'; isValid = false; }
        if (!bookData.language) { newErrors.language = 'Select language'; isValid = false; }
        if (!bookData.text) { newErrors.text = 'Where is the book, bro?'; isValid = false; }
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            await axios.post('http://localhost:5000/api/books', bookData);
            setShowToast(true);
            setTimeout(() => { setShowToast(false); onClose(); }, 3000);
        } catch (err) {
            setErrors({ submit: err.response?.data?.message || 'Error adding book.' });
        }
    };

    const genres = ["Fiction", "Mystery", "Science Fiction", "Fantasy", "Thriller", "Romance", "Historical Fiction", "Non-Fiction", "Biography", "Self-Help", "Adventure", "Poetry", "Drama", "Horror", "Comedy", "Cookbook", "Travel", "Art", "Philosophy", "Religion", "Education", "Business", "Technology", "Health", "No genre"];
    const languages = ["English", "Spanish", "French", "German", "Italian", "Portuguese", "Dutch", "Swedish", "Norwegian", "Danish", "Finnish", "Polish", "Czech", "Hungarian", "Romanian", "Greek", "Turkish", "Arabic", "Hebrew", "Persian", "Hindi", "Urdu", "Bengali", "Punjabi", "Marathi", "Tamil", "Telugu", "Kannada", "Malayalam", "Gujarati", "Odia", "Assamese", "Nepali", "Sinhala", "Burmese", "Thai", "Vietnamese", "Indonesian", "Malay", "Filipino", "Korean", "Japanese", "Mandarin Chinese", "Cantonese Chinese", "Ukrainian", "Swahili", "Yoruba", "Igbo", "Zulu", "Xhosa"];

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <Form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow" style={{ width: '400px', position: 'relative' }}>
                <Button variant="outline-secondary" size="sm" onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>X</Button>
                {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}
                <Form.Group className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" name="author" placeholder="Author" value={bookData.author} onChange={handleChange} isInvalid={!!errors.author} />
                    <Form.Control.Feedback type="invalid">{errors.author}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control type="text" name="bookName" placeholder="Book Name" value={bookData.bookName} onChange={handleChange} isInvalid={!!errors.bookName} />
                    <Form.Control.Feedback type="invalid">{errors.bookName}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Genre</Form.Label>
                    <Form.Select name="genre" value={bookData.genre} onChange={handleChange} isInvalid={!!errors.genre}>
                        <option value="">Select Genre</option>
                        {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.genre}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Language</Form.Label>
                    <Form.Select name="language" value={bookData.language} onChange={handleChange} isInvalid={!!errors.language}>
                        <option value="">Select Language</option>
                        {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.language}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Number of Pages (optional)</Form.Label>
                    <Form.Control type="number" name="numberOfPages" placeholder="Number of Pages" value={bookData.numberOfPages} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Published Year (optional)</Form.Label>
                    <DatePicker
                        selected={bookData.publishedYear}
                        onChange={handleYearChange}
                        showYearPicker
                        dateFormat="yyyy"
                        className="form-control"
                        placeholderText="Select Year"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Text</Form.Label>
                    <Form.Control as="textarea" name="text" placeholder="Text" value={bookData.text} onChange={handleChange} isInvalid={!!errors.text} />
                    <Form.Control.Feedback type="invalid">{errors.text}</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" className="gradient-button">Add Book</Button>
            </Form>
            <Toast show={showToast} onClose={() => setShowToast(false)} className="position-fixed bottom-0 start-0 m-3 shadow">
                <Toast.Header className="bg-success text-white">
                    <strong className="me-auto">Success</strong>
                </Toast.Header>
                <Toast.Body>Hooray! You added a new book!</Toast.Body>
            </Toast>
        </div>
    );
}

export default AddBookForm;