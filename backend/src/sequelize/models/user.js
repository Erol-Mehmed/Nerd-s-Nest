const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'nerds-nest'
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connected.');
  })
  .catch(err => {
    console.log('Unable to connect to database', err);
  });

  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.CHAR
    },
    image: {
      type: DataTypes.CHAR
    },
    date: {
      type: DataTypes.DATE
    }
  });

  User.sync();
