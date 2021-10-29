import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import g, { p } from "../styles/global"
import { secondsToTimeString } from '../js/timerfunctions'

export default function TimelineToday({ stopProject, projects, startProject, navigation }) {
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
        console.log(relevant)

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
                        return (
                            <View style={s.projectCardContainer}>
                                {
                                half.map((project) => {
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
                                            >
                                                <Text>{project.name}</Text>
                                                <TouchableOpacity style={s.stopButton} onPress={() => stopProject()}>
                                                    <Text>Stop</Text>
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        )
                                    } else
                                        return (

                                            <TouchableOpacity
                                                style={s.projectCard}
                                                onPress={() => navigation.navigate("ProjectView", { projectViewPid: project.pid })}
                                            >
                                                <Text>{project.name}</Text>
                                                <TouchableOpacity style={[s.startButton, color.c]} onPress={() => startProject(project.pid)}>
                                                    <Text>{secondsToTimeString(project.total_duration.toString(10))} </Text>
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        )
                                })
                                }
                            </View>
                        )

                    })
                }
            </View>
        </ScrollView>
    )
}

const s = StyleSheet.create({
    projectCardContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    projectCardColumnContainer: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap"
    },
    projectCard: {
        flex: 1,
        backgroundColor: p.bg2,
        height: 200,
        width: 140,
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
    }
})

