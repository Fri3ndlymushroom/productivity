import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Button, Text, View } from "react-native"
import gs from '../styles/global'
import { DefaultText } from '../components/components'
import ProjectSelection from "../components/projectSelection"

export default function Home({ navigation, screenProps }) {
    let data = screenProps.data

    const [newProjectName, setNewProjectName] = React.useState("");

    const addProject = () => {
        data.projects.push(        {
            name: newProjectName,
            trackings: [
            ]
        }) 
        navigation.navigate("Timeline", {closeProjectSelection: true})
    }

    return (
        <View style={gs.container}>
            <TextInput
                style={s.input}
                onChangeText={setNewProjectName}
                value={newProjectName} />
            <Button title={"Add Project"} onPress={() => addProject()} />
        </View>
    );
}

const s = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});