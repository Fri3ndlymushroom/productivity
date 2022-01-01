import React, {useState} from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import SaveChangesPopup from './SaveChangesPopup';

import g, { p } from "../styles/global"

export default function Navbar({ navigation, location, saveable, changed, saveChanges }) {
    const navigate = (loc) => {
        navigation.navigate(loc)
    }

    const navOptions = ["Timeline", "Analytics", "Settings"]
    const [popupOpen, setPopupOpen] = useState({open: false, newLoc: ""})

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
                    {
                        navOptions.map((navOption) => {
                            let style = [s.navbarText]
                            if (navOption === location) style.push(s.current)
                            return <TouchableOpacity key={"location" + navOption} onPress={() => saveable && changed ? setPopupOpen({open: true, newLoc: navOption}) : navigate(navOption)} style={s.navbarButton}><Text style={style}>{navOption}</Text></TouchableOpacity>
                        })}
                </View>
            </View>
            {
                popupOpen.open &&
                <SaveChangesPopup newLoc={popupOpen.newLoc} setPopupOpen={setPopupOpen} saveChanges={saveChanges} navigation={navigation} />
            }
        </>
    )
}

const s = StyleSheet.create({
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
        justifyContent: "center"
    },
    navbarWrapper: {
        position: "absolute",
        display: "flex",
        flexDirection: "row"
    },
    navbarButton: {
        padding: 10
    },
    navbarText: {
        color: p.text__dim,
        fontSize: 18
    },
    current: {
        fontSize: 20,
        position: "relative",
        bottom: 3,
        color: p.text__main
    }
})
