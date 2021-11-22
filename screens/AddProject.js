import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Text, View, ScrollView } from "react-native"
import g, { p } from '../styles/global'
import { DefaultText, Spacer } from '../components/Components'
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
    let colors = ['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']

    return (
        <View style={[g.body, s.body]}>
            <NavbarStack navigation={navigation} loc={"Create Project"}></NavbarStack>

            <Spacer height={200}/>
            <View style={s.projectPreview}>
                <View style={[g.logoWrapper, colorStyle.style]}>
                    <ProjectIcons figure={selectedIcon} />
                </View>
                <TextInput
                    style={[g.input, s.projectTitle]}
                    onChangeText={setNewProjectName}
                    value={newProjectName} />
            </View>
            <View style={s.selectionParent}>
                <ScrollView style={s.selectionScroll}
                    horizontal={true}
                >
                    <View style={s.selectionInner}>
                        {
                            colors.map(color => {
                                let dynamic = {
                                    backgroundColor: color,
                                    borderWidth: (color === selectedColor ? 2 : 0),
                                    borderColor: "white"
                                }


                                return (
                                    <TouchableOpacity key={color} onPress={() => setSelectedColor(color)} style={[s.colorTile, dynamic]}>

                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>

            <View style={s.selectionParent}>
                <ScrollView style={s.selectionScroll}
                    horizontal={true}
                >
                    <View style={s.selectionInner}>
                        {
                            icons.map((icon) => {
                                let dynamic = {
                                    borderWidth: (icon === selectedIcon ? 2 : 0),
                                    borderColor: "white"
                                }
                                return (
                                    <TouchableOpacity onPress={() => setSelectedIcon(icon)} style={[s.logoWrapper, dynamic]}>
                                        <ProjectIcons figure={icon} />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
            <View style={{flex: 1}}></View>
            <TouchableOpacity style={s.button} onPress={() => addProject()} ><Text style={g.text}>Add Project</Text></TouchableOpacity>
            <Spacer height={50}/>
        </View>
    );
}

const s = StyleSheet.create({

    iconWrapper: {
        display: "flex",
        flexDirection: "row"
    },
    projectTitle: {
        fontSize: 16,
    },
    button: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: p.bg2,
        borderRadius: p.br,
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
    },
    colorTile: {
        width: 50,
        height: 50,
        borderRadius: p.br,
        marginHorizontal: 5
    },
    selectionInner: {
        display: "flex",
        flexDirection: "row",
        height: 50,
    },
    selectionScroll: {
        height: 50
    },
    selectionParent: {
        height: 50,
        marginVertical: 20
    },
    logoWrapper:{
        width: 50,
        height: 50,
        backgroundColor: p.bg2,
        borderRadius: p.br,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5
    }
})
