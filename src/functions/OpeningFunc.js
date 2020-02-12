import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import { DbManager } from '../database/index';


export default class OpeningFunc {

    DbManager = new DbManager();

    getDeviceTime() {
        const date = new Date()
        const hours = new Date().getHours()
        const minutes = new Date().getMinutes()
        const deviceDate = moment(date).format('DD/MM/YYYY')
        return {
            deviceDate,
            hours,
            minutes,
        };
    }

    async lastWeekDwithT({ dbTodayId, dbLastWeekDates }) {

        let dbLastWeekTimes = []
        for (var i = dbTodayId - 6; i < dbTodayId; i++) {
            await this.DbManager.getTodayTimes(i).then(val => {
                const item = val
                if (item.length === 0) {
                    dbLastWeekTimes.push('-')
                } else { dbLastWeekTimes.push(item) }
            }).catch(err => console.log(err))
        }

        let lastWeekDwithT = []
        for (x = 0; x < 6; x++) {
            if (dbLastWeekTimes[x] != '-') {
                const item = {
                    date: dbLastWeekDates[x].date,
                    smoked: dbLastWeekTimes[x].length
                }
                lastWeekDwithT.push(item)
            } else {
                const item = {
                    date: dbLastWeekDates[x].date,
                    smoked: '-'
                }
                lastWeekDwithT.push(item)
            }
        }


        return lastWeekDwithT;
    }


    async openingApp() {
        const numberOfCigarettesInPack = await AsyncStorage.getItem('numberOfCigarettesInPack')
        const startDate = await AsyncStorage.getItem('startDate')
        const packagePrice = await AsyncStorage.getItem('packagePrice')
        const target = await AsyncStorage.getItem('target')
        const dailyNumberOfCigarettes = await AsyncStorage.getItem('dailyNumberOfCigarettes')
        const sleepTime = await AsyncStorage.getItem('sleepTime')
        const deviceTime = await this.getDeviceTime()
        const { deviceDate, hours, minutes } = deviceTime
        const dbToday = await this.DbManager.getDbToday(deviceDate)
        const dbTodayId = await dbToday.id
        const dbTodayTimes = await this.DbManager.getTodayTimes(dbTodayId)
        const dbLastWeekDates = await this.DbManager.getLastWeekDays(dbTodayId)

        //**************************** TODAY ******************************* */
        const shouldHaveBeenToday = (((hours + (minutes / 60)) * Number(dailyNumberOfCigarettes)) / 24)
        const earnedSmokeToday = (shouldHaveBeenToday - dbTodayTimes.length).toFixed(2)
        const spendedMoneyToday = (dbTodayTimes.length * (packagePrice / numberOfCigarettesInPack)).toFixed(2)
        const earnedMoneyToday = (earnedSmokeToday * (packagePrice / numberOfCigarettesInPack)).toFixed(2)
        const smokingRangeDecimal = (24 - sleepTime) / target
        const smokingRangeHour = Math.floor(smokingRangeDecimal)
        const smokingRangeMinute = Math.floor((smokingRangeDecimal - Math.floor(smokingRangeDecimal)) * 60)


        //**************************** LAST WEEK ******************************* */
        let lastWeekDwithT
        await this.lastWeekDwithT({ dbTodayId, dbLastWeekDates }).then((val) => lastWeekDwithT = val)
        //**************************** AFTER BEGİNNİNG ******************************* */
        const dbStartDate = await this.DbManager.getDbToday(startDate)
        const totalAfterBeginningTimes = await this.DbManager.getAfterBeginningTimes({ dbTodayId, dbStartDate })
        const todayTimeRate = (hours + (minutes / 60)) / 24
        const shouldHaveBeenBeginning = ((dbTodayId - dbStartDate.id) + todayTimeRate) * dailyNumberOfCigarettes //içmiş olmalıydı
        const earnedMoneyBeginning = ((shouldHaveBeenBeginning - totalAfterBeginningTimes) * (packagePrice / numberOfCigarettesInPack)).toFixed(2)
        const earnedSmokeBeginning = (shouldHaveBeenBeginning - totalAfterBeginningTimes).toFixed(2)
        const spendedPackageBeginning = totalAfterBeginningTimes / numberOfCigarettesInPack
        const spendedMoneyBeginning = (totalAfterBeginningTimes * (packagePrice / numberOfCigarettesInPack)).toFixed(2)
        const openingAppDatas = {
            dailyNumberOfCigarettes,
            dbTodayId,
            dbTodayTimes,
            earnedSmokeToday,
            earnedMoneyToday,
            spendedMoneyToday,
            lastWeekDwithT,
            totalAfterBeginningTimes,
            earnedSmokeBeginning,
            spendedPackageBeginning,
            spendedMoneyBeginning,
            earnedMoneyBeginning,
            target,
            smokingRangeHour,
            smokingRangeMinute
        }
        return openingAppDatas;
    }

}
