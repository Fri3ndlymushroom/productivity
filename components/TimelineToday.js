import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native'
import g, { p } from "../styles/global"
import { VictoryPie } from 'victory-native'
import { formatSeconds, formatSecondsWithOffset } from '../js/timerfunctions'
import Svg, { Path } from "react-native-svg"
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import ProjectIcons from './ProjectIcons'
import { Spacer } from './Components'


export default function TimelineToday({ setProjectSelectionOpen, goal, stopProject, projects, startProject, navigation }) {

    const [relevantData, setRelevantData] = useState([])

    let day = Math.floor(Math.round(new Date().getTime() / 1000) / 60 / 60 / 24)

    useEffect(() => {

        let relevant = []
        projects.forEach((project) => {
            let relevantLogs = project.logs.filter((log) => log.day === day)
            let running = project.logs.filter((log) => log.running).length > 0
            let runningToday = relevantLogs.filter((log) => log.running).length > 0

            let total_duration = relevantLogs.reduce((sum, log) => sum + log.duration, 0)

            if(running && !runningToday) total_duration += project.logs.filter((log) => log.running)[0].duration

            let inLastDays = project.logs.filter((log) => day - log.day > -7).reduce((sum, log) => sum + log.duration, 0)

            // daily average
            let days = []
            let sum = 0

            project.logs.forEach((log) => {
                if (days.filter((day) => day === log.day).length === 0)
                    days.push(log.day)
                sum += log.duration
            })
            let average = sum / days.length
            average = average === 0 ? 1 : average
            let fracOfAverage = 100 / average * total_duration

            if (!project.archived)
                relevant.push({
                    name: project.name,
                    pid: project.pid,
                    running: running,
                    total_duration: total_duration,
                    color: project.color,
                    last_seven_days: inLastDays,
                    frac_of_acerage: fracOfAverage,
                    icon: project.icon
                })
        })

        // filter

        let sorted = relevant.sort(function (a, b) {
            return b.last_seven_days - a.last_seven_days;
        });

        let runningIndex = sorted.findIndex((project) => project.running)

        if (runningIndex > -1) {
            let running = sorted[runningIndex]
            sorted.splice(runningIndex, 1);
            sorted.splice(0, 0, running);
        }


        const half = sorted.length / 2;
        let halfed = [sorted.slice(0, Math.ceil(half)), sorted.slice(-Math.floor(half))]

        if (sorted.length === 1) {
            halfed = [[sorted[0]], []]
        }

        setRelevantData(halfed)
    }, [projects])




    return (
        <View style={{marginBottom: 10}}>
            <Text key={"dayLabel"} style={[g.dayTitle, s.dayTitle]}>{formatSeconds(day * 24 * 60 * 60, "EEE, d MMM")}</Text>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                    minWidth: "100%",
                }}
            >
                <View
                    style={s.projectCardColumnContainer}
                >
                    {
                        relevantData.map((half, i) => {


                            let infoCard = null
                            let anotherCard = null

                            let allCards = [...relevantData[0]]
                            allCards.push(...relevantData[1])

                            if (i === 0) {

                                let achieved = allCards.reduce((sum, log) => sum + log.total_duration, 0)


                                let diff = goal - achieved > 0 ? goal - achieved : 0

                                let perc = 100 / goal * achieved >= 100 ? 100 : Math.round(100 / goal * achieved)

                                infoCard =
                                    <View style={[s.infoCards, g.shadow]} key="InfoCardGoal">

                                        <VictoryPie
                                            colorScale={[p.hl, p.bg1,]}

                                            height={100}
                                            innerRadius={(obj) => {
                                                return obj.datum.ri * obj.datum.factor
                                            }}
                                            radius={(obj) => {
                                                return (obj.datum.ri + obj.datum.ro) * obj.datum.factor
                                            }}
                                            cornerRadius={4}
                                            data={[
                                                { y: perc, factor: 4, ri: 9, ro: 2 },
                                                { y: 100 - perc, factor: 4, ri: 9.5, ro: 1 },
                                            ]}
                                            style={{
                                                labels: {
                                                    fill: "#00000000"
                                                }
                                            }}

                                        />
                                        <Text style={s.InfoCardGoalTextMain}>{formatSecondsWithOffset(diff, "HH'h' mm'min'")}</Text>
                                        <Text style={s.InfoCardGoalTextSec}>Remaining to reach your daily goal</Text>
                                        <Text style={s.InfoCardGoalTextPerc}>{perc}%</Text>
                                    </View>
                            } else if (i === 1) {


                                let running = allCards.filter((card) => card.running)
                                if (running.length > 0) {
                                    const indicator = StyleSheet.create({
                                        color: {
                                            backgroundColor: running[0].color
                                        }
                                    })
                                    infoCard =
                                        <View style={[s.infoCardCounter, g.shadow]} key="InfoCardCounter">
                                            <View style={[s.infoCardIndicator, indicator.color]}></View>

                                            <View style={s.infoCardCounterColumn}>
                                                <Text style={s.infoCardCounterTimer}>{formatSecondsWithOffset(running[0].total_duration, "HH")}</Text>
                                                <Text style={s.infoCardCounterUnit}>hrs</Text>
                                            </View>
                                            <View style={s.infoCardCounterColumn}>
                                                <Text style={s.infoCardCounterTimer}>{formatSecondsWithOffset(running[0].total_duration, "mm")}</Text>
                                                <Text style={s.infoCardCounterUnit}>mins</Text>
                                            </View>
                                            <View style={s.infoCardCounterColumn}>
                                                <Text style={s.infoCardCounterTimer}>{formatSecondsWithOffset(running[0].total_duration, "ss")}</Text>
                                                <Text style={s.infoCardCounterUnit}>secs</Text>
                                            </View>
                                        </View>
                                }

                                const color = StyleSheet.create({
                                    c: {
                                        backgroundColor: p.hl
                                    }
                                })

                                anotherCard =
                                    <TouchableOpacity onPress={() => setProjectSelectionOpen(true)} style={[s.projectCard, g.shadow]} key="Start Project">

                                        <View style={[g.logoWrapper, color.c]}>
                                            <ProjectIcons figure={"add"} />
                                        </View>

                                        <TouchableOpacity style={[s.startButton, color.c]} onPress={() => setProjectSelectionOpen(true)}>
                                            <Icon name={'play'} size={12} color={'white'} />
                                            <Text style={s.buttonText}>Start Project</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                            }

                            let projectCards = half.map((project) => {
                                const color = StyleSheet.create({
                                    c: {
                                        backgroundColor: project.color
                                    }
                                })


                                if (project.running) {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate("ProjectView", { projectViewPid: project.pid })}
                                            style={[s.projectCard, color.c, g.shadow]}
                                            key={"today" + project.pid}
                                        >
                                            <View>
                                                <View style={[g.logoWrapper]}>
                                                    <ProjectIcons figure={project.icon} />
                                                </View>
                                                <Text style={s.projectCardTextMain}>{project.name}</Text>
                                            </View>
                                            <TouchableOpacity style={s.stopButton} onPress={() => stopProject()}>
                                                <Text style={s.buttonText}>Stop</Text>
                                            </TouchableOpacity>
                                        </TouchableOpacity>)

                                } else
                                    return (
                                        <TouchableOpacity
                                            style={[s.projectCard, g.shadow]}
                                            onPress={() => navigation.navigate("ProjectView", { projectViewPid: project.pid })}
                                            key={"today" + project.pid}
                                        >
                                            <View>
                                                <View style={[g.logoWrapper, color.c]}>
                                                    <ProjectIcons figure={project.icon} />
                                                </View>
                                                <View>
                                                    <Text style={s.projectCardTextMain}>{project.name}</Text>
                                                    <Text style={s.projectCardTextSec}>{isNaN(Math.round(project.frac_of_acerage)) ? 0 : Math.round(project.frac_of_acerage)}% of daily average</Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity style={[s.startButton, color.c]} onPress={() => startProject(project.pid)}>
                                                <Icon name={'play'} size={12} color={'white'} />
                                                <Text style={s.buttonText}>{formatSecondsWithOffset(project.total_duration, "HH'h' mm'min'")} </Text>
                                            </TouchableOpacity>
                                        </TouchableOpacity>)
                            })


                            return (<View key={"DailyProjectColumnContainer" + i} style={s.projectCardContainer}>{infoCard}{projectCards}{anotherCard}</View>)
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const s = StyleSheet.create({
    // wrappers
    dayTitle: {
        marginLeft: "10%"
    },
    projectCardContainer: {
        display: "flex",
        flexDirection: "row",
    },
    projectCardColumnContainer: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        marginHorizontal: Dimensions.get("window").width > 500 ? 500 * 0.1 : Dimensions.get("window").width*0.1 - 10,
    },
    // project cards
    projectCard: {
        flex: 1,
        backgroundColor: p.bg2,
        height: 185,
        width: 150,
        maxWidth: 150,
        borderRadius: p.br,
        justifyContent: "space-between",
        margin: 10,
        padding: 15
    },
    startButton: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "#ffffff20",
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: p.br,
    },
    stopButton: {
        backgroundColor: p.bg2,
        padding: 10,
        borderRadius: p.br
    },

    buttonText: {
        textAlign: "center",
        color: p.text__main
    },
    projectCardTextMain: {
        fontSize: 16,
        color: p.text__main,
        marginTop: 10
    },
    projectCardTextSec: {
        color: p.text__dim,
        marginTop: 2,
        fontSize: 13
    },
    // info cards
    infoCards: {
        flex: 1,
        backgroundColor: p.bg2,
        height: 185,
        width: 150,
        maxWidth: 150,
        borderRadius: p.br,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 20
    },
    InfoCardGoalTextMain: {
        color: p.text__main
    },
    InfoCardGoalTextSec: {
        color: p.text__dim,
        fontSize: 12,
        textAlign: "center"
    },
    InfoCardGoalTextPerc: {
        color: p.text__main,
        fontSize: 20,
        fontWeight: "bold",
        position: 'absolute',
        top: 55
    },
    infoCardCounter: {
        flex: 1,
        backgroundColor: p.bg2,
        height: 185,
        width: 150,
        maxWidth: 150,
        borderRadius: p.br,
        justifyContent: 'center',
        margin: 10,
        padding: 20,
        paddingTop: 40
    },
    infoCardIndicator: {
        height: 30,
        width: 150,
        position: "absolute",
        top: 0,
        backgroundColor: p.bg1,
        borderTopLeftRadius: p.br,
        borderTopRightRadius: p.br,
    },
    infoCardCounterColumn: {
        flex: 1,
        flexDirection: "row",
    },
    infoCardCounterTimer: {
        color: p.text__main,
        fontSize: 30
    },
    infoCardCounterUnit: {
        color: p.text__dim,
        marginTop: 15,
        marginLeft: 5
    }
})

