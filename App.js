import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fromLanguage: '',
      translationLanguage: ''
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Picker style={{ height: 50, width: 300 }} selectedValue={this.state.fromLanguage} onValueChange={(itemValue) =>  this.setState({fromLanguage: itemValue})}>
          <Picker.Item label="Choose Speaker's Langauge" value="" />
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Spanish" value="Spanish" />
        </Picker>
        <Picker style={{ height: 50, width: 300 }} selectedValue={this.state.translationLanguage} onValueChange={(itemValue) =>  this.setState({translationLanguage: itemValue})}>
          <Picker.Item label="Choose Translation Langauge" value="" />
          <Picker.Item label="Spanish" value="Spanish" />
          <Picker.Item label="English" value="English" />
        </Picker>
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
