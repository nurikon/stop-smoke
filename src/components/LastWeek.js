import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

const Item = ({ item }) => {
  return (
    <View style={styles.weekContainer} >
      <Text style={styles.weekText}> {item.date} </Text>
      <Text style={styles.weekText2}> {item.smoked} </Text>
    </View>
  )
}

class LastWeek extends Component {
  state = {
    lastweekVisible: false
  }

  render() {
    const {
      fListContainer,
      fList,
    } = styles
    const {
      lastWeekDwithT
    } = this.props
    return (
      <View>
            <View style={fListContainer}>
              <FlatList
                contentContainerStyle={fList}
                data={lastWeekDwithT}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.date}
              />
            </View>


      </View>
    );
  }
}

export default LastWeek;

const styles = {
  fListContainer: {
    marginTop: height / 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  weekContainer: {
    borderColor: '#CFCFCF',
    borderRadius: 3,
    borderWidth: 1,
    width:width/6.6,
    height: height/15,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  fList: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  weekText:{
    fontSize: width/42,
    fontWeight: 'bold'
  },
  weekText2:{
    fontSize: width/30,
    fontWeight: 'bold'
  }
}
