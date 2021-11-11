import React, { useState, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import g, { p } from "../styles/global"
import NavbarStack from '../components/NavbarStack'
import { auth, db } from '../js/firebase'



export default function Backups({ navigation }) {



    const [backups, setBackups] = useState([])

    useEffect(() => {
        const getBackups = async() =>{
            await db.collection("backups").doc(auth.currentUser.uid).get().then((doc)=>{
                setBackups(doc.data().backupTimestamps)
            })
        }
        getBackups()
    }, [])




    return (
        <View style={g.body}>
            <NavbarStack navigation={navigation} loc={"Backups"}></NavbarStack>
            <ScrollView style={s.backups}>
            {
                backups.map((backup)=>{
                    return <Text style={g.text} key={backup}>{backup}</Text>
                })
            }

            </ScrollView>
        </View>
    )
}

const s = StyleSheet.create({
    backups:{
        marginTop: 100,
        height: 200,
        backgroundColor: p.bg2,
        borderRadius: p.br,
        width: "80%"
    }
})
