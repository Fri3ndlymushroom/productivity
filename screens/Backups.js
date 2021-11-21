import React, { useState, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import g, { p } from "../styles/global"
import NavbarStack from '../components/NavbarStack'
import { auth, db } from '../js/firebase'
import {secondsToShortDateString, secondsToDayString} from "../js/timerfunctions"


export default function Backups({ navigation, screenProps }) {



    const [backups, setBackups] = useState([])
    const [popup, setPopup] = useState({open: false, backup: 0})

    useEffect(() => {
        const getBackups = async () => {
            await db.collection("backups").doc(auth.currentUser.uid).get().then((doc) => {
                setBackups(doc.data().backupTimestamps)
            })
        }
        getBackups()
    }, [])


    const downloadBackup = async (backupid) =>{        
        await db.collection("backups").doc(auth.currentUser.uid).collection("user_backups").doc(backupid.toString(10)).get().then(doc =>{
            screenProps.setData(doc.data().data)
        }).catch(err=>{
            console.error(err)
        })
    }

    return (
        <>
            <View style={g.body}>
                <NavbarStack navigation={navigation} loc={"Backups"}></NavbarStack>
                <ScrollView style={s.backups}>
                    {
                        backups.map((backup) => {
                            return (
                                <TouchableOpacity style={s.backupCard}key={backup} onPress={()=>setPopup({open: true, backup: backup })}>
                                    <Text style={g.textDim}>Backup from </Text>
                                    <Text style={g.text} >{secondsToDayString(backup)}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }


                </ScrollView>
            </View>
            {
                popup.open &&
                <TouchableOpacity onPress={() => setPopup({open: false})} style={s.popup}>
                    <Text style={g.text}>Do you really want to download the backup from the {secondsToShortDateString(popup.backup)}?</Text>
                    <TouchableOpacity onPress={() => {downloadBackup(popup.backup); setPopup({open:false})}} style={g.button}>
                        <Text style={g.text}>Download Backup</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            }
        </>
    )
}

const s = StyleSheet.create({
    backups: {
        marginTop: 100,
        height: 200,
        borderRadius: p.br,
        width: "100%",
        display: "flex"
    },
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
        alignItems: "center",
        justifyContent: 'center',
    },
    backupCard:{
        marginHorizontal: "10%",
        marginVertical: 5,
        padding: 10,
        borderRadius: p.br,
        width: "80%",
        backgroundColor: p.bg2,

    }
})
