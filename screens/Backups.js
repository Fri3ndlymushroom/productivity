import React, { useState, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import g, { p } from "../styles/global"
import NavbarStack from '../components/NavbarStack'
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { formatSeconds } from "../js/timerfunctions"
import { Spacer } from '../components/Components'
import { doBackup } from '../js/backupsystem'


export default function Backups({ navigation, screenProps }) {



    const [backups, setBackups] = useState([])
    const [popup, setPopup] = useState({ open: false, backup: 0 })

    useEffect(() => {
        const getBackups = async () => {
            await firestore().collection("backups").doc(auth().currentUser.uid).get().then((doc) => {
                setBackups(doc.data() ? doc.data().backupTimestamps : [])
            }).catch(e => {
                console.error(e)
            })
        }
        getBackups()
    }, [])


    const downloadBackup = async (backupid) => {


        await firestore().collection("backups").doc(auth().currentUser.uid).collection("user_backups").doc(backupid.toString(10)).get().then(doc => {
            screenProps.setData(doc.data().data)
        }).catch(e => {
            console.error(e)
        })
    }






    return (
        <>
            <View syle={g.bodyWrapper}>
                <View style={g.body}>
                    <NavbarStack navigation={navigation} loc={"Backups"} ></NavbarStack>
                    <Spacer height={0} />

                    <ScrollView
                        style={s.backups}
                    >
                        <Spacer height={100} />
                        {

                            backups.reverse().map((backup) => {
                                return (
                                    <TouchableOpacity style={s.backupCard} key={backup} onPress={() => setPopup({ open: true, backup: backup })}>
                                        <Text style={g.textDim}>Backup from </Text>
                                        <Text style={g.text} >{formatSeconds(backup, "EEE, d MMM HH:mm")}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }


                    </ScrollView>
                    <Spacer height={30} />
                    <TouchableOpacity onPress={() => doBackup(Math.round(new Date().getTime() / 1000), screenProps.data)} style={s.button}>
                        <Text style={g.text}>Start Manual Backup</Text>
                    </TouchableOpacity>
                    <Spacer height={10} />
                    <Text style={[g.text, { marginHorizontal: "10%", textAlign: "center" }]}>Theta makes one backup automatically every day!</Text>
                    <Spacer height={30} />
                </View>
                </View>
            {
                popup.open &&
                <TouchableOpacity onPress={() => setPopup({ open: false })} style={s.popup}>
                    <Text style={[g.text, { textAlign: "center" }]}>Do you really want to download the backup from the {formatSeconds(popup.backup, 'dd, MM, yy')}?</Text>
                    <Spacer height={10} />
                    <TouchableOpacity onPress={() => { downloadBackup(popup.backup); setPopup({ open: false }) }} style={s.button}>
                        <Text style={g.text}>Download Backup</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            }

        </>
    )
}

const s = StyleSheet.create({
    backups: {
        marginTop: 30,
        height: 200,
        borderRadius: p.br,
        minWidth: "100%",
        display: "flex",
    },
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
    backupCard: {
        marginHorizontal: "15%",
        marginVertical: 5,
        padding: 10,
        borderRadius: p.br,
        width: "70%",
        backgroundColor: p.bg2,

    },
    button: {
        backgroundColor: p.bg2,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: p.br,
    }
})
