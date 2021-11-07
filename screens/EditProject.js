import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, Button, TextInput, View } from 'react-native';
import g from '../styles/global'
import ColorPalette from 'react-native-color-palette'
import { DefaultText } from '../components/Components'
import { copyObject } from '../js/functions';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavbarStack from '../components/NavbarStack'

export default function EditProject({ navigation, screenProps }) {
    let pid = navigation.getParam("edited_project")

    let index = screenProps.data.projects.findIndex((project) => project.pid === pid)

    let [project, setProject] = useState(screenProps.data.projects[index])


    const changeProjectName = (newName) => {
        let copy = copyObject(project)
        copy.name = newName
        setProject(copy)
    }

    const changeProjectColor = (newColor)=>{
        let copy = copyObject(project)
        copy.color = newColor
        setProject(copy)
    }

    const saveChanges = () => {
        let copy = copyObject(screenProps.data)
        copy.projects[index] = project
        screenProps.setData(copy)
        navigation.pop()
    }


    const archiveProject = () =>{
        let copy = copyObject(screenProps.data)
        let index = copy.projects.findIndex((project) => project.pid === pid)

        copy.projects[index].archived = true

        copy.all_logs.forEach((log, i)=>{
            if (log.pid === pid){
                copy.all_logs[i].archived = true
            }
        })

        screenProps.setData(copy)
        navigation.pop()
        navigation.pop()
    }

    
    const deleteProject = () =>{
        let copy = copyObject(screenProps.data)
        let index = copy.projects.findIndex((project) => project.pid === pid)

        copy.projects.splice(index, 1)

        copy.all_logs = copy.all_logs.filter((log)=> log.pid !== pid)

        screenProps.setData(copy)

        navigation.pop()
        navigation.pop()
    }


    return (
        <View style={g.body}>
            <NavbarStack navigation={navigation} loc={"Edit Project"}></NavbarStack> 
            <DefaultText>Editing {project.name} </DefaultText>
            <StatusBar style="auto" />
            <View>
                <Text>Name: </Text>
                <TextInput
                    style={g.input}
                    onChangeText={changeProjectName}
                    value={project.name} />
            </View>
            <View>
                {/* https://www.npmjs.com/package/react-native-color-palette */}
                <ColorPalette
                    onChange={changeProjectColor}
                    defaultColor={project.color}
                    colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']}
                    title={"Choose a color for your project:"}
                    icon={<Icon name={'check'} size={25} color={'white'} />}
                />
            </View>
            <Button title="Save Changes" onPress={() => saveChanges()} />
            <Button title="Archive Project" onPress={()=>archiveProject()}/>
            <Button title="Delete Project" onPress={()=>deleteProject()}/>
        </View>
    );
}
