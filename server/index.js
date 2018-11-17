const express = require('express');
const app = express();
const speech = require('@google-cloud/speech');
const config = require('./config');
const bodyParser = require('body-parser');
const client = new speech.SpeechClient();
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.post('/', (req, res, next) => {
  const request = {
    config: {
      encoding: 'FLAC',
      sampleRateHertz: 16000,
      languageCode: req.body.language,
      model: 'default'
    },
    audio: { content: req.body.recordingAsString }
  };

  client
    .recognize(request)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.error('ERROR:', err);
      next(err);
    });
});

app.listen(3000, function() {
  console.log('Listening on 3000');
});
