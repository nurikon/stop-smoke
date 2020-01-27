import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert
} from 'react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import { DbManager } from "../database/index";
import Circleing from './Circleing';


const { width, height } = Dimensions.get('window');

class FirstLaunch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circleing: false,
      startDate: '',
      dailyNumberOfCigarettes: '',
      numberOfCigarettesInPack: '',
      packagePrice: '',
      startDaySmokedNumber: '',
      target: '',
      sleepTime:''
    };
  }
  DbManager = new DbManager();

  componentDidMount() {
    const date = new Date()
    const deviceDate = moment(date).format('DD/MM/YYYY')
    this.setState({ startDate: deviceDate })
  }

  async pushDbStartDayTimes({ startDaySmokedNumber }) {
    const date = new Date()
    const deviceTime=moment(date).format('HH:mm:ss')
    const deviceDate = moment(date).format('DD/MM/YYYY')
    const dbToday = await this.DbManager.getDbToday(deviceDate)
    
    //açılış günü içilen sigara kadar times basar
    for (i = 0; i < startDaySmokedNumber; i++) {
      if(i == startDaySmokedNumber-1){
        this.DbManager.addTableTimes(deviceTime, dbToday.id)
      }else{
        this.DbManager.addTableTimes('00:01:00', dbToday.id)
      } 
    }
  }

  async onPress() {
    const {
      startDaySmokedNumber,
      dailyNumberOfCigarettes,
      numberOfCigarettesInPack,
      packagePrice,
      startDate,
      target,
      sleepTime,
    } = this.state
    if (
      dailyNumberOfCigarettes != '' &&
      numberOfCigarettesInPack != '' &&
      packagePrice != '' &&
      startDaySmokedNumber != '' &&
      target != '' &&
      sleepTime != ''
    ) {

      this.setState({ circleing: true })
      await AsyncStorage.multiSet([
        ['dailyNumberOfCigarettes', dailyNumberOfCigarettes],
        ['numberOfCigarettesInPack', numberOfCigarettesInPack],
        ['packagePrice', packagePrice],
        ['startDate', startDate],
        ['target', target],
        ['sleepTime', sleepTime]
      ])

      await AsyncStorage.setItem('alreadyLaunched', 'true')
      await this.DbManager.createTableTimes()
      await this.DbManager.createTableDays()
      await this.DbManager.addTableDates()
      await this.pushDbStartDayTimes({
        startDaySmokedNumber,
        dailyNumberOfCigarettes
      })
      
      this.setState({ circleing: false })
    
      this.props.press()


    } else {
      Alert.alert(
        '',
        'Boş alanları doldurunuz',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]
      );
    }
  }

  render() {
    const { container, textInputContainer, textInput, sendButton } = styles
    return (
      <View style={{ flex: 1 }}>
        {
          this.state.circleing ?
            <Circleing /> :

            <View style={container}>

              <View style={textInputContainer}>
                <Text>Günlük içilen sigara sayısı</Text>
                <TextInput
                  textAlign={'center'}
                  maxLength={2}
                  style={textInput}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                    this.setState({ dailyNumberOfCigarettes: text })
                  }}
                />
              </View>

              <View style={textInputContainer}>
                <Text>Bir paketteki sigara sayısı</Text>
                <TextInput
                  textAlign={'center'}
                  maxLength={2}
                  style={textInput}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                    this.setState({ numberOfCigarettesInPack: text })
                  }}
                />
              </View>

              <View style={textInputContainer}>
                <Text>Paket başına fiyat</Text>
                <TextInput
                  textAlign={'center'}
                  maxLength={2}
                  style={textInput}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                    this.setState({ packagePrice: text })
                  }}
                />
              </View>

              <View style={textInputContainer}>
                <Text>Bugün tahminen kaç sigara içtin?</Text>
                <TextInput
                  textAlign={'center'}
                  maxLength={2}
                  style={textInput}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                    this.setState({ startDaySmokedNumber: text })
                  }}
                />
              </View>
              <View style={textInputContainer}>
                <Text>İlk hafta için günlük hedefiniz</Text>
                <TextInput
                  textAlign={'center'}
                  maxLength={2}
                  style={textInput}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                    this.setState({ target: text })
                  }}
                />
              </View>
              <View style={textInputContainer}>
                <Text>Günde ortalama kaç saat uyuyorsunuz?</Text>
                <TextInput
                  textAlign={'center'}
                  maxLength={2}
                  style={textInput}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                    this.setState({ sleepTime: text })
                  }}
                />
              </View>

              <TouchableOpacity
                onPress={() => this.onPress()}
                style={sendButton}>
                <Text> gönder </Text>
              </TouchableOpacity>

            </View>
        }
      </View>
    );
  }
}

export default FirstLaunch;

const styles = {
  container: {
    paddingTop:height/19.95,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ECECEC'
  },
  textInputContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width * 0.7,
    height: height * 0.08,
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    width: width * 0.08,
    height: height/19.95,
    borderColor: 'gray',
    borderRadius: 3,
  },
  sendButton: {
    height: height * 0.057,
    width: width * 0.4,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  }
}
