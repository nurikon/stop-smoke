import React, { Component } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Circleing from "./src/pages/Circleing";
import MasterApp from "./src/pages/MasterApp";
import FirstScreen from "./src/pages/FirstScreen";
import { DbManager } from './src/index';
//bu bir denemedir
//bu bir denemedir
//bu bir denemedir


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstScreenVisible: null
    };
  }

  DbManager = new DbManager();

  async launchAgain() {
    await this.DbManager.clearAllTimes()
    await AsyncStorage.setItem('firstScreenVisible', '')
    this.setState({ firstScreenVisible: true })
  }

  componentDidMount() {
    AsyncStorage.getItem("firstScreenVisible").then(value => {
      if (value == null) {
        this.setState({ firstScreenVisible: true });
      }
      else {
        this.setState({ firstScreenVisible: false });
      }
    })
  }

  render() {
    const { firstScreenVisible } = this.state
    return (
      <View style={{ flex: 1 }} >
        {
          firstScreenVisible === null ?
            <Circleing />
            :
            firstScreenVisible === true ?
              <FirstScreen
                sendButtonPress={() => {
                  this.setState({ firstScreenVisible: false })
                }}
              />
              :
              <MasterApp
                launchAgainPress={() => this.launchAgain()}
              />
        }
      </View>
    );
  }
}

export default App;
