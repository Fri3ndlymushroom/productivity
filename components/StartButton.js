import React from 'react'
import { StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native'
import { p } from '../styles/global'
import { secondsToFormatedString } from '../js/timerfunctions'

export default function StartButton({data, setProjectSelectionOpen, stopProject}) {


    if(data.all_logs.filter((log)=>log.running === true).length > 0){
        let index = data.all_logs.findIndex((log)=>log.running === true)
        return (
            <TouchableOpacity style={s.goButton} onPress={() =>  stopProject()}>
                <Text style={s.stopText}>Stop</Text>
                <Text style={s.timerText}>{secondsToFormatedString(data.all_logs[index].duration)}</Text>
            </TouchableOpacity>
        )
    }else{
        return (
            <TouchableOpacity style={s.goButton} onPress={() => setProjectSelectionOpen(true)}>
                <Text style={s.goText}>Go</Text>
            </TouchableOpacity>
        )
    }


}

const s = StyleSheet.create({
    goButton:{
        width: "200px",
        padding: "30px",
        borderRadius: p.br,
        backgroundColor: p.bg2
    },
    goText:{
        color: p.text__main,
        fontSize: "30px",
        fontWeight: "bold"
    },
    stopText:{
        color: p.text__main
    },
    timerText:{
        color: p.text__main,
        fontSize: "30px",
        fontWeight: "bold"
    },
})
