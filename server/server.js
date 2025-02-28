const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the BookFlip API!');
});

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});