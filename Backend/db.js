const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected!');
});
module.exports = db;
