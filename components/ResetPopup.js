import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import g, { p } from "../styles/global"
import { productionData } from '../data';

export default function ResetPopup({ setResetOpen, setData }) {

    const reset = () =>{
        setResetOpen(false)
        setData(productionData)
    }


    return (
        <TouchableOpacity onPress={() => setResetOpen(false)} style={s.popup}>
            <Text style={[g.text, {textAlign:"center"}]}>Do you really want to reset the app? Note all your changes, logs and data is lost in this process. If you have Theta Pro you can still dowload your old backups.</Text>
            <View style={s.buttonWrapper}>
                <TouchableOpacity onPress={() => { reset() }} style={s.button}>
                    <Text style={[g.text, {color:"#eb4034"}]}>Reset</Text>
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
        justifyContent: "space-around",
        marginTop: 10
    }
})
