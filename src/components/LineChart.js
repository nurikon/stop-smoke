import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }



    render() {
        const { dbTodayTimes } = this.props
        let timeOfDots = []
        if (dbTodayTimes != '') {
            for (var i = 0; i < dbTodayTimes.length; i++) {


                if (i == 0) {
                    const time = dbTodayTimes[i].time
                    const slpitted = time.split(":")
                    const hour = (Number(slpitted[0]) + Number(slpitted[1] / 60)) / 24
                    timeOfDots.push(hour)

                } else {
                    const time = dbTodayTimes[i].time
                    const splitted = time.split(":")
                    const hour = (Number(splitted[0]) + Number(splitted[1] / 60)) / 24

                    const gap = hour - timeOfDots[i - 1]
                    if (gap < 0.013) {
                        timeOfDots.push(timeOfDots[i - 1] + 0.0115)
                    } else {

                        timeOfDots.push(hour)
                    }

                }

            }
        } else {
            null
        }
        const {
            container,
            line,
            clocks,
            clockText,
            linesContainer,
            verticalLine,
            verticalLineS,
            smokedDot
        } = styles
        return (
            <View style={container}>

                <View style={clocks}>
                    <Text style={[{ left: ((width * 0.87) * 0 / 8) - 12 }, clockText]}>00:00</Text>
                    <Text style={[{ left: ((width * 0.87) * 1 / 8) - 12 }, clockText]}>03:00</Text>
                    <Text style={[{ left: ((width * 0.87) * 2 / 8) - 12 }, clockText]}>06:00</Text>
                    <Text style={[{ left: ((width * 0.87) * 3 / 8) - 12 }, clockText]}>09:00</Text>
                    <Text style={[{ left: ((width * 0.87) * 4 / 8) - 12 }, clockText]}>12:00</Text>
                    <Text style={[{ left: ((width * 0.87) * 5 / 8) - 12 }, clockText]}>15:00</Text>
                    <Text style={[{ left: ((width * 0.87) * 6 / 8) - 12 }, clockText]}>18:00</Text>
                    <Text style={[{ left: ((width * 0.87) * 7 / 8) - 12 }, clockText]}>21:00</Text>
                    <Text style={[{ left: ((width * 0.87) * 8 / 8) - 12 }, clockText]}>24:00</Text>
                </View>

                <View style={linesContainer}>
                    <View style={line}>
                    </View>

                    <View style={[{ left: ((width * 0.87) * 0 / 24) }, verticalLine]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 1 / 24) }, verticalLineS]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 2 / 24) }, verticalLineS]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 3 / 24) }, verticalLine]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 4 / 24) }, verticalLineS]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 5 / 24) }, verticalLineS]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 6 / 24) }, verticalLine]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 7 / 24) }, verticalLineS]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 8 / 24) }, verticalLineS]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 9 / 24) }, verticalLine]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 10 / 24) }, verticalLineS]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 11 / 24) }, verticalLineS]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 12 / 24) }, verticalLine]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 13 / 24) }, verticalLineS]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 14 / 24) }, verticalLineS]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 15 / 24) }, verticalLine]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 16 / 24) }, verticalLineS]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 17 / 24) }, verticalLineS]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 18 / 24) }, verticalLine]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 19 / 24) }, verticalLineS]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 20 / 24) }, verticalLineS]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 21 / 24) }, verticalLine]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 22 / 24) }, verticalLineS]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 23 / 24) }, verticalLineS]}>
                    </View>
                    <View style={[{ left: ((width * 0.87) * 24 / 24) }, verticalLine]}>
                    </View>

                    {timeOfDots.map((data, i) => {
                        return (
                            <View key={i} style={[smokedDot, { left: (width * 0.87 * data) - 1, }]} />
                        )
                    })}
                </View>

            </View>
        );
    }
}

export default LineChart;

const styles = {
    container: {
        marginTop: height / 30,
        marginBottom: height / 35,
        alignItems: 'center',
    },
    clocks: {
        width: width * 0.87,
    },
    clockText: {
        color: 'black',
        position: 'absolute',
        fontSize: height / 80,
        transform: [{ rotate: '90deg' }]
    },
    linesContainer: {
        top: height / 40,
        height: height * 0.04,
        width: width * 0.87,
        justifyContent: 'center'
    },
    line: {
        height: 1,
        width: width * 0.87,
        backgroundColor: '#CFCFCF'
    },
    verticalLine: {
        width: 1,
        height: height / 50,
        backgroundColor: '#CFCFCF',
        position: 'absolute'
    },
    verticalLineS: {
        width: 0.8,
        height: height / 90,
        backgroundColor: '#CFCFCF',
        position: 'absolute'
    },
    smokedDot: {
        width: 3,
        height: 6,
        borderRadius: 1.5,
        backgroundColor: '#ff6000',
        position: 'absolute'
    }
}