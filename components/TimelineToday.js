import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import g, { p } from "../styles/global"
import { secondsToTimeString } from '../js/timerfunctions'
import { VictoryPie } from 'victory-native'
import { secondsToShortTimeString } from '../js/timerfunctions'

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

                            let perc = 100 / goal * achieved >= 100? 100 : Math.round(100 / goal * achieved)

                            infoCard =
                                <View style={s.infoCards} key="InfoCardGoal">
                                    
                                    <VictoryPie
                                        colorScale={[p.hl, p.bg1, ]}

                                        height={100}
                                        innerRadius={(obj)=>{
                                            return obj.datum.ri * obj.datum.factor
                                        }}
                                        radius={(obj)=>{
                                            return  (obj.datum.ri + obj.datum.ro) * obj.datum.factor
                                        }}
                                        cornerRadius={4}
                                        data={[
                                            { y: perc, factor: 4, ri: 9, ro: 2 },
                                            { y: 100 - perc, factor: 4, ri: 9.5, ro: 1},
                                          ]}
                                        style={{
                                            labels:{
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
                                infoCard =
                                    <View style={s.infoCards} key="InfoCardCounter">
                                        <Text>{secondsToTimeString(running[0].total_duration)}</Text>
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
                                        <Text>{project.name}</Text>
                                        <TouchableOpacity style={s.stopButton} onPress={() => stopProject()}>
                                            <Text>Stop</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>)

                            } else
                                return (
                                    <TouchableOpacity
                                        style={s.projectCard}
                                        onPress={() => navigation.navigate("ProjectView", { projectViewPid: project.pid })}
                                        key={"today" + project.pid}
                                    >
                                        <Text>{project.name}</Text>
                                        <TouchableOpacity style={[s.startButton, color.c]} onPress={() => startProject(project.pid)}>
                                            <Text>{secondsToTimeString(project.total_duration.toString(10))} </Text>
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
        height: 200,
        width: 140,
        maxWidth: 140,
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
        height: 200,
        width: 140,
        maxWidth: 140,
        borderRadius: p.br,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
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
    InfoCardGoalTextMain:{
        color: p.text__main
    },
    InfoCardGoalTextSec:{
        color: p.text__dim,
        fontSize: 11,
        textAlign: "center"
    },
    InfoCardGoalTextPerc:{
        color: p.text__main,
        fontSize: 20,
        fontWeight: "bold",
        position: 'absolute',
        top: 65
    }
})

