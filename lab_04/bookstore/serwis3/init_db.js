const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const initDB = () => {
    const db = new sqlite3.Database('./database.db');
    const schema = fs.readFileSync('./schema.sql', 'utf8');

    db.exec(schema, (err) => {
        if (err) {
            console.error("Error initializing database:", err.message);
        } else {
            console.log("Database initialized successfully.");
        }
        db.close();
    });
};

initDB();