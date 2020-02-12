import SQLite from 'react-native-sqlite-storage';
import DaysOfYear from '../database/dates.json';

const days = DaysOfYear


export class DbManager {

    constructor() {
        this.sqlite = SQLite;
        //this.sqlite.DEBUG(true);
        this.sqlite.enablePromise(true);
        this.sqlite.openDatabase({
            name: 'test.db',
            location: 'default'
        }).then((db) => {
            this.dbInstance = db;
        })
    }

    createTableTimes() {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "CREATE TABLE times (" +
                "id INTEGER PRIMARY KEY NOT NULL ," +
                "time TEXT ," +
                "daysid INTEGER );"
            ).then((val) => {
                resolve(true)
            }).catch((err) => {
                console.log(err);
                reject(false)
            })
        });
    }

    async createTableDays() {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "CREATE TABLE days (" +
                "id INTEGER PRIMARY KEY NOT NULL ," +
                "date TEXT UNIQUE);"
            ).then((val) => {
                resolve(true)
            }).catch((err) => {
                reject(false)
            })
        });
    }

    addTableDates() {
        return new Promise((resolve, reject) => {
            for (i = 0; i < days.length; i++) {
                const val = days[i].date
                this.dbInstance.executeSql(
                    "INSERT INTO days(date)" +
                    `VALUES('${val}')`
                )
            }
            resolve(true)
        });
    }

    addTableTimes(time, daysId) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "INSERT INTO times(time, daysid)" +
                `VALUES("${time}", "${daysId}")`
            ).then(() => {
                resolve(true);
            }).catch((err) => {
                console.log('EROR addTableTimes', err)
                reject(false);
            })
        });
    }

    getDbToday(deviceDate) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "SELECT * FROM days WHERE date = '" + deviceDate + "'"
            ).then(([values]) => {
                const val = values.rows.item(0)
                resolve(val);
            }).catch((err) => {
                console.log('day bulunamadı')
                reject(false);
            })
        });
    }

    getTodayTimes(dayId) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "SELECT * FROM times WHERE daysid =" + dayId
            ).then(([values]) => {
                var array = [];
                for (let index = 0; index < values.rows.length; index++) {
                    const element = values.rows.item(index);
                    array.push(element);
                }
                resolve(array);
            }).catch((err) => {
                reject(false);
            })
        });
    }

    getLastWeekDays(dbTodayId) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "SELECT * FROM days WHERE (id BETWEEN '" + (dbTodayId - 6) + "' AND '" + (dbTodayId - 1) + "')"
            ).then(([res]) => {
                var array = [];
                for (let i = 0; i < res.rows.length; i++) {
                    const element = res.rows.item(i)
                    array.push(element);
                }
                resolve(array)
            })
                .catch(val => {
                    reject(val)
                })
        })
    }




    getAfterBeginningTimes({ dbTodayId, dbStartDate }) {

        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "SELECT * FROM times WHERE (daysid BETWEEN '" + (dbStartDate.id) + "' AND '" + (dbTodayId) + "')"
            ).then(([res]) => {
                var array = [];
                for (let i = 0; i < res.rows.length; i++) {
                    const element = res.rows.item(i)
                    array.push(element);
                }
                resolve(array.length)
            })
                .catch(val => {
                    reject(val)
                })
        })
    }

    getLastTime() {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "SELECT * FROM times WHERE   id = (SELECT MAX(id)  FROM times)"
            ).then(([values]) => {
                var array = [];
                for (let index = 0; index < values.rows.length; index++) {
                    const element = values.rows.item(index);
                    array.push(element);
                }
                resolve(array);
            }).catch((err) => {
                reject(err);
            })
        });
    }

    getDateWithID(id) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "SELECT * FROM days WHERE id =" + id
            ).then(([values]) => {
                var array = [];
                for (let index = 0; index < values.rows.length; index++) {
                    const element = values.rows.item(index);
                    array.push(element);
                }
                resolve(array);
            }).catch((err) => {
                reject(false);
            })
        });
    }

    clearAllTimes(){
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "delete from times"
            )
            .then(()=>resolve(true))
            .catch(()=> reject(false))
        })
    }

}