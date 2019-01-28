const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { } = require('../database/index.js');
const path = require('path');
const port = 3005;
var QRCode = require('qrcode')

// QRCode.toDataURL('I am a pony!', function (err, url) {
//   console.log(url, 'is this a thing or nah?')
// })



app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static(__dirname + '/../react-client/dist'));
// app.use('/', express.static('../react-client/dist/'));




app.listen(port, error => {
  if (error) {
    console.log(error, 'Error connecting to server NOT LISTENING!');
  }
  console.log(`Listening on port ${port}!!`);
})