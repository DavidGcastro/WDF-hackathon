import React from 'react';
import { StyleSheet, View, Picker, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fromLanguage: '',
      translationLanguage: '',
      isActive: false
    }
  }

  handlePress = async (evt) => {
    await this.setState({isActive: !this.state.isActive})
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
        <TouchableOpacity style={styles.button}>
          <FontAwesome name="microphone" size={32} color="white"/>
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
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#00D86C',
    height: 75,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    top: 80
  }
});
