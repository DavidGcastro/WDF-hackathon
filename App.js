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
    const {fromLanguage, translationLanguage, isActive} = this.state
    return (
      <View style={styles.container}>
        <Picker style={{ height: 50, width: 300, bottom: 200 }} selectedValue={fromLanguage} onValueChange={(itemValue) =>  this.setState({fromLanguage: itemValue})}>
          <Picker.Item label="Choose Speaker's Langauge" value="" />
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Spanish" value="Spanish" />
        </Picker>
        <Picker style={{ height: 50, width: 300, bottom: 100 }} selectedValue={translationLanguage} onValueChange={(itemValue) =>  this.setState({translationLanguage: itemValue})}>
          <Picker.Item label="Choose Translation Langauge" value="" />
          <Picker.Item label="Spanish" value="Spanish" />
          <Picker.Item label="English" value="English" />
        </Picker>
        <TouchableOpacity style={isActive ? styles.buttonActive : styles.button} onPress={this.handlePress}>
          <FontAwesome name="microphone" size={32} color={isActive ? "black" : "white"}/>
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
  },
  buttonActive: {
    backgroundColor: '#FF0505',
    height: 75,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    top: 80
  }
});
