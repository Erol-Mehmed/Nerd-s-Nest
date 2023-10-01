import {env} from "./env.js"


export const settings = {
    "app" : {
        "port" : 3000
    },
    "database": {
        "port": env.database.port,
        "username": env.database.username,
        "password": env.database.password,
        "databaseName": env.database.databaseName,
        "host": env.database.host,
        "dialect": env.database.dialect
    }
}