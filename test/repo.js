/* eslint-env node, mocha */
require('dotenv').config({
  path: 'env.env'
});

const sql = require('mssql');

const config = {
  user: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASS,
  server: process.env.DB_SERVER,
  // host: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  trustedConnection: true,
  encrypt: true,
  port: process.env.DB_PORT,
  dialect: 'mssql',
  dialectOptions: {
    database: process.env.DB_NAME,
    instanceName: 'Instance2',
    trustedConnection: true
  }
};

// console.log(config);
// console.log('\n');

const connect = cb => {
  sql.connect(config, err => {
    if (err) {
      throw err;
    }
    if (cb) {
      cb();
    }
  });
};

function getUserById(userId) {
  if (!userId) {
    return Promise.reject('parametro requerido [userId]');
  }

  const sqlUsuario = 'SELECT TOP 1 * FROM dbo.Usuario';

  return new Promise((resolve, reject) => {
    new sql.Request()
      .query(sqlUsuario)
      .then(result => {
        resolve(result.recordset);
      })
        .catch(err => {
          console.log(err);
          reject(err);
        });
  });
}

exports.getUserById = getUserById;

connect(() => {
  getUserById(10).then(records => {
    console.log(records);
  });
});
