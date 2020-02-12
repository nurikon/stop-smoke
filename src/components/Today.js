import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  UIManager,
  LayoutAnimation
} from 'react-native';
import { strings } from '../../Loocalization';

const { width, height } = Dimensions.get('window');
UIManager.setLayoutAnimationEnabledExperimental(true);


class Today extends Component {
  state = {
    todayVisible: false
  }

  render() {
    const {
      mainContainers,
      titleContainer,
      titleHidden,
      titleText,
      itemContainer,
      boldNumberText,
      titleText2
    } = styles
    const {
      dbTodayTimes,
      earnedSmokeToday,
      earnedMoneyToday,
      spendedMoneyToday,
      dailyNumberOfCigarettes
    } = this.props
    return (
      <View>

        {this.state.todayVisible ?
          <View style={mainContainers}>
            <TouchableOpacity
              style={titleContainer}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                this.setState({ todayVisible: false })
              }}
            >
              <Text style={titleText}>{strings.TDtoday}</Text>
              <Text style={titleText2}>{strings.TDABbyInitialVal}({dailyNumberOfCigarettes})</Text>
            </TouchableOpacity>

            <View style={[itemContainer, { backgroundColor: '#CFCFCF' }]}>
              <Text style={boldNumberText} >{dbTodayTimes.length}  </Text>
              <Text>{strings.TDABsmoking}</Text>
            </View>

            <View style={[itemContainer, { backgroundColor: '#ECECEC' }]}>
              <Text
                style={[boldNumberText, { color: earnedSmokeToday < 0 ? 'red' : 'green' }]} >{Math.abs(earnedSmokeToday)}  </Text>
              <Text>{earnedSmokeToday < 0 ? strings.TDBAmoreSmoked : strings.TDABlessSmoked}</Text>
            </View>

            <View style={[itemContainer, { backgroundColor: '#CFCFCF' }]}>
              <Text style={boldNumberText} >{spendedMoneyToday} ₺  </Text>
              <Text>{strings.TDABspendMoney}</Text>
            </View>


            <View style={[itemContainer, { backgroundColor: '#ECECEC' }]}>
              <Text style={[boldNumberText, { color: earnedMoneyToday < 0 ? 'red' : 'green' }]}>{Math.abs(earnedMoneyToday)} ₺  </Text>
              <Text>{earnedSmokeToday < 0 ? strings.TDABlossMoney : strings.TDABearnMoney} </Text>
            </View>
          </View> :

          <TouchableOpacity
            style={titleHidden}
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              this.setState({ todayVisible: true })
            }}
          >
            <Text style={titleText}>{strings.TDtoday}</Text>
            <Text style={titleText2}>{strings.TDABbyInitialVal}({dailyNumberOfCigarettes})</Text>
          </TouchableOpacity>
        }

      </View>
    );
  }
}

export default Today;

const styles = {
  mainContainers: {
    marginTop: height / 100,
    marginBottom: height / 40,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 5
  },
  titleContainer: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: height / 18,
    paddingLeft: width / 51,
    paddingRight: width / 51,
  },
  titleHidden: {
    height: height / 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: width / 51,
    paddingRight: width / 51,
    marginTop: height / 79.8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CFCFCF',
  },
  titleText: {
    fontSize: width / 21,
    fontWeight: 'bold'
  },
  titleText2: {
    fontSize: width / 30,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height / 20,
    paddingLeft: width / 51,
  },
  boldNumberText: {
    fontSize: width / 28,
    fontWeight: 'bold'
  },
}
