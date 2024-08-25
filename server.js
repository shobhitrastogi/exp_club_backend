// src/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const connectDB = require('./config.js/db');

dotenv.config();

connectDB();

const app = express();

// Use CORS middleware
app.use(cors())

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
