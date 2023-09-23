const express = require('express');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'dbuser',
  password: '123456',
  database: 'my_db'  
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', (err, rows, field) => {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

const app = express();

app.listen(3000, () => {
  console.log('Server started at port 3000');
});
