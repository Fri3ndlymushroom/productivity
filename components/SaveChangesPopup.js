import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import g, { p } from "../styles/global"

export default function SaveChangesPopup({ newLoc, setPopupOpen, saveChanges, navigation }) {

    const navigate = () => {
        setPopupOpen(false)
        if (newLoc) {
            navigation.navigate(newLoc)
        }
        else
            navigation.goBack()
    }


    return (
        <TouchableOpacity onPress={() => setPopupOpen(false)} style={s.popup}>
            <Text style={g.text}>Do you want to save the changes you have made</Text>
            <View style={s.buttonWrapper}>
                <TouchableOpacity onPress={() => { navigate() }} style={s.button}>
                    <Text style={g.text}>Discard Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { saveChanges(); navigate() }} style={s.button}>
                    <Text style={g.text}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
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
        padding: "10%",
        backgroundColor: "#00000099",
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
    },
    button: {
        backgroundColor: p.bg2,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: p.br,
        margin: 10,
        width: 140,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonWrapper: {
        display:"flex",
        flexDirection:"row",
        width: "100%",
        justifyContent: "space-around"
    }
})
