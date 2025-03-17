// Vulnerable JavaScript code that should trigger CodeQL alerts

const express = require('express');
const app = express();
const mysql = require('mysql');

// 🚨 CodeQL: Potential XSS vulnerability (Unsafe use of innerHTML)
app.get('/xss', (req, res) => {
  const userInput = req.query.input; // User-controlled input
  document.getElementById('output').innerHTML = userInput; // Unsafe innerHTML usage
  res.send('XSS endpoint');
});

// 🚨 CodeQL: Potential SQL Injection (Unsafe string interpolation)
app.get('/user', (req, res) => {
  const userId = req.query.id; // User-controlled input
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'testdb',
  });

  const query = `SELECT * FROM users WHERE id = '${userId}'`; // Unsafe SQL query
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});