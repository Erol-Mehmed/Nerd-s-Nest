const express = require('express');
const connection = require('./src/configs/db.config');

connection.connect((err) => {
  if (err) {
    console.log('Database connection failed!', err);
  } else {
    console.log('Connected to Database.');
  }
});

const app = express();

app.listen(3000, () => {
  console.log('Server started at port 3000');
});
