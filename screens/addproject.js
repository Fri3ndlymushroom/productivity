import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Text, View } from "react-native"
import g, { p } from '../styles/global'
import { DefaultText } from '../components/Components'
import ProjectSelection from "../components/ProjectSelection"
import ColorPalette from 'react-native-color-palette'
import Icon from 'react-native-vector-icons/FontAwesome';
import { v4 as uuidv4 } from 'uuid';


let selectedColor = "#ffffff"

export default function Home({ navigation, screenProps }) {

    const [newProjectName, setNewProjectName] = React.useState("");



    const addProject = () => {

        let copy = screenProps.data


        copy.projects.push({
            pid: "P_"+uuidv4(),
            name: newProjectName,
            trackings: [],
            color: selectedColor
        })
        navigation.navigate("Timeline", { closeProjectSelection: true })

        screenProps.setData(copy)
    }

    return (
        <View style={g.body}>
            <View>
                {/* https://www.npmjs.com/package/react-native-color-palette */}
                <ColorPalette
                    onChange={color => { selectedColor = color }}
                    defaultColor={'#C0392B'}
                    colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']}
                    title={"Choose a color for your project:"}
                    icon={<Icon name={'check'} size={25} color={'white'} />}
                /> 
            </View>
            <TextInput
                style={g.input}
                onChangeText={setNewProjectName}
                value={newProjectName} />
            <Button title={"Add Project"} onPress={() => addProject()} />
        </View>
    );
}
