require('dotenv').config()
const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors'); // <== Import cors


app.use(cors()); // <== Enable CORS for all routes
app.use(express.json());

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'nodeuser',
//     password: 'yourpassword',
//     database: 'Students',
//     port: 3307  
// });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});




db.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get('/students', (req, res) => {
    db.query('SELECT * FROM student', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
