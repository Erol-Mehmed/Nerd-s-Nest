import { Sequelize } from 'sequelize';
import { settings } from "../settings.js";


export function connectToDatabase(sequalizeObject) {
  /*
  Establish a Database connection.
  sequalizeObject: The sequalizeObject that can establish a connection.
  return: Nothing.
   */
  sequalizeObject.authenticate()
    .then(() => {
      console.log('Database connected.');
    })
    .catch(err => {
      console.log('Unable to connect to database', err);
    });
}

function curryRetrieve() {
  /*
  Use this function to retrieve an instance of the sequalize object.
  Only one instance can exist. If this instance already exists, reuse and
  access it by storing it outside of the wrapper.
  */
  let sequalize = "None"

  function wrapperRetrieve() {
    if (sequalize === "None") {

      sequalize = new Sequelize({
        dialect: settings.database.dialect,
        host: settings.database.host,
        port: settings.database.port,
        username: settings.database.username,
        password: settings.database.password,
        database: settings.database.databaseName
      });

      return sequalize
    }
    return sequalize
  }
  return wrapperRetrieve
}

export const retrieveSequalize = curryRetrieve()
