import React from 'react'
import { StyleSheet, Text, Touchable, View, TouchableOpacity } from 'react-native'
import g, { p } from "../styles/global"
import { secondsToFormatedString, secondsToDayString, secondsToTimeString } from '../js/timerfunctions'

export default function TimelineDay({ startProject, dayData, navigation }) {



    return (
        <View style={s.dayContainer} >
            <Text style={g.dayTitle}>{secondsToDayString(dayData.day * 24 * 60 * 60)}</Text>
            {
                dayData.projects.map((project) => {


                    let color = StyleSheet.create({
                        c: {
                            backgroundColor: project.color
                        },
                    })



                    if (!project.archived) {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("ProjectView", { projectViewPid: project.pid })}
                                key={"day" + dayData.day + "project" + project.name}
                                style={g.projectCard}
                            >
                                <View style={s.projectNameWrapper}>
                                    <View style={[s.indicatior, color.c]}></View>
                                    <Text style={g.text}>{project.name}</Text>
                                </View>
                                {/* <TouchableOpacity onPress={() => startProject(project.pid)} style={s.startButton}> */}
                                
                                <Text style={s.durationText} >{secondsToTimeString(project.total_duration)}</Text>
                                {/* </TouchableOpacity> */}
                            </TouchableOpacity>
                        )
                    } else return
                })
            }
        </View>
    )
}

const s = StyleSheet.create({
    dayContainer: {
        marginBottom: 30,
        marginHorizontal: 60
    },
    startButton: {
        backgroundColor: "#ffffff20",
        paddingHorizontal: 5,
        borderRadius: p.br
    },
    indicatior: {
        width: 8,
        height: 8,
        marginRight: 8,
        borderRadius: 100
    },
    projectNameWrapper:{
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
    },
    durationText:{
        color: p.text__dim,
        fontSize: 12
    }
})
