import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import g, { p } from "../styles/global"
import { formatSeconds, secondsToDuration } from "../js/timerfunctions"
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
                end: data.all_logs.length > 0 ? data.all_logs[data.all_logs.length - 1].day : now
            }
        ]


        period.forEach((element) => {
            data.projects.forEach((project) => {
                let relevant = project.logs.filter((log) => (log.day >= element.start && log.day <= element.end))
                let sum = relevant.reduce((sum, log) => sum + log.duration, 0)

                let style = StyleSheet.create({
                    style: {
                        color: project.color
                    }
                })
                element.list.push({ project: project.name, duration: sum, style: style.style })

            })
        })
        return period
    }



    return (
        <View>
            <ScrollView
                horizontal={true}
                decelerationRate={0.9}
                snapToInterval={150}
                snapToAlignment={"center"}
                showsHorizontalScrollIndicator={false}
                disableIntervalMomentum={true}
            >
                {
                    getPeriodData().map((period, i) => {
                        return (
                            <View key={period.card} style={s.scrollCard}>
                                <Text style={s.cardTitle}>{period.card}</Text>

                                <ScrollView>
                                    {
                                        period.list.map((project, y) => {
                                            return (
                                                <View key={`dot-${i}-${y}`} style={s.cardColumn} key={period.card + project.project + y}>
                                                    <Text style={[s.cardProjectTitle, project.style]}>{chopName(project.project)}</Text>
                                                    <Text style={s.cardProjectDuration}>{secondsToDuration(project.duration, { h: true, m: true, b: ["hrs ", "min "] })}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </ScrollView>
                                <DotList tot={getPeriodData().length} current={i} />
                            </View>)
                    })
                }
            </ScrollView>
        </View>
    )
}





function DotList({ tot, current }) {

    let dotList = []

    for (let i = 0; i < tot; i++) {
        dotList.push(i === current)
    }
    return (
        <View
            style={{
                width: "40%",
                marginHorizontal: "30%",
                marginVertical: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
            }}
        >
            {
                dotList.map((dot, i) => {
                    return (
                        <View
                            key={"dot" + i}
                            style={{
                                height: 5,
                                width: 5,
                                backgroundColor: dot ? p.text__main : p.text__dim,
                                borderRadius: 100
                            }}></View>
                    )
                })
            }
        </View>
    )
}


const chopName = (name) =>{

    return name.substring(0, 10);
}


const s = StyleSheet.create({
    scrollCard: {
        width: 150,
        height: 170,
    },
    cardTitle: {
        alignSelf: "center",
        fontSize: 20,
        color: p.text__main
    },
    cardColumn: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 5
    },
    cardProjectTitle: {
        color: p.text__main,
        fontSize: 15
    },
    cardProjectDuration: {
        color: p.text__dim,
        fontSize: 12,
        marginTop: 5,
    }
})
