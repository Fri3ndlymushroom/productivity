import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import g, { p , shadow} from "../styles/global"
import { copyObject } from '../js/functions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { formatSeconds } from '../js/timerfunctions';
import Navbar from '../components/NavbarDrawer';
import auth from "@react-native-firebase/auth"
import { Spacer } from '../components/Components';

export default function Settings({ navigation, screenProps }) {


    let [newSettings, setNewSettings] = useState(copyObject(screenProps.settings))

    const [dateTimeProps, setDateTimeProps] = useState({
        target: "daily_goal",
        value: 3600,
        mode: "time",
        open: false
    })

    const saveChanges = () => {
        screenProps.setSettings(newSettings)
    }

    const dateTimePickerOnChange = (event, value) => {
        if(!value) return
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
    }


    return (
        <View style={g.body} >
            <Navbar {...{ navigation }} location={"Settings"} />
            <Spacer height={200}/>
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
            {/* backups */}
            <TouchableOpacity onPress={()=> auth().currentUser ? (screenProps.isPro ? navigation.navigate("Backups"): navigation.navigate("Pro")) :navigation.navigate("Signin") } style={s.backupsButton}>
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


            <Button title="save" onPress={saveChanges} />
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
    backupsButton: {
        height: 200,
        width: 300,
        padding: 30,
        backgroundColor: p.bg2,
        borderRadius: p.br,
        ...g.shadow
    },
    backupsHeader:{
        fontSize: 16,
        color: p.text__main
    },
    backupsInfo:{
        color:p.text__dim
    }
})
