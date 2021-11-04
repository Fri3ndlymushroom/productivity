import React, { useState, useEffect } from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from "react-native"
import g, { p } from '../styles/global'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { secondsToFormatedString, secondsToShortTimeString, secondsToDateString } from '../js/timerfunctions';
import { copyObject } from "../js/functions"



export default function EditLog({ navigation, screenProps }) {


    const [log, setLog] = useState(JSON.parse(JSON.stringify(navigation.getParam("edited_log"))))
    const [times, setTimes] = useState({ start: 0, end: 0 })

    const [dateTimeProps, setDateTimeProps] = useState({
        target: "daily_goal",
        value: 3600,
        mode: "time",
        open: false
    })

    let day = Math.floor(log.start / 24 / 60 / 60) * 24 * 60 * 60

    useEffect(() => {
        setTimes({
            start: log.start - day,
            end: log.end - day
        })
    }, [])



    const EditLog = (event, value) => {
        if (value) {
            if (dateTimeProps.target === "date") editDateOfLog(value)
            else if (dateTimeProps.target === "start") editStartOfLog(value)
            else if (dateTimeProps.target === "end") editEndOfLog(value)
        }
        else {
            setDateTimeProps({ target: "daily_goal", value: 3600, mode: "time", open: false })
        }
    }

    const editEndOfLog = (value) => {
        let newEnd = value.getTime() / 1000
        let newAbsEnd = newEnd - day


        let endIsBigger = newAbsEnd > times.start
        let doesntExceed = newAbsEnd - screenProps.settings.start_of_day <= 86400

        setDateTimeProps({ target: "daily_goal", value: 3600, mode: "time", open: false })
        if (endIsBigger && doesntExceed) {

            setTimes({
                start: times.start,
                end: newAbsEnd
            })

            let logCopy = JSON.parse(JSON.stringify(log))

            logCopy.end = newEnd
            logCopy.duration = logCopy.end - logCopy.start
            setLog(logCopy)
        }
    }

    const editStartOfLog = (value) => {
        let newStart = value.getTime() / 1000
        let newAbsStart = newStart - day

        let endIsBigger = times.end > newAbsStart
        let doesntExceed = newAbsStart - screenProps.settings.start_of_day <= 86400

        setDateTimeProps({ target: "daily_goal", value: 3600, mode: "time", open: false })
        if (endIsBigger && doesntExceed) {
            setTimes({
                start: newAbsStart,
                end: times.end
            })

            let logCopy = JSON.parse(JSON.stringify(log))

            logCopy.start = newStart
            logCopy.duration = logCopy.end - logCopy.start
            setLog(logCopy)
        }
    }

    const editDateOfLog = (date) => {


        let start = date.getTime() / 1000
        let move = start - log.start
        let end = log.end + move

        let copy = copyObject(log)
        copy.start = start
        copy.end = end
        copy.day = Math.floor((copy.start - screenProps.settings.start_of_day) / 60 / 60 / 24)
        setDateTimeProps({ target: "daily_goal", value: 3600, mode: "time", open: false })
        setLog(copy)

    }

    const moveStartOfLog = (start) => {

        let endIsBigger = times.end > times.start + start
        let doesntExceed = times.start + start - screenProps.settings.start_of_day <= 86400

        if (endIsBigger && doesntExceed) {
            setTimes({
                start: times.start + start,
                end: times.end
            })

            let logCopy = JSON.parse(JSON.stringify(log))

            logCopy.start += start
            logCopy.duration = logCopy.end - logCopy.start
            setLog(logCopy)
        }
    }

    const moveEndOfLog = (end) => {

        let endIsBigger = times.end + end > times.start
        let doesntExceed = times.end + end - screenProps.settings.start_of_day <= 86400

        if (endIsBigger && doesntExceed) {
            setTimes({
                start: times.start,
                end: times.end + end
            })

            let logCopy = JSON.parse(JSON.stringify(log))

            logCopy.end += end
            logCopy.duration = logCopy.end - logCopy.start
            setLog(logCopy)
        }
    }

    const saveChanges = () => {
        let copy = JSON.parse(JSON.stringify(screenProps.data))
        let index = copy.all_logs.findIndex((logRef) => logRef.lid === log.lid)

        copy.all_logs[index] = log
        screenProps.setData(copy)
        navigation.pop()
    }


    const deleteLog = () => {

        let copy = copyObject(screenProps.data)
        let index = copy.all_logs.findIndex((match) => log.lid === match.lid)
        copy.all_logs.splice(index, 1)

        screenProps.setData(copy)
        navigation.pop()
    }



    return (
        <View style={g.body}>
            <View>
                {dateTimeProps.open && (
                    <RNDateTimePicker
                        testID="dateTimePicker"
                        mode={dateTimeProps.mode}
                        is24Hour={true}
                        display="default"
                        value={new Date(dateTimeProps.value * 1000)}
                        onChange={EditLog}
                        timeZoneOffsetInMinutes={0}
                    />
                )}
            </View>


            <Text style={g.text}>{secondsToFormatedString(log.duration)}</Text>

            <TouchableOpacity style={s.timeCorrectorButton} onPress={() => setDateTimeProps({
                target: "date",
                value: log.start,
                mode: "date",
                open: true
            })}><Text style={g.text}>Date: {secondsToDateString(log.start)}</Text></TouchableOpacity>



            <View style={s.timeCorrector}>
                <TouchableOpacity style={s.timeCorrectorButton} onPress={() => moveStartOfLog(-600)}><Text style={g.text}>-</Text></TouchableOpacity>
                <TouchableOpacity style={s.timeCorrectorButton} onPress={() => setDateTimeProps({
                    target: "start",
                    value: log.start,
                    mode: "time",
                    open: true
                })}>
                    <Text style={g.text}>{secondsToShortTimeString(log.start)}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.timeCorrectorButton} onPress={() => moveStartOfLog(600)}><Text style={g.text}>+</Text></TouchableOpacity>
            </View>


            <View style={s.timeCorrector}>
                <TouchableOpacity style={s.timeCorrectorButton} onPress={() => moveEndOfLog(-600)}><Text style={g.text}>-</Text></TouchableOpacity>
                <TouchableOpacity style={s.timeCorrectorButton} onPress={() => setDateTimeProps({
                    target: "end",
                    value: log.end,
                    mode: "time",
                    open: true
                })}>
                    <Text style={g.text}>{log.end ? secondsToShortTimeString(log.end) : "running"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.timeCorrectorButton} onPress={() => moveEndOfLog(600)}><Text style={g.text}>+</Text></TouchableOpacity>
            </View>


            <TouchableOpacity style={s.button} onPress={() => saveChanges()}>
                <Text style={g.text}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.button} onPress={() => deleteLog()}>
                <Text style={g.text}>Delete Log</Text>
            </TouchableOpacity>

        </View>
    );
}
const s = StyleSheet.create({
    timeCorrector: {
        display: "flex",
        flexDirection: "row",
        width: 200,
        justifyContent: "space-between",
        margin: 10,
    },
    timeCorrectorButton:{
        padding: 10,
        backgroundColor: p.bg2,
        borderRadius: p.br
    },
    button:{
       paddingHorizontal:10,
       paddingVertical: 5,
       backgroundColor: p.bg2,
       borderRadius: p.br,
       margin: 5
    }
});
