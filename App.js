import React, { Component } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Circleing,
  MasterApp,
  FirstLaunch
} from './src/pages/index';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstLaunched: null
    };
  }


  componentDidMount() {
    AsyncStorage.getItem("alreadyLaunched").then(value => {
      if (value == null) {
        this.setState({ firstLaunched: false });
      }
      else {
        this.setState({ firstLaunched: true });
      }
    })
  }

  render() {
    const { firstLaunched } = this.state
    return (
      <View style={{ flex: 1 }} >
        {
          firstLaunched === null ?
            <Circleing />
            :
            firstLaunched === false ?
              <FirstLaunch
                press={() => {
                  this.setState({ firstLaunched: true })
                }}
              />
              :
              <MasterApp />
        }
      </View>
    );
  }
}

export default App;
