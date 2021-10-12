import React from 'react'
import {TouchableOpacity, Button, StyleSheet, Text, View } from 'react-native'
import { p } from "../styles/global"
import data from "../data"

export default function projectSelection({navigation, setProjectSelectionOpen, startProject}) {
    return (
        <TouchableOpacity style={s.projectSelectionWrapper} onPress={()=>setProjectSelectionOpen(false)}>
            <View style={s.projectSelectionWindow}>
                {data.projects.map((project, i) => {
                    return (
                        <View key={"projectSelection"+i} style={s.projectButtonWrapper}>
                            <Button title={project.name} onPress={()=>{startProject(i); setProjectSelectionOpen(false)}} />
                        </View>
                    )
                })}
                <View style={s.projectButtonWrapper}>
                    <Button title={"add Project"} onPress={()=>{navigation.navigate("AddProject")}}/>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const s = StyleSheet.create({
    projectSelectionWrapper: {
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
        height: "300px",
        width: "100%",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        alignItems: 'center',
        padding: "30px"

    }
})
