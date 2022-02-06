import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Text, View, ScrollView, Dimensions } from "react-native"
import g, { p, colorPalette, iconNames } from '../styles/global'
import { DefaultText, Spacer } from '../components/Components'
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import { v4 as uuidv4 } from 'uuid';
import NavbarStack from '../components/NavbarStack'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ProjectIcons from '../components/ProjectIcons';
import { SpacerHor } from '../components/Components';

export default function Home({ navigation, screenProps }) {

    const [newProjectName, setNewProjectName] = useState("New Project");
    const [selectedColor, setSelectedColor] = useState("#6845f5");
    const [selectedIcon, setSelectedIcon] = useState("cube")
    const [projectNameState, setProjectNameState] = useState({ok: true, message: ""})

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



    return (
        <View syle={g.bodyWrapper}>
            <View style={g.body}>
                <NavbarStack navigation={navigation} loc={"Create Project"}></NavbarStack>

                <Spacer height={200} />
                <View style={s.projectPreview}>
                    <View style={[g.logoWrapper, colorStyle.style]}>
                        <ProjectIcons figure={selectedIcon} />
                    </View>
                    <TextInput
                        style={[g.input, s.projectTitle]}
                        onChangeText={(name)=>{
                            setNewProjectName(name);
                            if(name.length > 20)
                                setProjectNameState({ok: false, message: "The name of the project is too long " + name.length + "/20"})
                            else
                                setProjectNameState({ok: true, message: ""})
                        
                        }}
                        value={newProjectName} />
                </View>
                <View style={s.selectionParent}>
                    <ScrollView style={s.selectionScroll}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={s.selectionInner}>
                        <SpacerHor width={Dimensions.get("window").width*0.1}/>
                            {
                                colorPalette.map(color => {
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
                            <SpacerHor width={Dimensions.get("window").width*0.1}/>
                        </View>
                    </ScrollView>
                </View>

                <View style={s.selectionParent}>
                    <ScrollView style={s.selectionScroll}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={s.selectionInner}>
                        <SpacerHor width={Dimensions.get("window").width*0.1}/>
                            {
                                iconNames.map((icon) => {
                                    let dynamic = {
                                        borderWidth: (icon === selectedIcon ? 2 : 0),
                                        borderColor: "white"
                                    }
                                    return (
                                        <TouchableOpacity key={icon} onPress={() => setSelectedIcon(icon)} style={[s.logoWrapper, dynamic]}>
                                            <ProjectIcons figure={icon} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                            <SpacerHor width={Dimensions.get("window").width*0.1}/>
                        </View>
                    </ScrollView>
                </View>
                <Spacer height={50}/>
                <Text style={{textAlign: "center"}}>{projectNameState.message}</Text>
                <View style={{ flex: 1 }}></View>
                <TouchableOpacity style={s.button} onPress={() =>{ if(projectNameState.ok)addProject()}} ><Text style={g.text}>Add Project</Text></TouchableOpacity>
                <Spacer height={50} />
            </View>
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
        width: "80%"

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
    logoWrapper: {
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
