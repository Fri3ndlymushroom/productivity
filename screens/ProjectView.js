import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native'
import g, { p } from "../styles/global"
import { secondsToShortDateTimeString, secondsToTimeString, secondsToDayString, secondsToShortTimeString, formatSeconds } from '../js/timerfunctions';
import { v4 as uuidv4 } from 'uuid';
import { VictoryBar, VictoryLabel, VictoryChart, VictoryAxis } from 'victory-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavbarStack from '../components/NavbarStack'

export default function ProjectView({ navigation, screenProps }) {
    let pid = navigation.getParam("projectViewPid")




    let projectIndex = screenProps.data.projects.findIndex((project) => project.pid === pid)
    let projectData = screenProps.data.projects[projectIndex]
    let projectName = projectData.name
    let lastDay = 0


    const addLog = () => {
        let copy = { ...screenProps.data }
        let start = Math.round(new Date().getTime() / 1000)
        copy.all_logs.push({
            project: projectName,
            pid: pid,
            lid: "L_" + uuidv4(),
            day: Math.ceil((start - screenProps.settings.start_of_day) / 60 / 60 / 24),
            start: start,
            duration: 600,
            end: start + 600,
            running: false,
        })
        screenProps.setData(copy)
    }

    const getBarData = () => {
        let relevant = []



        let boundaries = { end: screenProps.data.daily_logs[0].day, start: screenProps.data.daily_logs[screenProps.data.daily_logs.length - 1].day }
        let x = 0
        for (let i = boundaries.start; i <= boundaries.end; i++) {
            let sum = 0
            let index = screenProps.data.daily_logs.findIndex((day) => day.day === i)

            if (index >= 0) {
                let day = screenProps.data.daily_logs[index]
                let project = day.projects.find((project) => project.pid === pid)
                if (project)
                    project.logs.forEach((log) => {
                        sum += log.duration
                    })
            }
            x++
            relevant.push({ x: formatSeconds((i - 1) * 60 * 60 * 24, "EEE"), y: sum / 60 / 60, l: secondsToShortTimeString(sum) })
        }



        return relevant.slice(Math.max(relevant.length - 7, 1))
    }




    return (

        <View style={g.body}>
            <NavbarStack navigation={navigation} loc={projectName}>
                <TouchableOpacity style={s.optionsButton} onPress={() => { navigation.navigate("EditProject", { edited_project: pid }) }}>
                    <Icon name={'ellipsis-v'} size={12} color={'white'} />
                </TouchableOpacity>
            </NavbarStack>
            <ScrollView>
                <View style={g.navbarTopMargin}></View>

                <View style={s.projectHeaderContainer}>
                    <VictoryChart
                    >
                        <VictoryAxis
                            tickLabelComponent={<VictoryLabel dy={0} dx={0} angle={0} />}
                            style={{
                                axis: {
                                    stroke: p.bg2  //CHANGE COLOR OF X-AXIS
                                },
                                tickLabels: {
                                    fill: p.text__dim //CHANGE COLOR OF X-AXIS LABELS
                                }
                            }}
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={(y) => y}
                            style={{
                                axis: {
                                    stroke: p.bg2  //CHANGE COLOR OF Y-AXIS
                                },
                                tickLabels: {
                                    fill: p.text__dim //CHANGE COLOR OF Y-AXIS LABELS
                                }
                            }}
                        />

                        <VictoryBar
                            style={{
                                data: { fill: projectData.color }
                            }}
                            data={
                                getBarData()
                            }
                            animate={{
                                duration: 2000,
                                onLoad: { duration: 1000 }
                            }}
                            cornerRadius={{
                                topLeft: 2,
                                topRight: 2,
                                bottomLeft: 2,
                                bottomRight: 2,
                            }}
                        />
                    </VictoryChart>



                    <TouchableOpacity style={s.optionsButton} onPress={() => addLog()}>
                        <Text style={s.buttonText}>Add Log</Text>
                    </TouchableOpacity>
                </View>


                <View style={s.logs}>
                    {
                        projectData.logs.map((log) => {

                            let logs = null
                            let card = (

                                <TouchableOpacity onPress={() => { if (log.end) navigation.navigate("EditLog", { edited_log: log }) }} style={g.projectCard}>
                                    <Text style={g.text}>{secondsToShortDateTimeString(log.start)} - {log.end ? secondsToShortDateTimeString(log.end) : "running"}</Text>
                                    <Text style={s.totalTime}>{secondsToTimeString(log.duration)}</Text>
                                </TouchableOpacity>


                            )
                            if (lastDay !== log.day) {
                                logs = (
                                    <View key={"projectViewLog" + log.start}>
                                        <View style={s.dayTopMargin}></View>
                                        <Text style={g.dayTitle}>{secondsToDayString(log.start)}</Text>
                                        {card}
                                    </View>
                                )
                            } else {
                                logs = (
                                    <View key={"projectViewLog" + log.start}>
                                        {card}
                                    </View>
                                )

                            }

                            lastDay = log.day

                            return (
                                logs
                            )


                        })
                    }
                </View>
            </ScrollView>
        </View >

    )
}

const s = StyleSheet.create({
    totalTime: {
        color: p.text__dim,
        fontSize: 12,
    },
    logs: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    projectTitle: {
        color: p.text__main,
        fontSize: 20
    },
    optionsButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: p.br,
        //alignSelf: "center",
    },
    buttonText: {
        color: p.text__main,
    },
    projectHeaderContainer: {
        alignItems: "center"
    },
    projectHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: Dimensions.get("window").width,
        paddingHorizontal: 60,
        alignItems: "center"
    },
    dayTopMargin: {
        height: 20
    }
})

