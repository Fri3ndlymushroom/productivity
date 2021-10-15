import React from 'react'
import { StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native'
import { p } from '../styles/global'

export default function StartButton({timer, setProjectSelectionOpen, stopProject}) {


    if(timer.running){
        return (
            <TouchableOpacity style={s.goButton} onPress={() =>  stopProject()}>
                <Text style={s.stopText}>Stop</Text>
                <Text style={s.timerText}>{timer.duration}</Text>
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
