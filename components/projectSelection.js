import React from 'react'
import { ScrollView, TouchableOpacity, Dimensions, Platform, Button, StyleSheet, Text, View, Touchable } from 'react-native'
import g, { p } from "../styles/global"


export default function projectSelection({ data, navigation, setProjectSelectionOpen, startProject }) {
    // todo: make scrollable
    return (
        <TouchableOpacity style={s.projectSelectionWrapper} onPress={() => setProjectSelectionOpen(false)}>
            <View style={s.projectSelectionWindow}>
                <ScrollView
                    style={{ width: "100%" }}
                    showsVerticalScrollIndicator={false}
                >
                    {data.projects.map((project, i) => {
                        return (
                            <TouchableOpacity style={[g.projectCard, {marginVertical: 4}]} key={"projectSelection" + i} onPress={() => { startProject(project.pid); setProjectSelectionOpen(false) }} >
                                <Text style={g.text}>{project.name}</Text>
                                <TouchableOpacity onPress={() => { navigation.navigate("ProjectView", { projectViewPid: project.pid }) }}>
                                    <Text style={g.textDim}>Edit</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )
                    })}

                </ScrollView>
                <TouchableOpacity style={s.actionButton} onPress={() => { navigation.navigate("AddProject") }}><Text style={g.text}>Add Project</Text></TouchableOpacity>
                <TouchableOpacity style={s.actionButton} onPress={() => { navigation.navigate("Archive") }}><Text style={g.text}>Archived Projects</Text></TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const s = StyleSheet.create({
    projectSelectionWrapper: {
        zIndex: 10,
        elevation: (Platform.OS === 'android') ? 10 : 0,
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
        backgroundColor: p.bg1,
        height: 300,
        width: Dimensions.get("window").width,
        borderTopLeftRadius: p.br,
        borderTopRightRadius: p.br,
        alignItems: 'center',
        padding: 30,
        paddingTop: 0,
        paddingBottom: 10

    },
    actionButton: {
        padding: 5
    }
})
