require("dotenv").config();
const { DB_USERNAME, DB_PASSWORD, DB_HOSTNAME, DB_NAME, DB_DIALECT, PORT, SECRET_KEY } =
   process.env;

module.exports = {
   development: {
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      host: DB_HOSTNAME,
      dialect: DB_DIALECT,
      dialectOptions: {
         useUTC: false, // for reading from database
      },
      timezone: '+07:00',
      secretKey: SECRET_KEY
   }
};
