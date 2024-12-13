const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ścieżka do bazy danych
const dbPath = path.resolve(__dirname, 'database.db');

// Inicjalizacja bazy danych
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Nie udało się połączyć z bazą danych:', err.message);
    } else {
        console.log('Połączono z bazą danych SQLite.');
    }
});

// Inicjalizacja schematu
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            author TEXT NOT NULL,
            year INTEGER NOT NULL
        );
    `);
});

module.exports = db;