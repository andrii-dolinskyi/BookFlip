const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // Add this line

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Robot memory connected!'))
    .catch(err => console.error('Robot memory broken!', err));

app.get('/', (req, res) => {
    res.send('Welcome to the BookFlip API!');
});

const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Robot is awake and listening on door ${PORT}!`);
    console.log(`JWT_SECRET: ${process.env.JWT_SECRET}`); // Verify JWT_SECRET
});