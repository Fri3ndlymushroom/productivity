import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import g, { p } from "../styles/global"
import Icon from 'react-native-vector-icons/FontAwesome';

export default function WeekComparison({ data, settings }) {




    const getWeekComparison = () => {

        let weekComparison = {
            w1: () => {
                let end = Math.floor((Math.round(new Date().getTime() / 1000) - settings.start_of_day) / 60 / 60 / 24)
                let start = end - 7

                let relevant = data.all_logs.filter((log) => (log.day >= start && log.day <= end))
                let sum = relevant.reduce((sum, log) => sum += log.duration, 0)
                return sum
            },
            w2: () => {
                let end = Math.floor((Math.round(new Date().getTime() / 1000) - settings.start_of_day) / 60 / 60 / 24) - 7
                let start = end - 14

                let relevant = data.all_logs.filter((log) => (log.day >= start && log.day <= end))
                let sum = relevant.reduce((sum, log) => sum += log.duration, 0)
                return sum
            },
            comparison: {
                rising: false,
                risingStyle: undefined,
                percentage: 0,

            }
        }


        weekComparison.comparison.percentage = weekComparison.w2() === 0 ? 100 : 100 / weekComparison.w2() * weekComparison.w1()
        weekComparison.comparison.rising = weekComparison.comparison.percentage > 99 ? true : false


        weekComparison.comparison.risingStyle = StyleSheet.create({
            style: {
                backgroundColor: weekComparison.comparison.rising ? "#48C645" : "#EC2964",
                transform: [{ rotate: weekComparison.comparison.rising ? "0deg" : "180deg"}]
            }
        })



        return weekComparison.comparison
    }









    return (
        <View style={s.container}>

            <View style={[s.indicator, getWeekComparison().risingStyle.style]}><Icon name={'arrow-up'} size={24} color={'white'} /></View>
            <View style={s.textContainer}>
                <Text style={s.percentage}>{getWeekComparison().percentage}%</Text>
                <Text style={s.description}>compared to last week</Text>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    textContainer: {
        width: "50%"
    },
    percentage: {
        fontSize: 20,
        color: p.text__main,
        textAlign: "center"
    },
    description: {
        fontSize: 12,
        textAlign: 'center',
        color: p.text__dim
    },
    indicator: {
        height: 40,
        width: 40,
        borderRadius: p.br,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})
