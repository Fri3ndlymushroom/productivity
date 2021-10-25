import React, { useState, useEffect } from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from "react-native"
import g from '../styles/global'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { secondsToFormatedString, secondsToShortTimeString, secondsToDateString } from '../js/timerfunctions';
import { copyObject } from "../js/functions"


export default function EditLog({ navigation, screenProps }) {


    const [log, setLog] = useState(JSON.parse(JSON.stringify(navigation.getParam("edited_log"))))
    const [times, setTimes] = useState({ start: 0, end: 0 })
    const [mode, setMode] = useState("date")
    const [changing, setChanging] = useState("start")
    let day = Math.floor(log.start / 24 / 60 / 60) * 24 * 60 * 60

    useEffect(() => {
        setTimes({
            start: log.start - day,
            end: log.end - day
        })
    }, [])



    const [showDateTime, setShowDateTime] = useState(false)

    const EditLog = (event, value) => {
        if (value) {
            if (changing === "date") editDateOfLog(value)
            else if (changing === "start") editStartOfLog(value)
            else if (changing === "end") editEndOfLog(value)
        }
        else {
            setShowDateTime(false)
        }
    }

    const editEndOfLog = (value) => {
        let newEnd = value.getTime() / 1000
        let newAbsEnd = newEnd - day

        
        let endIsBigger = newAbsEnd > times.start
        let doesntExceed = newAbsEnd - screenProps.settings.start_of_day <= 86400
        
        if (endIsBigger && doesntExceed) {

            setTimes({
                start: times.start,
                end: newAbsEnd
            })

            let logCopy = JSON.parse(JSON.stringify(log))

            logCopy.end = newEnd
            logCopy.duration = logCopy.end - logCopy.start
            setShowDateTime(false)
            setLog(logCopy)
        }
    }

    const editStartOfLog = (value) => {
        let newStart = value.getTime() / 1000
        let newAbsStart = newStart - day

        let endIsBigger = times.end > newAbsStart
        let doesntExceed = newAbsStart - screenProps.settings.start_of_day <= 86400

        if (endIsBigger && doesntExceed) {
            setTimes({
                start: newAbsStart,
                end: times.end
            })

            let logCopy = JSON.parse(JSON.stringify(log))

            logCopy.start = newStart
            logCopy.duration = logCopy.end - logCopy.start
            setShowDateTime(false)
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
        copy.day = Math.floor(copy.start / 60 / 60 / 24)
        setShowDateTime(false)
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
    }





    return (
        <View style={g.body}>
            <View>
                {showDateTime && (
                    <RNDateTimePicker
                        testID="dateTimePicker"
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        value={new Date(log.start * 1000)}
                        onChange={EditLog}
                        timeZoneOffsetInMinutes={120}
                    />
                )}
            </View>

            <TouchableOpacity onPress={() => { setShowDateTime(true); setMode("date"); setChanging("date") }}><Text>Date: {secondsToDateString(log.start)}</Text></TouchableOpacity>
            <Text>{secondsToFormatedString(log.duration)}</Text>
            <View style={s.timeCorrector}>
                <TouchableOpacity onPress={() => moveStartOfLog(-600)}><Text>-</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setShowDateTime(true); setMode("time"); setChanging("start") }}><Text>From: {secondsToShortTimeString(log.start)}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => moveStartOfLog(600)}><Text>+</Text></TouchableOpacity>
            </View>
            <View style={s.timeCorrector}>
                <TouchableOpacity onPress={() => moveEndOfLog(-600)}><Text>-</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setShowDateTime(true); setMode("time"); setChanging("end") }}><Text>To: {secondsToShortTimeString(log.end)}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => moveEndOfLog(600)}><Text>+</Text></TouchableOpacity>
            </View>
            <Button title="save changes" onPress={() => saveChanges()} />
        </View>
    );
}
const s = StyleSheet.create({
    timeCorrector: {
        display: "flex",
        flexDirection: "row"
    }
});
