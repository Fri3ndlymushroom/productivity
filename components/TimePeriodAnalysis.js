import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import g, { p } from "../styles/global"
import {secondsToShortTimeString} from "../js/timerfunctions"

export default function TimePeriodAnalysis({ data, settings }) {






    const getPeriodData = () => {
        let now = Math.floor((Math.round(new Date().getTime() / 1000) - settings.start_of_day) / 60 / 60 / 24)
        let period = [
            {
                card: "Day",
                list: [],
                start: now,
                end: now
            },
            {
                card: "Week",
                list: [],
                start: now - 7,
                end: now
            },
            {
                card: "Month",
                list: [],
                start: now - 30,
                end: now
            },
            {
                card: "Year",
                list: [],
                start: now - 365,
                end: now
            },
            {
                card: "All Time",
                list: [],
                start: now,
                end: data.all_logs[data.all_logs.length - 1].day
            }
        ]


        period.forEach((element) => {
            data.projects.forEach((project) => {
                let relevant = project.logs.filter((log) => (log.day >= element.start && log.day <= element.end))
                let sum = relevant.reduce((sum, log) => sum + log.duration, 0)
                element.list.push({ project: project.name, duration: sum })
            })
        })
        return period
    }











    return (
        <View>
            <ScrollView
                horizontal={true}
                decelerationRate={0}
                snapToInterval={150} //your element width
                snapToAlignment={"center"}
            >
                {
                    getPeriodData().map((period) => {
                        return (
                            <View key={period.card} style={s.scrollCard}>
                                <Text style={s.cardTitle}>{period.card}</Text>
                                <ScrollView>
                                    {
                                        period.list.map((project) => {
                                            return (
                                                <View style={s.cardColumn} key={period.card + project.project}>
                                                    <Text style={s.cardProjectTitle}>{project.project}</Text>
                                                    <Text style={s.cardProjectDuration}>{secondsToShortTimeString(project.duration)}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </ScrollView>
                            </View>)
                    })
                }
            </ScrollView>
        </View>
    )
}

const s = StyleSheet.create({
    scrollCard: {
        width: 150,
        height: 170,
    },
    cardTitle:{
        alignSelf: "center",
        fontSize: 20,
        color: p.text__main
    },
    cardColumn:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 5
    },
    cardProjectTitle:{
        color: p.text__main,
        fontSize: 15
    },
    cardProjectDuration:{
        color: p.text__dim,
        fontSize: 12
    }
})
