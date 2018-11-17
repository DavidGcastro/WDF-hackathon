import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {Audio, Permissions, FileSystem} from 'expo';
import RecordButton from './RecordButton';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RecordButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

