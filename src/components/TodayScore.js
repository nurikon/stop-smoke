import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';
import { Timer, LineChart, strings, MyDialog } from '../index';

const { width, height } = Dimensions.get('window');

class TodayScore extends Component {
    state = {
        swapTargetVisible: false,
        newTarget: '',
        emptyVal: false,
        restartVisible: false
    }

    setNewTarget() {
        const { newTarget } = this.state
        if (newTarget != '') {
            this.setState({ swapTargetVisible: false })
            this.props.setNewTarget(this.state.newTarget)
        } else {
            this.setState({ emptyVal: true })
        }
    }
    restart() {
        this.setState({ restartVisible: false })
        this.props.launchAgainPress()
    }


    render() {

        const {
            emptyVal,
            swapTargetVisible,
            restartVisible
        } = this.state
        const {
            dbTodayTimes,
            target,
            smokingRangeHour,
            smokingRangeMinute
        } = this.props

        const {
            scoreContainer,
            circleContainer,
            scoreText,
            chartContainer,
            chartStyle,
            orange,
            swapContainer,
            launchAgainButton
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
                    <TouchableOpacity
                        onPress={() => this.setState({ restartVisible: true })}
                        style={launchAgainButton}>
                        <Image
                            source={require('../../restart1.png')}
                        />
                    </TouchableOpacity>

                    <View style={circleContainer}>
                        <Text
                            style={scoreText}>
                            {dbTodayTimes.length}
                        </Text>
                        <Timer />
                    </View>

                    <Text
                        style={{ paddingTop: 10 }}
                    >
                        {strings.TStargetTime1} {smokingRangeHour}:{smokingRangeMinute < 10 ? '0' + smokingRangeMinute : smokingRangeMinute} {strings.TStargetTime2}
                    </Text>

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

                <MyDialog
                    visible={restartVisible}
                    rightButtonText={strings.TSyes}
                    leftButtonText={strings.TSno}
                    contentText={strings.TSrestart}
                    onTouchOutside={() => this.setState({ restartVisible: false })}
                    noButton={() => this.setState({ restartVisible: false })}
                    yesButton={() => this.restart()}
                />

                <MyDialog
                    rightButtonText={strings.TSok}
                    leftButtonText={strings.TScancel}
                    textInput={true}
                    contentText={emptyVal ?
                        strings.TSemptyTarget :
                        strings.TSsetTarget}
                    visible={swapTargetVisible}
                    onChangeText={(val) => { this.setState({ newTarget: val }) }}
                    onTouchOutside={() => this.setState({ swapTargetVisible: false })}
                    noButton={() => this.setState({ swapTargetVisible: false })}
                    yesButton={() => this.setNewTarget()}
                />

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
    scoreText: {
        color: '#ff6000',
        fontSize: height / 20,
        fontWeight: 'bold'
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
    },
    launchAgainButton: {
        position: 'absolute',
        left: width / 40,
        top: height / 80
    }
}
