import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Today,
  LastWeek,
  TodayScore,
  AfterBeginning,
  OpeningFunc,
  DbManager,
  MyDialog,
  strings
} from '../index';


const { width, height } = Dimensions.get('window');

class MasterApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smokedDialogVisible: false,
      dailyNumberOfCigarettes: null,
      dbTodayId: null,
      dbTodayTimes: [],
      earnedSmokeToday: null,
      earnedMoneyToday: null,
      spendedMoneyToday: null,
      lastWeekDwithT: [],
      totalAfterBeginningTimes: null,
      earnedSmokeBeginning: null,
      spendedPackageBeginning: null,
      spendedMoneyBeginning: null,
      earnedMoneyBeginning: null,
      target: null,
      smokingRangeHour: '',
      smokingRangeMinute: ''
    };
  }
  DbManager = new DbManager();
  OpeningFunc = new OpeningFunc();

  //********************* COMPONENT DİDMOUNT ******************** */
  async componentDidMount() {
    //this.DbManager.deleteTableTimes()
    this.OpeningFunc.openingApp()
      .then((openingAppDatas) => {
        this.setState({
          dailyNumberOfCigarettes: openingAppDatas.dailyNumberOfCigarettes,
          dbTodayId: openingAppDatas.dbTodayId,
          dbTodayTimes: openingAppDatas.dbTodayTimes,
          earnedSmokeToday: openingAppDatas.earnedSmokeToday,
          earnedMoneyToday: openingAppDatas.earnedMoneyToday,
          spendedMoneyToday: openingAppDatas.spendedMoneyToday,
          lastWeekDwithT: openingAppDatas.lastWeekDwithT,
          totalAfterBeginningTimes: openingAppDatas.totalAfterBeginningTimes,
          earnedSmokeBeginning: openingAppDatas.earnedSmokeBeginning,
          spendedPackageBeginning: openingAppDatas.spendedPackageBeginning,
          spendedMoneyBeginning: openingAppDatas.spendedMoneyBeginning,
          earnedMoneyBeginning: openingAppDatas.earnedMoneyBeginning,
          target: openingAppDatas.target,
          smokingRangeHour: openingAppDatas.smokingRangeHour,
          smokingRangeMinute: openingAppDatas.smokingRangeMinute
        })
      })
  }

  //********************* I SMOKED ******************** */
  async iSmoked() {
    this.setState({ smokedDialogVisible: false })
    const { dbTodayId } = this.state
    const time = new Date()
    const deviceTime = moment(time).format('HH:mm:ss')
    await this.DbManager.addTableTimes(deviceTime, dbTodayId).then(() => {
      this.componentDidMount()
    })
  }
  
  //************************** SET TARGET  ************************* */
  async setNewTarget(newTarget) {
    await AsyncStorage.setItem('target', newTarget)
    this.componentDidMount()
  }

  //************************** RENDER  ************************* */
  render() {
    const {
      smokedDialogVisible,
      dailyNumberOfCigarettes,
      lastWeekDwithT,
      dbTodayTimes,
      earnedSmokeToday,
      earnedMoneyToday,
      spendedMoneyToday,
      totalAfterBeginningTimes,
      earnedSmokeBeginning,
      spendedPackageBeginning,
      spendedMoneyBeginning,
      earnedMoneyBeginning,
      target,
      smokingRangeHour,
      smokingRangeMinute
    } = this.state
    const {
      mainContainer,
      IsmokedButton,
      scrollView
    } = styles
    return (
      <View style={mainContainer}>
        <ScrollView style={scrollView} >
          <View >
            <TodayScore
              launchAgainPress={this.props.launchAgainPress}
              smokingRangeHour={smokingRangeHour}
              smokingRangeMinute={smokingRangeMinute}
              dailyNumberOfCigarettes={dailyNumberOfCigarettes}
              dbTodayTimes={dbTodayTimes}
              target={target}
              setNewTarget={(newTarget) => this.setNewTarget(newTarget)}
            />
            <View style={{ width, alignItems: 'center' }}>
              <TouchableOpacity style={IsmokedButton}
                onPress={() => this.setState({ smokedDialogVisible: true })} >
                <Text style={{ fontWeight: 'bold', color: 'white' }}>SMOKED</Text>
              </TouchableOpacity>
            </View>
            <LastWeek
              lastWeekDwithT={lastWeekDwithT}
            />

            <Today
              spendedMoneyToday={spendedMoneyToday}
              dbTodayTimes={dbTodayTimes}
              earnedSmokeToday={earnedSmokeToday}
              earnedMoneyToday={earnedMoneyToday}
              dailyNumberOfCigarettes={dailyNumberOfCigarettes}
            />

            <AfterBeginning
              totalAfterBeginningTimes={totalAfterBeginningTimes}
              earnedSmokeBeginning={earnedSmokeBeginning}
              spendedPackageBeginning={spendedPackageBeginning}
              spendedMoneyBeginning={spendedMoneyBeginning}
              earnedMoneyBeginning={earnedMoneyBeginning}
              dailyNumberOfCigarettes={dailyNumberOfCigarettes}
            />
          </View>

        </ScrollView>

        <MyDialog
          visible={smokedDialogVisible}
          rightButtonText={strings.TSyes}
          leftButtonText={strings.TSno}
          contentText={strings.MAareUsmoked}
          onTouchOutside={() => this.setState({ smokedDialogVisible: false })}
          noButton={() => this.setState({ smokedDialogVisible: false })}
          yesButton={() => this.iSmoked()}
        />
      </View>
    );
  }
}

export default MasterApp;


const styles = {
  mainContainer: {
    flex: 1
  },
  IsmokedButton: {
    backgroundColor: '#ff6000',
    marginTop: height / 79.8,
    width: width / 3.43,
    height: height / 19.95,
    borderRadius: height / 79.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#ECECEC',
    paddingLeft: width / 41.1,
    paddingRight: width / 41.1,
  }
}