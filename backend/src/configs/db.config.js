const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
});

connection.connect((err) => {
  if (err) {
    console.log('Database connection failed!', err);
  } else {
    console.log('Connected to Database.');
  }
});
