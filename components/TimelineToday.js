import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
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


        setRelevantData(relevant)
    }, [projects])




    return (
        <ScrollView
            horizontal={true}
        >
            <View>

                {
                    relevantData.map((project) => {
                        if (project.running) {
                            const color = StyleSheet.create({
                                c: {
                                    backgroundColor: project.color
                                }
                            })

                            return (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("ProjectView", { projectViewPid: project.pid })}
                                    style={[s.projectCard, color.c]}
                                >
                                    <Text>{project.name}</Text>
                                    <Button onPress={() => stopProject()} title={"Stop"} />
                                </TouchableOpacity>
                            )
                        } else
                            return (
                                
                                <TouchableOpacity
                                    style={s.projectCard}
                                    onPress={() => navigation.navigate("ProjectView", { projectViewPid: project.pid })}
                                >
                                    <Text>{project.name}</Text>
                                    <Button onPress={() => startProject(project.pid)} title={secondsToTimeString(project.total_duration.toString(10))} />
                                </TouchableOpacity>
                            )
                    })
                }





            </View>
        </ScrollView>
    )
}

const s = StyleSheet.create({
    projectCard: {
        flex: 1,
        backgroundColor: p.bg2,
        height: 200,
        width: 140,
        borderRadius: p.br,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

