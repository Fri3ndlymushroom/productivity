import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import g, { p } from "../styles/global"
import { formatSeconds, secondsToTimeString } from '../js/timerfunctions'
import { VictoryPie } from 'victory-native'
import { secondsToShortTimeString } from '../js/timerfunctions'
import Svg, { Path } from "react-native-svg"

export default function TimelineToday({ goal, stopProject, projects, startProject, navigation }) {
    const [relevantData, setRelevantData] = useState([])

    let day = Math.floor(Math.round(new Date().getTime() / 1000) / 60 / 60 / 24)

    useEffect(() => {
        let relevant = []


        projects.forEach((project) => {
            let relevantLogs = project.logs.filter((log) => log.day === day)
            let total_duration = relevantLogs.reduce((sum, log) => sum + log.duration, 0)
            let running = relevantLogs.filter((log) => log.running).length > 0


            relevant.push({
                name: project.name,
                pid: project.pid,
                running: running,
                total_duration: total_duration,
                color: project.color
            })
        })

        const half = relevant.length / 2;



        let halfed = [relevant.slice(0, Math.ceil(half)), relevant.slice(-Math.floor(half))]

        setRelevantData(halfed)
    }, [projects])




    return (
        <ScrollView
            horizontal={true}
        >
            <View
                style={s.projectCardColumnContainer}
            >
                {
                    relevantData.map((half, i) => {


                        let infoCard = null

                        let allCards = [...relevantData[0]]
                        allCards.push(...relevantData[1])

                        if (i === 0) {

                            let achieved = allCards.reduce((sum, log) => sum + log.total_duration, 0)


                            let diff = goal - achieved > 0 ? goal - achieved : 0

                            let perc = 100 / goal * achieved >= 100 ? 100 : Math.round(100 / goal * achieved)

                            infoCard =
                                <View style={s.infoCards} key="InfoCardGoal">

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
                                    <Text style={s.InfoCardGoalTextMain}>{secondsToShortTimeString(diff)}</Text>
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
                                    <View style={s.infoCardCounter} key="InfoCardCounter">
                                        <View style={[s.infoCardIndicator, indicator.color]}></View>

                                        <View style={s.infoCardCounterColumn}>
                                            <Text style={s.infoCardCounterTimer}>{formatSeconds(running[0].total_duration, "HH")}</Text>
                                            <Text style={s.infoCardCounterUnit}>hrs</Text>
                                        </View>
                                        <View style={s.infoCardCounterColumn}>
                                            <Text style={s.infoCardCounterTimer}>{formatSeconds(running[0].total_duration, "mm")}</Text>
                                            <Text style={s.infoCardCounterUnit}>mins</Text>
                                        </View>
                                        <View style={s.infoCardCounterColumn}>
                                            <Text style={s.infoCardCounterTimer}>{formatSeconds(running[0].total_duration, "ss")}</Text>
                                            <Text style={s.infoCardCounterUnit}>secs</Text>
                                        </View>


                                    </View>
                            }
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
                                        style={[s.projectCard, color.c]}
                                        key={"today" + project.pid}
                                    >
                                        <View>
                                            <View style={[s.logo]}>
                                                <Svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={23}
                                                    height={23}
                                                    fill="none"
                                                >
                                                    <Path
                                                        stroke="#fff"
                                                        d="M11.63 21.981L1.04 17.48a.1.1 0 01-.061-.092V5.529a.1.1 0 01.139-.092l10.474 4.452a.1.1 0 00.078 0l10.613-4.512M11.63 21.981v-9.056m0 9.056l10.591-4.502a.1.1 0 00.06-.092V5.377m0 0L11.669.865a.1.1 0 00-.075 0L4.021 3.867"
                                                    />
                                                </Svg>
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
                                        style={s.projectCard}
                                        onPress={() => navigation.navigate("ProjectView", { projectViewPid: project.pid })}
                                        key={"today" + project.pid}
                                    >
                                        <View>
                                            <View style={[s.logo, color.c]}>
                                                <Svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={23}
                                                    height={23}
                                                    fill="none"
                                                >
                                                    <Path
                                                        stroke="#fff"
                                                        d="M11.63 21.981L1.04 17.48a.1.1 0 01-.061-.092V5.529a.1.1 0 01.139-.092l10.474 4.452a.1.1 0 00.078 0l10.613-4.512M11.63 21.981v-9.056m0 9.056l10.591-4.502a.1.1 0 00.06-.092V5.377m0 0L11.669.865a.1.1 0 00-.075 0L4.021 3.867"
                                                    />
                                                </Svg>
                                            </View>
                                            <Text style={s.projectCardTextMain}>{project.name}</Text>
                                        </View>
                                        <TouchableOpacity style={[s.startButton, color.c]} onPress={() => startProject(project.pid)}>
                                            <Text style={s.buttonText}>{secondsToTimeString(project.total_duration.toString(10))} </Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>)
                        })

                        return (<View style={s.projectCardContainer}>{infoCard}{projectCards}</View>)

                    })
                }
            </View>
        </ScrollView>
    )
}

const s = StyleSheet.create({
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
    projectCardContainer: {
        display: "flex",
        flexDirection: "row",
    },
    projectCardColumnContainer: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        marginLeft: 50
    },
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
        backgroundColor: "#ffffff20",
        padding: 10,
        borderRadius: p.br,
    },
    stopButton: {
        backgroundColor: "#ffffff20",
        padding: 10,
        borderRadius: p.br
    },
    InfoCardGoalTextMain: {
        color: p.text__main
    },
    InfoCardGoalTextSec: {
        color: p.text__dim,
        fontSize: 11,
        textAlign: "center"
    },
    InfoCardGoalTextPerc: {
        color: p.text__main,
        fontSize: 20,
        fontWeight: "bold",
        position: 'absolute',
        top: 55
    },
    logo: {
        height: 38,
        width: 38,
        borderRadius: p.br,
        backgroundColor: p.bg2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: "center",
        color: p.text__main
    },
    projectCardTextMain: {
        color: p.text__main,
        marginTop: 10
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

