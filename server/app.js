const express = require('express'); // Bring in the express library
const mongoose = require('mongoose'); // Bring in the mongoose library
const cors = require('cors'); // Bring in the cors library
const dotenv = require('dotenv'); // Bring in the dotenv library

dotenv.config(); // Tell it to use our .env file

const app = express(); // Make our robot (the app)
const PORT = process.env.PORT || 5000; // Choose a door (port) for people to talk to the robot

// Let everyone talk to the robot
app.use(cors());

// Let the robot understand messages (JSON)
app.use(express.json());

// Connect the robot to its memory (database)
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Robot memory connected!'))
.catch(err => console.error('Robot memory broken!', err));

app.get('/', (req, res) => {
    res.send('Welcome to the BookFlip API!');
});

// Give the robot its instructions (routes)
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/books', bookRoutes); // Instructions for books
app.use('/api/users', userRoutes); // Instructions for users

// Turn the robot on!
app.listen(PORT, () => {
    console.log(`Robot is awake and listening on door ${PORT}!`);
});