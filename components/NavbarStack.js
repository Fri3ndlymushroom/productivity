import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome';
import ProjectIcons from './ProjectIcons';
import g, { p } from "../styles/global"
import SaveChangesPopup from './SaveChangesPopup';



export default function Navbar({ navigation, loc, children, saveable, changed, saveChanges }) {


    const [popupOpen, setPopupOpen] = useState(false)

    return (
        <>
            <View style={s.navbarContainer}>
                <LinearGradient
                    colors={[p.bg1, "#00000000"]}
                    style={s.gradient}
                    start={{ x: 0.5, y: 0.5 }}
                >
                </LinearGradient>
                <View style={s.navbarWrapper}>
                    <TouchableOpacity style={s.backButton} onPress={() => { saveable && changed ? setPopupOpen(true) : navigation.goBack() }}>
                        <ProjectIcons figure={"back"} />
                    </TouchableOpacity>
                    <Text style={s.navbarTitle}>{loc}</Text>
                    {children ? children : <View style={{ width: 34 }}></View>}
                </View>
            </View>
            {
                popupOpen &&
                <SaveChangesPopup setPopupOpen={setPopupOpen} saveChanges={saveChanges} navigation={navigation} />
            }
        </>
    )

}

const s = StyleSheet.create({
    navbarTitle: {
        color: p.text__main,
        fontSize: 20
    },
    gradient: {
        height: 200,
        width: Dimensions.get("window").width,
    },
    navbarContainer: {
        zIndex: 10,
        position: "absolute",
        top: 0,
        height: 100,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    navbarWrapper: {
        width: "80%",
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"

    },
    navbarButton: {
        padding: 10
    },
    navbarText: {
        textAlign: "center",
        color: p.text__main,
        fontSize: 16,
    },
    current: {
        fontSize: 18,
        position: "relative",
        bottom: 3,
        color: p.text__main
    },
    backButton: {
        padding: 10
    }
})
