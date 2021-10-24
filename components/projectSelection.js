import React from 'react'
import { TouchableOpacity,Dimensions, Button, StyleSheet, Text, View, Touchable } from 'react-native'
import g, { p } from "../styles/global"


export default function projectSelection({ data, navigation, setProjectSelectionOpen, startProject }) {
    // todo: make scrollable
    return (
        <TouchableOpacity style={s.projectSelectionWrapper} onPress={() => setProjectSelectionOpen(false)}>
            <View style={s.projectSelectionWindow}>
                {data.projects.map((project, i) => {
                    return (
                        <TouchableOpacity style={g.projectCard} key={"projectSelection" + i} onPress={() => { startProject(project.pid); setProjectSelectionOpen(false) }} >
                            <Text>{project.name}</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("ProjectView", { projectViewPid: project.pid }) }}>
                                <Text>Edit</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )
                })}

                <TouchableOpacity onPress={() => { navigation.navigate("AddProject") }}><Text>Add Project</Text></TouchableOpacity>

            </View>
        </TouchableOpacity>
    )
}

const s = StyleSheet.create({
    projectSelectionWrapper: {
        zIndex: 2,
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "#00000090",


    },
    projectSelectionWindow: {
        position: "absolute",
        bottom: 0,
        backgroundColor: p.bg2,
        height: 300,
        width: Dimensions.get("window").width,
        borderTopLeftRadius: p.br,
        borderTopRightRadius: p.br,
        alignItems: 'center',
        padding: 30

    }
})
