const config = {
  apiKey: 'AIzaSyCQPWtt4L-I4xd1VWpdqqYSwDT18FBK69A',
  baseUrl:
    'https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyCQPWtt4L-I4xd1VWpdqqYSwDT18FBK69A',

  audio: {
    uri: 'gs://speech-demo/shwazil_hoful.flac'
  },
  config: {
    encoding: 'FLAC',
    sampleRateHertz: 16000,
    languageCode: 'en-US'
  },
  request: {
    audio: this.audio,
    config: this.config
  }
};

module.exports = config;
