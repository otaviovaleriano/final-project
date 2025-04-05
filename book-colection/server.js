const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookRoutes = require('./server/routes/bookRoutes'); // Import routes

const app = express();
app.use(cors());
app.use(bodyParser.json());

// establish a connection to the mongo database
async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/wdd430', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to database!');
   } catch (err) {
    console.error('❌ Connection failed:', err);
    process.exit(1);
  }
}

connectDB();

// Use the routes
app.use('/books', bookRoutes);

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
