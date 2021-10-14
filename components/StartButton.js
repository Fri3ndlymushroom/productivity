import React from 'react'
import { StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native'
import { p } from '../styles/global'

export default function StartButton({data, setProjectSelectionOpen, stopProject}) {


    if(data.running.running){
        return (
            <TouchableOpacity style={s.goButton} onPress={() =>  stopProject()}>
                <Text>Stop</Text>
                <Text>{data.running.duration}</Text>
            </TouchableOpacity>
        )
    }else{
        return (
            <TouchableOpacity style={s.goButton} onPress={() => setProjectSelectionOpen(true)}>
                <Text>Go</Text>
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
    }
})
