import React, { useState, useEffect } from 'react';
import { View } from "react-native"
import RootNavigator from './routes/draw'
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet } from 'react-native';
import { dummyData, defaultSettings } from './data';
import { v4 as uuidv4 } from 'uuid';
import { copyObject } from './js/functions';
import { p } from './styles/global';
import { checkForBackup } from './js/backupsystem';
import Purchases from "react-native-purchases"

export default function App() {

    const [isPro, setIsPro] = useState(true)


    useEffect(() => {
        Purchases.setDebugLogsEnabled(true);
        Purchases.setup("VkfyHFYebTtUjltygIAtpJfCPxgAQnNr")
    }, [])

    useEffect(() => {
        const getPurchaserInfo = async () => {
            const purchaserInfo = await Purchases.getPurchaserInfo()

            if (typeof purchaserInfo.entitlements.active["pro"] !== "undefined") {
                setIsPro(true)
            }
        }

        getPurchaserInfo()
    }, [])

    const [data, setRefactoredData] = useState({
        timer: {
            running: false,
            start: 0,
            project: "",
            duration: 0
        },
        projects: [],
        all_logs: [],
        daily_logs: [],
        reversed_daily_logs: []
    })

    const [settings, setSavedSettings] = useState(defaultSettings)

    const setSettings = async (newSettings) => {
        await AsyncStorage.setItem('@settings', JSON.stringify(newSettings))
        setSavedSettings(newSettings)
    }

    useEffect(() => {
        const getDB = async () => {
            let dbSettings = null
            dbSettings = JSON.parse(await AsyncStorage.getItem('@settings'))
            if (dbSettings !== null) {
                setSavedSettings(dbSettings)
            }
        }
        getDB()

    }, [])


    const setData = async (newData) => {
        let dataCopy = JSON.parse(JSON.stringify(newData))

        dataCopy.lastbackup = await checkForBackup(dataCopy, dataCopy.lastbackup)


        await AsyncStorage.setItem('@data', JSON.stringify(dataCopy))

        // colors

        dataCopy.all_logs.forEach(function (log) {
            let projectColor = dataCopy.projects.filter((project) => project.pid === log.pid)[0].color
            log.color = projectColor
        })





        // daily logs
        dataCopy.all_logs.sort(function (a, b) {
            return b.start - a.start;
        });

        dataCopy.daily_logs = []

        let neededDays = []
        dataCopy.all_logs.forEach((log) => {
            if (neededDays.filter((day) => day === log.day).length === 0) {
                neededDays.push(log.day)
            }
        })

        neededDays.forEach(function (day) {
            let logs = dataCopy.all_logs.filter((log) => log.day === day)

            let neededProjects = []
            logs.forEach((log) => {
                if (neededProjects.filter((pid) => pid === log.pid).length === 0) {
                    neededProjects.push(log.pid)
                }
            })

            let sortedLogs = []

            neededProjects.forEach((pid) => {
                let projectLogs = logs.filter((log) => log.pid === pid)
                let time = 0
                projectLogs.forEach((log) => { time += log.duration })
                let name = dataCopy.projects.filter((project) => project.pid === pid)[0].name
                sortedLogs.push({
                    name: name,
                    pid: pid,
                    logs: projectLogs,
                    total_duration: time,
                    color: projectLogs[0].color,
                    archived: projectLogs[0].archived,
                })
            })

            dataCopy.daily_logs.push({
                day: day,
                projects: sortedLogs
            })
        })

        dataCopy.reversed_daily_logs = copyObject(dataCopy.daily_logs).reverse()


        // projects
        dataCopy.projects.forEach((project) => {
            project.logs = dataCopy.all_logs.filter((log) => log.pid === project.pid)
        })


        setRefactoredData(dataCopy)


    }


    useEffect(() => {

        const getdbData = async () => {
            try {
                let dbData = null
                dbData = JSON.parse(await AsyncStorage.getItem('@data'))
                if (dbData === null) {
                    dbData = dummyData
                }
                setData(dbData)
            } catch (err) {
                console.error(err)
            }
        }



        getdbData()

    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (data.all_logs.filter((log) => log.running === true).length > 0) {
                let index = data.all_logs.findIndex((log) => log.running === true)
                let copy = { ...data }
                let now = Math.round(new Date().getTime() / 1000)


                copy.all_logs[index].duration = now - copy.all_logs[index].start



                setData(copy)
            }

        }, 100)
        return () => clearInterval(interval)
    }, [data])



    return (

        <View style={s.root}>
            <RootNavigator screenProps={{ ...{ data, setData, settings, setSettings, isPro, setIsPro } }} />
        </View>
    );
}
const s = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: p.bg1
    }
})



// packages:
// react-navigation
// react-native-gesture-handler
// react-native-reanimated
// react-native-screens
// react-navigation-stack
// react-navigation-drawer
// icons: https://oblador.github.io/react-native-vector-icons/
// bundle id: com.thetaproductivity