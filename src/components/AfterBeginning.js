import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, UIManager, LayoutAnimation } from 'react-native';

const { width, height } = Dimensions.get('window');

UIManager.setLayoutAnimationEnabledExperimental(true);

class AfterBeginning extends Component {
  state = { beginningVisible: false}

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
      totalAfterBeginningTimes,
      earnedSmokeBeginning,
      spendedPackageBeginning,
      spendedMoneyBeginning,
      earnedMoneyBeginning,
      dailyNumberOfCigarettes
    } = this.props
    return (
      <View>
        {this.state.beginningVisible ?
          <View style={mainContainers}>
            <TouchableOpacity
              style={titleContainer}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                this.setState({ beginningVisible: false })
            }}
            >
              <Text style={titleText}>Başlangıçtan sonra</Text>
              <Text style={titleText2}>Baş.değ. göre({dailyNumberOfCigarettes})</Text>
            </TouchableOpacity>

            <View style={[itemContainer, { backgroundColor: '#CFCFCF' }]}>
              <Text style={boldNumberText} >{totalAfterBeginningTimes} </Text>
              <Text>sigara içildi</Text>
            </View>

            <View style={[itemContainer, { backgroundColor: '#ECECEC' }]}>
              <Text style={[boldNumberText, { color: earnedSmokeBeginning < 0 ? 'red' : 'green' }]} > {Math.abs(earnedSmokeBeginning)} </Text>
              <Text> {earnedSmokeBeginning < 0 ? 'Daha fazla sigara içtiniz' : 'Daha az sigara içtiniz'} </Text>
            </View>

            <View style={[itemContainer, { backgroundColor: '#CFCFCF', }]}>
              <Text style={boldNumberText} > {spendedPackageBeginning}  </Text>
              <Text>Paket içildi </Text>
            </View>

            <View style={[itemContainer, { backgroundColor: '#ECECEC', }]}>
              <Text style={boldNumberText} > {spendedMoneyBeginning} ₺  </Text>
              <Text>para harcandı </Text>
            </View>

            <View style={[itemContainer, { backgroundColor: '#CFCFCF', }]}>
              <Text style={[boldNumberText, { color: earnedMoneyBeginning < 0 ? 'red' : 'green' }]} > {Math.abs(earnedMoneyBeginning)} ₺  </Text>
              <Text>{earnedMoneyBeginning < 0 ? 'Daha fazla para harcandı' : 'kar edildi'} </Text>
            </View>

          </View> :
          <TouchableOpacity
            style={titleHidden}
            onPress={() =>{ 
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              this.setState({ beginningVisible: true })
          }}
          >
            <Text style={titleText}>Başlangıçtan sonra</Text>
            <Text style={titleText2}>Baş.değ. göre({dailyNumberOfCigarettes})</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

export default AfterBeginning;

const styles = {
  mainContainers: {
    backgroundColor: 'white',
    marginTop: height/100,
    marginBottom: height/40,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 5
  },
  titleContainer: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection:'row',
    alignItems:'center',
    height: height/18,
    paddingLeft: width/51,
    paddingRight: width/51,
  },
  titleHidden: {
    height: height/18,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor: 'white',
    paddingLeft: width/51,
    paddingRight: width/51,
    marginBottom:height/27,
    marginTop: height/100,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CFCFCF',
  },
  titleText: {
    fontSize: width/21,
    fontWeight: 'bold'
  },
  titleText2: {
    fontSize: width/30,
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height/20,
    paddingLeft: width/51,
  },
  boldNumberText: {
    fontSize: width/28,
    fontWeight: 'bold'
  }
}
