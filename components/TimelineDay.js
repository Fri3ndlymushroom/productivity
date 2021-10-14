import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import g, {p} from "../styles/global"

export default function TimelineDay({ dayData }) {

    return (
        <View style={s.dayContainer} key={"dayContainer"+dayData.day}>
            <Text style={s.dayTitle}>day {dayData.day}</Text>
            {
                dayData.projects.map((project) => {

                    return(
                        <View key={"day"+dayData.day+"project"+project.name} style={s.projectContainer}>
                            <Text style={g.text}>{project.name}</Text>
                            <Text style={g.text}>{project.total_duration}</Text>
                        </View>

                    )
                })
            }
        </View>
    )
}

const s = StyleSheet.create({
    dayContainer:{
        marginBottom: "30px",
        marginHorizontal: "60px"
    },
    projectContainer:{
        backgroundColor: p.bg2,
        width: "300px",
        margin: "5px",
        padding: "10px",
        display: "flex",
        flexDirection: "row",
        borderRadius: p.br,
        justifyContent: "space-between"
    },
    dayTitle:{
        marginLeft: "5px",
        color: p.text__main
    }
})
