import React, { useState } from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from "react-native"
import g from '../styles/global'
import DateTimePicker from '@react-native-community/datetimepicker';
import { secondsToFormatedString, secondsToShortTimeString, secondsToDateString } from '../js/timerfunctions';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import {copyObject} from "../js/functions"


export default function EditLog({ navigation, screenProps }) {


    const [log, setLog] = useState(JSON.parse(JSON.stringify(navigation.getParam("edited_log"))))


    const [showDateTime, setShowDateTime] = useState(false)

    const editDateOfLog = (event, date) => {

        if (date){
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

    }


    const editStartOfLog = (start) => {

        let logCopy = JSON.parse(JSON.stringify(log))
 
        logCopy.start += start
        logCopy.duration = logCopy.end - logCopy.start

        if(logCopy.duration > 0){
            setLog(logCopy)
        }
    }

    const editEndOfLog = (end) => {

        let logCopy = JSON.parse(JSON.stringify(log))
 
        logCopy.end += end
        logCopy.duration = logCopy.end - logCopy.start

        if(logCopy.duration > 0){
            setLog(logCopy)
        }
    }

    const saveChanges = () =>{
        let copy = JSON.parse(JSON.stringify(screenProps.data))
        let index = copy.all_logs.findIndex((logRef)=>logRef.lid === log.lid )

        copy.all_logs[index] = log
        screenProps.setData(copy)
    }





    return (
        <View style={g.body}>
            <View>
                {showDateTime && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        mode={"date"}
                        is24Hour={true}
                        display="default"
                        value={new Date(log.start*1000)}
                        onChange={editDateOfLog}
                    />
                )}
            </View>

            <TouchableOpacity onPress={() => setShowDateTime(true)}><Text>Date: {secondsToDateString(log.start)}</Text></TouchableOpacity>
            <Text>{secondsToFormatedString(log.duration)}</Text>
            <View style={s.timeCorrector}>
                <TouchableOpacity onPress={() => editStartOfLog(-600)}><Text>-</Text></TouchableOpacity>
                <TouchableOpacity><Text>From: {secondsToShortTimeString(log.start)}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => editStartOfLog(600)}><Text>+</Text></TouchableOpacity>
            </View>
            <View style={s.timeCorrector}>
                <TouchableOpacity onPress={() => editEndOfLog(-600)}><Text>-</Text></TouchableOpacity>
                <TouchableOpacity><Text>To: {secondsToShortTimeString(log.end)}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => editEndOfLog(600)}><Text>+</Text></TouchableOpacity>
            </View>
            <Button title="save changes" onPress={()=>saveChanges()}/>
        </View>
    );
}
const s = StyleSheet.create({
    timeCorrector: {
        display: "flex",
        flexDirection: "row"
    }
});
