import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import g, { p, iconNames, colorPalette } from '../styles/global'
import { Spacer } from '../components/Components'
import { copyObject } from '../js/functions';
import NavbarStack from '../components/NavbarStack'
import ProjectIcons from '../components/ProjectIcons';


export default function EditProject({ navigation, screenProps }) {
    let pid = navigation.getParam("edited_project")

    let index = screenProps.data.projects.findIndex((project) => project.pid === pid)

    let [project, setProject] = useState(screenProps.data.projects[index])

    const [popup, setPopup] = useState(false)
    const [changed, setChanged] = useState(false)
    const [projectNameState, setProjectNameState] = useState({ ok: true, message: "" })

    const changeProjectName = (newName) => {
        if (newName.length > 20)
            setProjectNameState({ ok: false, message: "The name of the project is too long " + newName.length + "/20" })
        else
            setProjectNameState({ ok: true, message: "" })
        
        let copy = copyObject(project)
        copy.name = newName
        setProject(copy)
        setChanged(true)
    }

    const changeProjectColor = (newColor) => {
        let copy = copyObject(project)
        copy.color = newColor
        setProject(copy)
        setChanged(true)
    }

    const changeProjectIcon = (newIcon) => {
        let copy = copyObject(project)
        copy.icon = newIcon
        setProject(copy)
        setChanged(true)
    }

    const saveChanges = () => {
        let copy = copyObject(screenProps.data)
        copy.projects[index] = project
        screenProps.setData(copy)
        navigation.pop()
        setChanged(false)
    }


    const archiveProject = () => {
        let copy = copyObject(screenProps.data)
        let index = copy.projects.findIndex((project) => project.pid === pid)

        copy.projects[index].archived = true

        copy.all_logs.forEach((log, i) => {
            if (log.pid === pid) {
                copy.all_logs[i].archived = true
            }
        })

        screenProps.setData(copy)
        navigation.pop()
        navigation.pop()
    }


    const deleteProject = () => {
        let copy = copyObject(screenProps.data)
        let index = copy.projects.findIndex((project) => project.pid === pid)

        copy.projects.splice(index, 1)

        copy.all_logs = copy.all_logs.filter((log) => log.pid !== pid)

        screenProps.setData(copy)

        navigation.pop()
        navigation.pop()
    }



    return (
        <>
            <View style={g.body}>
                <NavbarStack navigation={navigation} loc={"Edit Project"} saveable={true} changed={changed} saveChanges={saveChanges}></NavbarStack>
                <Spacer height={200} />
                <View style={s.projectPreview}>
                    <View style={[g.logoWrapper, { backgroundColor: project.color }]}>
                        <ProjectIcons figure={project.icon} />
                    </View>
                    <TextInput
                        style={[g.input, s.projectTitle]}
                        onChangeText={changeProjectName}
                        value={project.name} />
                </View>
                <View style={s.selectionParent}>
                    <ScrollView style={s.selectionScroll}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={s.selectionInner}>
                            {
                                colorPalette.map(color => {
                                    let dynamic = {
                                        backgroundColor: color,
                                        borderWidth: (color === project.color ? 2 : 0),
                                        borderColor: "white"
                                    }


                                    return (
                                        <TouchableOpacity key={color} onPress={() => changeProjectColor(color)} style={[s.colorTile, dynamic]}>

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
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={s.selectionInner}>
                            {
                                iconNames.map((icon) => {
                                    let dynamic = {
                                        borderWidth: (icon === project.icon ? 2 : 0),
                                        borderColor: "white"
                                    }
                                    return (
                                        <TouchableOpacity key={icon} onPress={() => changeProjectIcon(icon)} style={[s.logoWrapper, dynamic]}>
                                            <ProjectIcons figure={icon} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
                <Spacer height={50}/>
                <Text style={{textAlign: "center"}}>{projectNameState.message}</Text>
                <View style={{ flex: 1 }}></View>
                <View style={s.buttonSection}>
                    <TouchableOpacity style={s.button} onPress={() =>{ if(projectNameState.ok) saveChanges()}}><Text style={[g.text, g.buttonText]}>Save</Text></TouchableOpacity>
                    <TouchableOpacity style={s.button} onPress={() => archiveProject()}><Text style={[g.text, g.buttonText]}>Archive</Text></TouchableOpacity>
                    <TouchableOpacity style={s.button} onPress={() => setPopup(true)}><Text style={[g.text, g.buttonText]}>Delete</Text></TouchableOpacity>
                </View>
                <Spacer height={50} />
            </View>
            {
                popup &&
                <TouchableOpacity onPress={() => setPopup(false)} style={s.popup}>
                    <Text style={g.text}>Do you really want to delete this project?</Text>
                    <TouchableOpacity onPress={() => deleteProject()} style={g.button}>
                        <Text style={g.text}>Delete this project permanently</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            }
        </>
    );
}

const s = StyleSheet.create({
    popup: {
        zIndex: 10,
        elevation: (Platform.OS === 'android') ? 10 : 0,
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "#00000099",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        justifyContent: 'center',
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
    projectTitle: {
        width: "80%",
        fontSize: 16,
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
    logoWrapper: {
        width: 50,
        height: 50,
        backgroundColor: p.bg2,
        borderRadius: p.br,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5
    },
    buttonSection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%"
    },
    button: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        width: 90,
        marginHorizontal: 5,
        backgroundColor: p.bg2,
        borderRadius: p.br,
    },
})
