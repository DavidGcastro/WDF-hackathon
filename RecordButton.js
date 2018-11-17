import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {Audio, Permissions, FileSystem} from 'expo'


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
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
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
