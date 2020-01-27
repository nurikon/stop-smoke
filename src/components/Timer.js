import React, { Component } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import { DbManager } from "../database/index";

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: '',
            stopwatchTime: ''
        };
    }
    DbManager = new DbManager();

    async lastSmoked() {
        const dbLastTime = await this.DbManager.getLastTime()
        if (dbLastTime == '') {
            null
        } else {
            const DBLastTime = dbLastTime[0].time
            const dbLastDate = await this.DbManager.getDateWithID(dbLastTime[0].daysid)
            const DBLastDate = dbLastDate[0].date
            return { DBLastTime, DBLastDate }
        }

    }

    async calculateTimer(val) {
        const { DBLastDate, DBLastTime } = val
        const deviceDate = new Date()
        const currrentDate = moment(deviceDate).format('DD/MM/YYYY')
        const currentTime = moment(deviceDate).format('HH:mm:ss')
        const current = currrentDate + ' ' + currentTime
        const dbDateTime = DBLastDate + ' ' + DBLastTime
        const difference = moment(current, "DD/MM/YYYY HH:mm:ss")
            .diff(moment(dbDateTime, "DD/MM/YYYY HH:mm:ss"));
        const duration = moment.duration(difference);
        const totalHours = Math.floor(duration.asHours())
        const day = Math.floor(totalHours / 24)
        const hours = totalHours % 24
        const stopwatchTime = hours + moment.utc(difference).format(":mm:ss");
        this.setState({ day, stopwatchTime })
    }

    async componentDidMount() {
        setInterval(() => {
            this.lastSmoked()
                .then((val) => {
                    if (val == null) {
                        this.setState({ stopwatchTime: '00:00:00' })
                    } else {
                        this.calculateTimer(val)
                    }
                })
        }, 1000)
    }

    render() {
        const { day, stopwatchTime } = this.state
        return (
            <View>
                {day == '' ? null : <Text> {day}  gün</Text>}
                {stopwatchTime == '' ? null : <Text> {stopwatchTime} </Text>}
            </View>
        );
    }
}

export default Timer;

