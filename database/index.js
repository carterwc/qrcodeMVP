const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'QRCode'
});

connection.connect((error) => {
  if (error) {
    console.log(error, 'Error Connecting to DB!!!');
  }
  console.log('Connected to DB QRCode!!!!');
});