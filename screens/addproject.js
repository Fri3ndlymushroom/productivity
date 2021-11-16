import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Text, View } from "react-native"
import g, { p } from '../styles/global'
import { DefaultText } from '../components/Components'
import ProjectSelection from "../components/ProjectSelection"
import ColorPalette from 'react-native-color-palette'
import Icon from 'react-native-vector-icons/FontAwesome';
import { v4 as uuidv4 } from 'uuid';
import NavbarStack from '../components/NavbarStack'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ProjectIcons from '../components/ProjectIcons';

export default function Home({ navigation, screenProps }) {

    const [newProjectName, setNewProjectName] = useState("new Project");
    const [selectedColor, setSelectedColor] = useState("#C0392B");
    const [selectedIcon, setSelectedIcon] = useState("cube")

    let colorStyle = StyleSheet.create({
        style: {
            backgroundColor: selectedColor
        }
    })


    const addProject = () => {

        let copy = screenProps.data


        copy.projects.push({
            pid: "P_" + uuidv4(),
            name: newProjectName,
            trackings: [],
            color: selectedColor,
            icon: selectedIcon
        })
        navigation.navigate("Timeline", { closeProjectSelection: true })

        screenProps.setData(copy)
    }


    let icons = ["cube", "add"]

    return (
        <View style={g.body}>
            <NavbarStack navigation={navigation} loc={"Create Project"}></NavbarStack>


            <View style={s.projectPreview}>
                <View style={[g.logoWrapper, colorStyle.style]}>
                    <ProjectIcons figure={selectedIcon} />
                </View>
                <TextInput
                    style={[g.input, s.projectTitle]}
                    onChangeText={setNewProjectName}
                    value={newProjectName} />
            </View>

            <View>
                {/* https://www.npmjs.com/package/react-native-color-palette */}
                <ColorPalette
                    onChange={color => { setSelectedColor(color) }}
                    defaultColor={'#C0392B'}
                    colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']}
                    icon={<Icon name={'check'} size={25} color={p.text__main} />}
                    titleStyles={{ color: "transparent" }}
                />
            </View>

            <View style={s.iconWrapper}>
                {
                    icons.map((icon)=>{
                        return(

                            <TouchableOpacity onPress={()=>setSelectedIcon(icon)} style={g.logoWrapper}>
                                <ProjectIcons figure={icon}/>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            <TouchableOpacity style={s.button} onPress={() => addProject()} ><Text style={g.text}>Add Project</Text></TouchableOpacity>
        </View>
    );
}

const s = StyleSheet.create({
    iconWrapper:{
        display: "flex",
        flexDirection: "row"
    }, 
    projectTitle:{
        fontSize: 16,
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: p.bg2,
        borderRadius: p.br
    },
    projectPreview: {
        width: 300,
        height: 60,
        backgroundColor: p.bg2,
        borderRadius: p.br,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 8
    }
})
