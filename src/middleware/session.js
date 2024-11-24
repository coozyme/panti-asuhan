
const mysql = require('mysql2');
const config = require('../config/config');
const session = require('express-session');
const user = require('../controller/user');
const MySQLStore = require('express-mysql-session')(session);

const dbConfig = {
   host: config.development.host,
   user: config.development.username,
   password: config.development.password,
   database: config.development.database
};

const sessionStoreOptions = {
   expiration: 86400000, // Session expiry (24 hours)
   createDatabaseTable: false, // Auto-create sessions table
   schema: {
      tableName: 'sessions_admin',
      columnNames: {
         session_id: 'session_id',
         expires: 'expires',
         data: 'data',
      },
   }
};

const pool = mysql.createConnection(dbConfig);
const sessionStore = new MySQLStore(sessionStoreOptions, pool);
module.exports = { sessionStore }
