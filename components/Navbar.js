import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import g, { p } from "../styles/global"

export default function Navbar({navigation, location}) {
    const navigate = (loc) =>{
        navigation.navigate(loc)
    }

    const navOptions = ["Timeline", "Analytics", "Settings"]


    return (
        <View style={s.navbarContainer}>
            <LinearGradient
                style={s.gradient}
                colors={[p.bg1, "#00000000"]}
                start={{
                    x: 0,
                    y: 0.7
                }}
                end={{
                    x: 0,
                    y:1
                }}/>
            <View style={s.navbarWrapper}>
                {
                navOptions.map((navOption)=>{
                    let style = [s.navbarText]
                    if(navOption === location) style.push(s.current)
                    return <TouchableOpacity key={"location"+navOption} onPress={()=>navigate(navOption)} style={s.navbarButton}><Text style={style}>{navOption}</Text></TouchableOpacity>
                })}
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    gradient:{
        height: 100,
        width: Dimensions.get("window").width,
    },
    navbarContainer: {
        zIndex: 10,
        position: "absolute",
        top: 0,
        height: 80,
        width: Dimensions.get("window").width,
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
        fontSize: 16
    },
    current:{
        fontSize: 18,
        position: "relative",
        bottom: 3,
        color: p.text__main
    }
})
