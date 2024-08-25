const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
const postsRoute = require('./routes/postRoutes');
const authRoute = require('./routes/auth');
const commentRoute = require('./routes/commentsRoute');
app.use('/auth', authRoute);
app.use('/posts', postsRoute);
app.use('/comments', commentRoute);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
