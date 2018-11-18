const express = require('express');
const app = express();
const speech = require('@google-cloud/speech');
const { Translate } = require('@google-cloud/translate');
const config = require('./config');
const bodyParser = require('body-parser');
const client = new speech.SpeechClient();

const translate = new Translate({
  projectId: config.projectid
});
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.post('/', (req, res, next) => {
  let words;
  let alt;
  //Config for google speech
  const request = {
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: req.body.language,
      model: 'default'
    },
    audio: {
      content: req.body.recordingAsString
    }
  };

  client
    .recognize(request)
    .then(data => {
      let results = data[0].results;
      if (results.length === 1) {
        words = results[0].words ? results[0].words[0].transcript : null;
        alt = results[0].alternatives
          ? results[0].alternatives[0].transcript
          : null;
      }
      if (results.length === 2) {
        words = results[0].words[0].transcript;
        alt = results[1].alternatives[0].transcript;
      }
      let final = { words, alt };
      return final;
    })
    .then(text => {
      let textToSend = text.words ? text.words : text.alt;
      //Make Dynamic.
      translate
        .translate(textToSend, 'es')
        .then(results => {
          const translation = results[0];
          console.log(`Text: ${text}`);
          console.log(`Translation: ${translation}`);
          res.send(results);
        })
        .catch(err => {
          console.error('ERROR:', err);
        });
    })
    .catch(err => {
      console.error('ERROR:', err);
      next(err);
    });
});

//Add error handling middleware.
app.listen(3000, function() {
  console.log('Listening on 3000');
});
