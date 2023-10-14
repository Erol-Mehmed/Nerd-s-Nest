'use strict';

import config from '../config/config.json' assert { type: 'json' };
import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import Sequelize, { DataTypes } from 'sequelize';
import { env as _env } from 'process';
import { URL } from 'url';

const __filename = new URL('', import.meta.url).pathname;
const __dirname = new URL('.', import.meta.url).pathname;
const basename = _basename(__filename);
const env = _env.NODE_ENV || 'development';
const developmentConfig = config[env];
const db = {};

let sequelize;
if (developmentConfig.use_env_variable) {
  sequelize = new Sequelize(_env[developmentConfig.use_env_variable], developmentConfig);
} else {
  sequelize = new Sequelize(developmentConfig.database, developmentConfig.username, developmentConfig.password, developmentConfig);
}

readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
