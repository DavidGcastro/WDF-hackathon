import React from 'react';
import { StyleSheet, Text, View, Picker, Button, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

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
        <Picker style={{ height: 50, width: 300, bottom: 200 }} selectedValue={this.state.fromLanguage} onValueChange={(itemValue) =>  this.setState({fromLanguage: itemValue})}>
          <Picker.Item label="Choose Speaker's Langauge" value="" />
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Spanish" value="Spanish" />
        </Picker>
        <Picker style={{ height: 50, width: 300, bottom: 100 }} selectedValue={this.state.translationLanguage} onValueChange={(itemValue) =>  this.setState({translationLanguage: itemValue})}>
          <Picker.Item label="Choose Translation Langauge" value="" />
          <Picker.Item label="Spanish" value="Spanish" />
          <Picker.Item label="English" value="English" />
        </Picker>
        <Button
          title="Translate"
          color="#841584"
          accessibilityLabel="Record speech to translate"
        />
        <TouchableOpacity><FontAwesome name="microphone" size={32} /></TouchableOpacity>
        
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
