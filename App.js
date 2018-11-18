import React from 'react';
import { StyleSheet, View, Picker, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Audio, Permissions, FileSystem, Speech } from 'expo';
import axios from 'axios';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromLanguage: '',
      translationLanguage: '',
      isActive: false,
      recording: new Audio.Recording()
    };
  }
  componentDidMount() {
    this.permissionsHelper();
  }
  permissionsHelper = async () => {
    await Permissions.askAsync(Permissions.AUDIO_RECORDING);
  };

  handlePress = async evt => {
    await this.setState({ isActive: !this.state.isActive });
    if (this.state.isActive) {
      this.startRec();
    } else {
      this.stopRec();
    }
  };
  startRec = async () => {
    const { recording } = this.state;
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false
      });
      await recording.prepareToRecordAsync(configure);
      await recording.startAsync();
    } catch (error) {
      console.log(error);
    }
  };
  stopRec = async () => {
    const { recording, fromLanguage } = this.state;
    try {
      await recording.stopAndUnloadAsync();
      const recordingURI = recording.getURI();
      const recordingAsString = await FileSystem.readAsStringAsync(
        recordingURI,
        { encoding: FileSystem.EncodingTypes.Base64 }
      );
      const res = await axios.post('http://192.168.1.228:3000/', {
        language: fromLanguage,
        recordingAsString
      });

      Speech.speak(res.data[0], { language: 'es-US' });
      await this.setState({ recording: new Audio.Recording() });
    } catch (error) {
      console.log(error);
      await this.setState({ recording: new Audio.Recording() });
    }
  };

  render() {
    const { fromLanguage, translationLanguage, isActive } = this.state;
    return (
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center'
          }}>
          <Text style={{ textAlign: 'center', fontSize: 30 }}>Speaker one</Text>
          <Picker
            selectedValue={fromLanguage}
            onValueChange={itemValue =>
              this.setState({ fromLanguage: itemValue })
            }>
            <Picker.Item label="English" value="en-US" />
            <Picker.Item label="Spanish" value="es-US" />
          </Picker>
        </View>
        <View
          style={{
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center'
          }}>
          <Text style={{ textAlign: 'center', fontSize: 30 }}>Speaker Two</Text>
          <Picker
            selectedValue={fromLanguage}
            onValueChange={itemValue =>
              this.setState({ fromLanguage: itemValue })
            }>
            <Picker.Item label="English" value="en-US" />
            <Picker.Item label="Spanish" value="es-US" />
            <Picker.Item label="Russian" value="es-US" />
          </Picker>
        </View>
        <TouchableOpacity
          style={isActive ? styles.buttonActive : styles.button}
          onPress={this.handlePress}>
          <FontAwesome
            name="microphone"
            size={32}
            color={isActive ? 'black' : 'white'}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 30
  },
  button: {
    backgroundColor: '#00D86C',
    height: 75,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  buttonActive: {
    backgroundColor: '#FF0505',
    height: 75,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  }
});

const ios = {
  extension: '.wav',
  outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
  audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
  bitRate: 128000,
  sampleRate: 16000,
  numberOfChannels: 1
};

const android = {
  extension: '.m4a',
  outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
  audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
  sampleRate: 44100,
  numberOfChannels: 2,
  bitRate: 128000
};

const configure = {
  android,
  ios
};
