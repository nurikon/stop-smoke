import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import Timer from '../components/Timer';
import Dialog from "react-native-dialog";
import LineChart from './LineChart';

const { width, height } = Dimensions.get('window');

class TodayScore extends Component {
    state = {
        swapTargetVisible: false,
        newTarget: '',
    }

    setNewTarget() {
        this.setState({ swapTargetVisible: false })
        this.props.setNewTarget(this.state.newTarget)
    }


    render() {
        
        const { biggerVal, emptyVal, swapTargetVisible } = this.state
        const { dbTodayTimes, target, smokingRangeHour, smokingRangeMinute} = this.props
  
        const {
            scoreContainer,
            circleContainer,
            scoreText,
            chartContainer,
            chartStyle,
            orange,
            swapContainer
        } = styles

        let smokedWidth = 0
        if (target === null || dbTodayTimes === null) {
            null
        } else {
            smokedWidth = (dbTodayTimes.length * width / 1.37) / target
        }


        return (
            <View>

                <View style={scoreContainer}>
                    <View style={circleContainer}>
                        <Text
                            style={scoreText}>
                            {dbTodayTimes.length}
                        </Text>
                        <Timer />
                    </View>
                    <Text style={{paddingTop:10}}>hedefe göre {smokingRangeHour}:{smokingRangeMinute<10 ? '0'+smokingRangeMinute:smokingRangeMinute} saatte bir sigara içebilirsiniz </Text>
                    <TouchableOpacity
                        style={swapContainer}
                        onPress={() => this.setState({ swapTargetVisible: true })}
                    >
                        <Image
                            source={require('../../target.png')}
                        />
                    </TouchableOpacity>

                </View>


                <View style={scoreContainer}>

                    <View style={chartContainer}>
                        <Text>0</Text>
                        <View style={chartStyle}>
                            <View style={[orange,
                                {
                                    width:
                                        smokedWidth > (width / 1.37) - 4 ?
                                            (width / 1.37) - 4 :
                                            smokedWidth
                                }
                            ]}
                            />
                        </View>

                        <Text>{target}</Text>
                    </View>
                    <LineChart dbTodayTimes={dbTodayTimes} />


                </View>
                <Dialog.Container
                    contentStyle={{ borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}
                    visible={swapTargetVisible}>
                    <Dialog.Description style={{ color: biggerVal || emptyVal ? 'red' : 'green' }}>
                        {biggerVal ?
                            'Yeni hedefinizi yükseltemezsiniz' :
                            emptyVal ?
                                'Yeni bir hedef giriniz' :
                                'Yeni bir hedef belirleyin'}
                    </Dialog.Description>

                    <Dialog.Input
                        maxLength={2}
                        wrapperStyle={{
                            paddingLeft: width / 32,
                            width: width / 10,
                            borderColor: '#CFCFCF',
                            borderWidth: 1,

                        }}
                        onChangeText={(text) => {
                            this.setState({ newTarget: text })
                        }}
                        keyboardType={'numeric'}
                    />
                    <Dialog.Button
                        color='green'
                        label="Vazgeç"
                        onPress={() => this.setState({ swapTargetVisible: false })}
                    />
                    <Dialog.Button
                        color='green'
                        label="Tamam"
                        onPress={() => this.setNewTarget()}
                    />
                </Dialog.Container>


            </View>
        );
    }
}

export default TodayScore;

const styles = {
    scoreContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: height / 80,
        marginTop: height / 80,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: height / 40,
        borderColor: '#CFCFCF'
    },
    scoreText: {
        color: '#ff6000',
        fontSize: height / 20,
        fontWeight: 'bold'
    },
    circleContainer: {
        width: width / 4,
        height: width / 4,
        borderRadius: width / 8,
        borderWidth: 2,
        borderColor: '#CFCFCF',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chartContainer: {
        flexDirection: 'row',
        marginTop: height / 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chartStyle: {
        width: width / 1.37,
        height: height / 26.6,
        borderWidth: 2,
        borderColor: '#CFCFCF',
        borderRadius: 4,
        justifyContent: 'flex-end',
    },
    orange: {
        borderRadius: 3,
        height: (height / 26.6) - 4,
        backgroundColor: '#ff6000'
    },
    swapContainer: {
        right: width / 40,
        top: height / 80,
        position: 'absolute',
    }
}
