const express = require('express');
const app = express();
const speech = require('@google-cloud/speech');
const config = require('./config');
const client = new speech.SpeechClient();
const request = {
  config: config.config,
  audio: config.audio
};

app.post('/', (req, res, next) => {
    console.log(req.body, 555555);
    res.send('HIT');
});

app.listen(3000, function() {
  console.log('Listening on 3000');
});



client
  .recognize(request)
  .then(data => {
    const response = data[0];
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: `, transcription);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
