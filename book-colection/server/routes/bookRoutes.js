const express = require('express');
const router = express.Router();
const Book = require('../models/book'); // Import the Book model

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
});

// GET a specific book by _id (default MongoDB field)
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error });
  }
});

// Add a new book
router.post('/', async (req, res) => {
  const { title, author, genre, publishedYear, description, coverImageUrl } = req.body;

  const newBook = new Book({
    title,
    author,
    genre,
    publishedYear,
    description,
    coverImageUrl
  });

  try {
    const createdBook = await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: createdBook });
  } catch (error) {
    res.status(500).json({ message: 'Error adding book', error });
  }
});

// Update an existing book
router.put('/:id', async (req, res) => {
  const { title, author, genre, publishedYear, description, coverImageUrl } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, publishedYear, description, coverImageUrl },
      { new: true }
    );
    res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
});

// Delete a book
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
});

module.exports = router;
