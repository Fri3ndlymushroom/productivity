import { StatusBar } from 'expo-status-bar';
import React, {useState}from 'react';
import { Text,Button, TextInput, View } from 'react-native';
import g from '../styles/global'
import { DefaultText } from '../components/Components'
import { copyObject } from '../js/functions';

export default function EditProject({ navigation, screenProps }) {
    let pid = navigation.getParam("edited_project")

    let index = screenProps.data.projects.findIndex((project) => project.pid === pid)

    let [project, setProject] = useState(screenProps.data.projects[index])


    const changeProjectName = (newName) => {
        let copy = copyObject(project)
        copy.name = newName
        setProject(copy)
    }   
    
    const saveChanges = () =>{
        let copy = copyObject(screenProps.data)
        copy.projects[index] = project
        screenProps.setData(copy)
    }


    return (
        <View style={g.body}>
            <DefaultText>Editing {project.name} </DefaultText>
            <StatusBar style="auto" />
            <View>
                <Text>Name: </Text>
                <TextInput
                    style={g.input}
                    onChangeText={changeProjectName}
                    value={project.name} />
            </View>
            <Button title="Save Changes" onPress={()=>saveChanges()}/>
        </View>
    );
}
