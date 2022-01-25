import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import g, { p } from "../styles/global"
import { copyObject } from '../js/functions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { formatSeconds } from '../js/timerfunctions';
import Navbar from '../components/NavbarDrawer';
import auth from "@react-native-firebase/auth"
import { Spacer } from '../components/Components';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Settings({ navigation, screenProps }) {

    const [user, setUser] = useState("not logged in")


    useEffect(() => {

        auth().onAuthStateChanged(newUser=>{
            if(newUser){
                setUser(newUser.email)
            }else{
                setUser("not logged in")
            }
        })
    }, [])


    const [changed, setChanged] = useState(false)


    let [newSettings, setNewSettings] = useState(copyObject(screenProps.settings))

    const [dateTimeProps, setDateTimeProps] = useState({
        target: "daily_goal",
        value: 3600,
        mode: "time",
        open: false
    })

    const saveChanges = () => {
        screenProps.setSettings(newSettings)
        setChanged(false)
    }

    const dateTimePickerOnChange = (event, value) => {
        if (!value) return
        let seconds = value.getTime() / 1000
        let copy = copyObject(newSettings)


        switch (dateTimeProps.target) {
            case "daily_goal":
                copy.daily_goal = seconds
                break;
            case "start_of_day":
                copy.start_of_day = seconds
                break;
            default:
                break;
        }

        setDateTimeProps({ target: "daily_goal", value: 3600, mode: "time", open: false })
        setNewSettings(copy)
        setChanged(true)
    }


    return (
        <View style={g.bodyWrapper}>
            <View
                style={g.body}
            >
                <Navbar {...{ navigation }} location={"Settings"} saveable={true} changed={changed} saveChanges={saveChanges} />
                <Spacer height={150} />
                <View>
                    {dateTimeProps.open && (
                        <RNDateTimePicker
                            testID="dateTimePicker"
                            mode={dateTimeProps.mode}
                            is24Hour={true}
                            display="default"
                            value={new Date(dateTimeProps.value * 1000)}
                            onChange={dateTimePickerOnChange}
                            timeZoneOffsetInMinutes={0}
                        />
                    )}
                </View>

                <TouchableOpacity
                    style={{
                        height: 70,
                        width: 300,
                        padding: 12.5,
                        backgroundColor: p.bg2,
                        borderRadius: p.br,
                        ...g.shadow,
                        margin: 5,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",

                    }}
                    onPress={() => navigation.navigate("Signin")}
                >
                    <View
                        style={{ height: 45, width: 45, backgroundColor: p.bg1, borderRadius: p.br, marginRight: 12.5, display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        <Icon name={'user'} size={30} color={'white'} />
                    </View>
                    <Text style={g.text}>{user}</Text>
                </TouchableOpacity>

                {/* Pro */}
                {
                    !screenProps.isPro &&
                    <TouchableOpacity onPress={() => navigation.navigate("Pro")} style={s.proButton}>
                        <Text style={s.backupsHeader}>Theta Pro</Text>
                        <Text style={s.backupsInfo}>Backups</Text>
                        <Text style={s.backupsInfo}>Exports</Text>
                    </TouchableOpacity>
                }

                {/* backups */}
                <TouchableOpacity onPress={() => screenProps.isPro ? (auth().currentUser ? navigation.navigate("Backups") : navigation.navigate("Signin")) : navigation.navigate("Pro")} style={s.backupsButton}>
                    <Text style={s.backupsHeader}>Backups</Text>
                    <Text style={s.backupsInfo}>Pro Feature</Text>
                </TouchableOpacity>

                {/* daily goal */}
                <TouchableOpacity style={s.settingsCard}
                    onPress={() =>
                        setDateTimeProps(
                            {
                                target: "daily_goal",
                                value: newSettings.daily_goal,
                                mode: "time",
                                open: true
                            }
                        )
                    }
                >
                    <Text style={g.text}>Set Daily Goal</Text>
                    <Text style={g.text}>{formatSeconds(newSettings.daily_goal, "HH'hrs' mm'min'")}</Text>
                </TouchableOpacity>

                {/* start of day */}
                <TouchableOpacity style={s.settingsCard}
                    onPress={() =>
                        setDateTimeProps(
                            {
                                target: "start_of_day",
                                value: newSettings.start_of_day,
                                mode: "time",
                                open: true
                            }
                        )
                    }
                >
                    <Text style={g.text}>Set Start Of Day</Text>
                    <Text style={g.text}>{formatSeconds(newSettings.start_of_day, "HH:mm")}</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}></View>
                <TouchableOpacity onPress={saveChanges} style={g.button}><Text style={[g.text, g.buttonText]}>Save Changes</Text></TouchableOpacity>
                <Spacer height={50} />
            </View>
        </View>

    )
}


const s = StyleSheet.create({
    settingsCard: {
        backgroundColor: p.bg2,
        width: 300,
        margin: 5,
        padding: 10,
        display: "flex",
        flexDirection: "row",
        borderRadius: p.br,
        justifyContent: "space-between",
        ...g.shadow
    },
    proButton: {
        height: 200,
        width: 300,
        padding: 30,
        backgroundColor: p.bg2,
        borderRadius: p.br,
        ...g.shadow,
        margin: 5
    },
    backupsButton: {
        height: 100,
        width: 300,
        padding: 30,
        backgroundColor: p.bg2,
        borderRadius: p.br,
        ...g.shadow,
        margin: 5
    },
    backupsHeader: {
        fontSize: 16,
        color: p.text__main
    },
    backupsInfo: {
        color: p.text__dim
    }
})
