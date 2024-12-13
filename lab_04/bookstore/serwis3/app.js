require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('./database.db');

// Middleware
app.use(bodyParser.json());

// Rejestracja użytkownika
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Sprawdzenie, czy użytkownik istnieje
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (row) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hashowanie hasła
        const hashedPassword = await bcrypt.hash(password, 10);

        // Dodawanie użytkownika do bazy
        db.run(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashedPassword],
            function (err) {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }
                res.status(201).json({ user_id: this.lastID });
            }
        );
    });
});

// Logowanie użytkownika
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Sprawdzenie danych logowania
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!row || !(await bcrypt.compare(password, row.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Tworzenie tokena JWT
        const token = jwt.sign({ user_id: row.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json({ message: 'Login successful', token });
    });
});

// Uruchomienie serwera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
