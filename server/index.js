const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { getQRCodes, postQRCodes, updateQRCode, deleteQRCode } = require('../database/index.js');
const path = require('path');
const port = 3005;
var QRCode = require('qrcode')


// QRCode.toDataURL('I am a pony!', function (err, url) {
//   console.log(url, 'is this a thing or nah?')
// })


app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/api/qrcodes', (req, res) => {
  getQRCodes((error, results) => {
    if (error) {
      console.log(error, 'Error SERVER GET!?!?!');
      res.status(500).send(error);
    } else {
      console.log(results, 'results from server GET!!');
      res.json(results);
      // this sends back the results as JSON
    }
  });
});



app.post('/api/qrcodes', (req, res) => {
  postQRCodes(req.body, (error, results) => {
    if (error) {
      console.log(error, 'Error on server POST! Adding QRCode');
      res.status(500).send(error)
    } else { }
    console.log(results, 'Results from Server POST!?!?');
    res.json(results);
  });
});



app.put('/api/qrcodes', (req, res) => {
  console.log(req.body, 'Checking SERVER PUT?1?!?!?');
  console.log(req.params, 'This shouldnt contain data body does?');

  updateQRCode(req.body, (error, results) => {
    if (error) {
      console.log(error, 'Error with PUT on SERVER!?!');
      res.status(500).send(error);
    } else {
      console.log(results, 'Results from PUT!?!?!?');
      res.json(results);
    }
  });
});



app.delete('/api/qrcodes/:id', (req, res) => {
  console.log(req.body, 'Req BODY is what here?');
  console.log(req.params, 'Params is the actual data tho!');

  deleteQRCode(req.params, (error, results) => {
    if (error) {
      console.log(error, 'Error on Server Delete!');
      res.status(500).send(error);
    } else {
      console.log(results, 'Results from server Delete!?');
      res.json(results);
    }
  })
})



app.listen(port, error => {
  if (error) {
    console.log(error, 'Error connecting to server NOT LISTENING!');
  }
  console.log(`Listening on port ${port}!!`);
})