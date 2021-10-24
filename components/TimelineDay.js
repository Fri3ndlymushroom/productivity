import React from 'react'
import { StyleSheet, Text, Touchable, View, TouchableOpacity } from 'react-native'
import g, { p } from "../styles/global"
import { secondsToFormatedString, secondsToDateString } from '../js/timerfunctions'

export default function TimelineDay({ dayData, navigation }) {




    return (
        <View style={s.dayContainer} >
            <Text style={g.dayTitle}>{secondsToDateString(dayData.day * 24 * 60 * 60)}</Text>
            {
                dayData.projects.map((project) => {


                    let colorStyle = StyleSheet.create({
                        color: {
                            backgroundColor: project.color
                        },
                    })

                    return (
                        <TouchableOpacity onPress={() => navigation.navigate("ProjectView", { projectViewPid: project.pid })} key={"day" + dayData.day + "project" + project.name} style={[g.projectCard, colorStyle.color]}>
                            <Text style={g.text}>{project.name}</Text>
                            <Text style={g.text}>{secondsToFormatedString(project.total_duration)}</Text>
                        </TouchableOpacity>

                    )
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
})
