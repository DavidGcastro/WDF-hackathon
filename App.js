import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fromLanguage: ''
    }
  }

  handleChange = (itemValue) => {
    this.setState({fromLanguage: itemValue})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Picker style={{ height: 50, width: 300 }}>
          <Picker.Item label="Choose Speaker's Langauge" value="" />
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Spanish" value="Spanish" />
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
