const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'QRCode'
});


const getQRCodes = function (callback) {
  connection.query('SELECT * from qr', (error, results) => {
    if (error) {
      console.log(error, 'Error getting QR data');
      callback(error, null);
    } else {
      console.log(results, 'Results from getQRCODES Query!');
      callback(null, results);
    }
  })
}

const postQRCodes = function (body, callback) {
  console.log(body, 'are we coming from server??')
  connection.query(`INSERT INTO qr(qrcode, createdDate, expiresDate, createdBy) values(?, ?, ?, ?)`,
    [body.qrcode, body.createdDate, body.expiresDate, body.createdBy],
    (error, results) => {
      if (error) {
        console.log(error, 'Error POSTING QR Code DB!');
        callback(error, null);
      } else {
        console.log(results, 'results from DB POST');
        callback(null, results);
      }
    })
}

const updateQRCode = function (params, callback) {
  connection.query('UPDATE qr set createdBy=(?) where id=(?)', [params.createdBy, params.id], (error, results) => {
    if (error) {
      console.log(error, 'Error with UPDATING DB!');
      callback(error, null);
    } else {
      console.log(results, 'Results from update!');
      callback(null, results);
    }
  })
}

const deleteQRCode = function (params, callback) {
  connection.query('DELETE from qr where id=(?)', [params.id], (error, results) => {
    if (error) {
      console.log(error, 'Error DELETING in DB!');
      callback(error, null);
    } else {
      console.log(results, 'Results from DELETE DB Query!');
      callback(null, error);
    }
  })
}


connection.connect((error) => {
  if (error) {
    console.log(error, 'Error Connecting to DB!!!');
  }
  console.log('Connected to DB QRCode!!!!');
});

module.exports = {
  getQRCodes,
  postQRCodes,
  updateQRCode,
  deleteQRCode
}