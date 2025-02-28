import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddBookForm from './AddBookForm';
import './HomePage.css';

function HomePage() {
    const [showForm, setShowForm] = useState(false);
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchBooks();
        fetchGenres();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const fetchGenres = () => {
        const uniqueGenres = [...new Set(books.map(book => book.genre))];
        setGenres(uniqueGenres);
    };

    const handleAddBookClick = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        fetchBooks();
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredBooks = books.filter(book =>
        book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const booksByGenre = (genre) => {
        return filteredBooks.filter(book => book.genre === genre);
    };

    return (
        <div className="home-page">
            <div className="header">
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            <div className="content">
                <nav className="genre-nav">
                    <h2>Genres</h2>
                    <ul>
                        {genres.map(genre => (
                            <li key={genre}>
                                {genre} ({booksByGenre(genre).length})
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="book-list">
                    <button onClick={handleAddBookClick} className="add-book-button">Add Book</button>
                    {filteredBooks.map(book => (
                        <div key={book._id} className="book-item">
                            <h3>{book.bookName}</h3>
                            <p>Author: {book.author}</p>
                            <p>Genre: {book.genre}</p>
                        </div>
                    ))}
                </div>
            </div>
            {showForm && <AddBookForm onClose={handleCloseForm} />}
        </div>
    );
}

export default HomePage;