import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import g, { p } from "../styles/global"
import { secondsToShortTimeString, formatSeconds } from "../js/timerfunctions"

export default function BestDayOfWeek({ data }) {

    const getBestDayOfWeek = () => {
        let days = [
            { day: "Mon", duration: 0, distribution: 0 },
            { day: "Tue", duration: 0, distribution: 0 },
            { day: "Wed", duration: 0, distribution: 0 },
            { day: "Thu", duration: 0, distribution: 0 },
            { day: "Fri", duration: 0, distribution: 0 },
            { day: "Sat", duration: 0, distribution: 0 },
            { day: "Sun", duration: 0, distribution: 0 },
        ]
        data.all_logs.forEach((log) => {
            let index = days.findIndex((day) => day.day === formatSeconds(log.start, "EEE"))
            days[index].duration += log.duration
        })

        let tot = days.reduce((sum, day) => sum += day.duration, 0)

        days.forEach((day) => {
            day.distribution = Math.round(100 * day.duration / tot) === 100 ? 99 : Math.round(100 * day.duration / tot)
        })

        let stylesObj = {}

        days.forEach((day) => {
            stylesObj[day.day] = { backgroundColor: day.distribution.toString(10).length === 1 ? "#48C645" + day.distribution.toString(10) + "0" : "#48C645" + day.distribution }
        })

        let styles = StyleSheet.create(stylesObj)

        days.forEach((day) => {
            day.style = styles[day.day]
        })
        
        let best = days.reduce(function(prev, current) {
            return (prev.duration > current.duration) ? prev : current
        }).day

        return [days, best]
    }

    return (
        <View style={s.container}>
            <Text style={g.text}>Best day fo Week</Text>
            <Text style={g.textDim}>Your best day is {getBestDayOfWeek()[1]}</Text>
            <View style={s.daysContainer}>
                {
                    getBestDayOfWeek()[0].map((day) => {
                        return <View key={day.day} style={[s.dayCard, day.style]}><Text style={g.text}>{day.day[0]}</Text></View>
                    })
                }
            </View>
        </View>

    )
}


const s = StyleSheet.create({
    container:{
        display: "flex",
        alignItems: "center",
        paddingVertical:10,
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%"
    },
    daysContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center"
    },
    dayCard: {
        height: 30,
        width: 30,
        borderRadius: p.br,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
})
