import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

class Circleing extends Component {
  render() {
    const {container}=styles
    return (
      <View style={container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}

export default Circleing;

styles={
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
}