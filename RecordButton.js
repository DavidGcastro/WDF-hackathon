import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Button } from 'react-native';
import {Audio, Permissions, FileSystem} from 'expo'
import someStr from './fileAsString'


export default class RecordButton extends React.Component {
  constructor() {
    super()
    this.state = {
      recording: new Audio.Recording(),
      message: ''
    }
  }
  componentDidMount() {
    this.permissionsHelper()
  }

  permissionsHelper = async () => {
    await Permissions.askAsync(Permissions.AUDIO_RECORDING);
  }


  startRec = async () => {
    const {recording} = this.state
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: true
      });
      await recording.prepareToRecordAsync(configure)
      await recording.startAsync()
    } catch (error) {
      console.log(error)
    }
  }
  stopRec = async () => {
    const {recording} = this.state
    try {
      await recording.stopAndUnloadAsync()
      const recordingURI = recording.getURI()
      const recordingAsString = await FileSystem.readAsStringAsync(recordingURI, {encoding: FileSystem.EncodingTypes.Base64})
      console.log(recordingAsString) // TODO REMOVE
      const res = await axios.post('http://172.16.25.118:3000/', {language: 'en-US', recordingAsString })
      console.log('WHAT ARE YOU?>>>', res.data) // TODO REMOVE
      this.setState({recording: new Audio.Recording(), message: recordingURI})
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.message ? this.state.message : 'No message yet'}</Text>
        <Button title="Start Recording" onPress={this.startRec} />
        <Button title="Stop Recording" onPress={this.stopRec} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const ios = {
    extension: '.wav',
    outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
    bitRate: 128000,
    sampleRate: 16000,
    numberOfChannels: 1
}

const android = {
    extension: '.m4a',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
}

const configure = {
    android,
    ios
}
