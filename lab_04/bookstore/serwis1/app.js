const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Użycie body-parser
app.use(bodyParser.json());

// Połączenie z bazą SQLite za pomocą Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'books.db', // Ścieżka do pliku SQLite
});

// Definicja modelu bazy danych
const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Synchronizacja bazy danych
sequelize.sync();

// GET /api/books - Pobranie wszystkich książek
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.findAll(); // Pobranie wszystkich książek z bazy
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas pobierania książek", error });
  }
});

// POST /api/books - Dodanie nowej książki
app.post('/api/books', async (req, res) => {
  try {
    const { name, author, year } = req.body;
    const newBook = await Book.create({ name, author, year });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas dodawania książki", error });
  }
});

// DELETE /api/books/:id - Usunięcie książki po ID
app.delete('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.destroy();
      res.status(200).json({ message: 'Książka została usunięta' });
    } else {
      res.status(404).json({ message: 'Nie znaleziono książki' });
    }
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas usuwania książki", error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});