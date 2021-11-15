import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import g, { p } from "../styles/global"
import {secondsToShortTimeString, formatSeconds} from "../js/timerfunctions"

export default function BestDayOfWeek({ data }) {

    const getBestDayOfWeek = () =>{
        let days = [
            {day: "Mon", duration: 0},
            {day: "Tue", duration: 0},
            {day: "Wed", duration: 0},
            {day: "Thu", duration: 0},
            {day: "Fri", duration: 0},
            {day: "Sat", duration: 0},
            {day: "Sun", duration: 0},
        ]
        data.all_logs.forEach((log)=>{
            let index = days.findIndex((day)=>day.day === formatSeconds(log.start, "EEE"))
            days[index].duration += log.duration
        })

        return days
    }

    return (
        <View>
            {
                getBestDayOfWeek().map((day)=>{
                    return <Text key={day.day}>{day.day} {day.duration}</Text>
                })
            }
        </View>
    )
}

const s = StyleSheet.create({

})
