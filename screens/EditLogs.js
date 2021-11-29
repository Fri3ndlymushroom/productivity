import React, { useState, useEffect } from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from "react-native"
import g, { p } from '../styles/global'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { formatSeconds } from '../js/timerfunctions';
import { copyObject } from "../js/functions"
import NavbarStack from '../components/NavbarStack'
import { Spacer } from '../components/Components';
import ProjectIcons from "../components/ProjectIcons"
import { format } from 'date-fns';


export default function EditLog({ navigation, screenProps }) {


    const [log, setLog] = useState(JSON.parse(JSON.stringify(navigation.getParam("edited_log"))))
    const [times, setTimes] = useState({ start: 0, end: 0 })

    const [dateTimeProps, setDateTimeProps] = useState({
        target: "daily_goal",
        value: 3600,
        mode: "time",
        open: false
    })

    let day = Math.floor(log.start / 24 / 60 / 60) * 24 * 60 * 60

    let project = screenProps.data.projects.filter((project) => project.pid === log.pid)[0]


    useEffect(() => {
        setTimes({
            start: log.start - day,
            end: log.end - day
        })
    }, [])



    const EditLog = (event, value) => {
        if (value) {
            if (dateTimeProps.target === "date") editDateOfLog(value)
            else if (dateTimeProps.target === "start") editStartOfLog(value)
            else if (dateTimeProps.target === "end") editEndOfLog(value)
        }
        else {
            setDateTimeProps({ target: "daily_goal", value: 3600, mode: "time", open: false })
        }
    }

    const editEndOfLog = (value) => {
        let newEnd = value.getTime() / 1000
        let newAbsEnd = newEnd - day


        let endIsBigger = newAbsEnd > times.start
        let doesntExceed = newAbsEnd - screenProps.settings.start_of_day <= 86400

        setDateTimeProps({ target: "daily_goal", value: 3600, mode: "time", open: false })
        if (endIsBigger && doesntExceed) {

            setTimes({
                start: times.start,
                end: newAbsEnd
            })

            let logCopy = JSON.parse(JSON.stringify(log))

            logCopy.end = newEnd
            logCopy.duration = logCopy.end - logCopy.start
            setLog(logCopy)
        }
    }

    const editStartOfLog = (value) => {
        let newStart = value.getTime() / 1000
        let newAbsStart = newStart - day

        let endIsBigger = times.end > newAbsStart
        let doesntExceed = newAbsStart - screenProps.settings.start_of_day <= 86400

        setDateTimeProps({ target: "daily_goal", value: 3600, mode: "time", open: false })
        if (endIsBigger && doesntExceed) {
            setTimes({
                start: newAbsStart,
                end: times.end
            })

            let logCopy = JSON.parse(JSON.stringify(log))

            logCopy.start = newStart
            logCopy.duration = logCopy.end - logCopy.start
            setLog(logCopy)
        }
    }

    const editDateOfLog = (date) => {


        let start = date.getTime() / 1000
        let move = start - log.start
        let end = log.end + move

        let copy = copyObject(log)
        copy.start = start
        copy.end = end
        copy.day = Math.floor((copy.start - screenProps.settings.start_of_day) / 60 / 60 / 24)
        setDateTimeProps({ target: "daily_goal", value: 3600, mode: "time", open: false })
        setLog(copy)

    }

    const moveStartOfLog = (start) => {

        let endIsBigger = times.end > times.start + start
        let doesntExceed = times.start + start - screenProps.settings.start_of_day <= 86400

        if (endIsBigger && doesntExceed) {
            setTimes({
                start: times.start + start,
                end: times.end
            })

            let logCopy = JSON.parse(JSON.stringify(log))

            logCopy.start += start
            logCopy.duration = logCopy.end - logCopy.start
            setLog(logCopy)
        }
    }

    const moveEndOfLog = (end) => {

        let endIsBigger = times.end + end > times.start
        let doesntExceed = times.end + end - screenProps.settings.start_of_day <= 86400

        if (endIsBigger && doesntExceed) {
            setTimes({
                start: times.start,
                end: times.end + end
            })

            let logCopy = JSON.parse(JSON.stringify(log))

            logCopy.end += end
            logCopy.duration = logCopy.end - logCopy.start
            setLog(logCopy)
        }
    }

    const saveChanges = () => {
        let copy = JSON.parse(JSON.stringify(screenProps.data))
        let index = copy.all_logs.findIndex((logRef) => logRef.lid === log.lid)

        copy.all_logs[index] = log
        screenProps.setData(copy)
        navigation.pop()
    }


    const deleteLog = () => {

        let copy = copyObject(screenProps.data)
        let index = copy.all_logs.findIndex((match) => log.lid === match.lid)
        copy.all_logs.splice(index, 1)

        screenProps.setData(copy)
        navigation.pop()
    }



    return (
        <View style={g.body}>
            <NavbarStack navigation={navigation} loc={"Edit Log"} saveable={true} changed={true} saveChanges={saveChanges}></NavbarStack>
            <Spacer height={150} />


            <View style={s.projectPreview}>
                <View style={[g.logoWrapper, { backgroundColor: log.color }]}>
                    <ProjectIcons figure={project.icon} />
                </View>
                <Text style={{ color: p.text__main, fontSize: 18, margin: 5 }}>{log.project}</Text>
                <View style={{ flex: 1 }}></View>
                <Text style={{ color: p.text__dim, fontSize: 16, margin: 5 }}>{format(log.duration, "HH'h' mm'min' ss'sek'")}</Text>
            </View>

            <View>
                {dateTimeProps.open && (
                    <RNDateTimePicker
                        testID="dateTimePicker"
                        mode={dateTimeProps.mode}
                        is24Hour={true}
                        display="default"
                        value={new Date(dateTimeProps.value * 1000)}
                        onChange={EditLog}
                        timeZoneOffsetInMinutes={0}
                    />
                )}
            </View>


            <TouchableOpacity style={s.datePickerButton} onPress={() => setDateTimeProps({
                target: "date",
                value: log.start,
                mode: "date",
                open: true
            })}><Text style={{
                color: p.text__main,
                fontSize: 18
            }}>{formatSeconds(log.start, "EEE, d MMM")}</Text></TouchableOpacity>
            <View style={s.timeEditorWrapper}>
                <View style={s.timeEditorParent}>
                    <View style={s.timeEditorButtonWrapper}>
                        <TouchableOpacity style={s.timeEditorButton} onPress={() => moveStartOfLog(3600)}><Text style={g.text}>^</Text></TouchableOpacity>
                        <View style={{ flex: 1 }}></View>
                        <TouchableOpacity style={s.timeEditorButton} onPress={() => moveStartOfLog(300)}><Text style={g.text}>^</Text></TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={s.timeEditorViewWrapper}
                        onPress={() => setDateTimeProps({
                            target: "start",
                            value: log.start,
                            mode: "time",
                            open: true
                        })}
                    >
                        <Text style={s.timeEditorText}>{formatSeconds(log.start, "HH:mm").split(":")[0]}</Text>
                        <Text style={s.timeEditorText}>:</Text>
                        <Text style={s.timeEditorText}>{formatSeconds(log.start, "HH:mm").split(":")[1]}</Text>
                    </TouchableOpacity>
                    <View style={s.timeEditorButtonWrapper}>
                        <TouchableOpacity style={s.timeEditorButton} onPress={() => moveStartOfLog(-3600)}><Text style={g.text}>v</Text></TouchableOpacity>
                        <View style={{ flex: 1 }}></View>
                        <TouchableOpacity style={s.timeEditorButton} onPress={() => moveStartOfLog(-300)}><Text style={g.text}>v</Text></TouchableOpacity>
                    </View>
                </View>
                <Text style={g.text}>-</Text>
                <View style={s.timeEditorParent}>
                    <View style={s.timeEditorButtonWrapper}>
                        <TouchableOpacity style={s.timeEditorButton} onPress={() => moveEndOfLog(3600)}><Text style={g.text}>^</Text></TouchableOpacity>
                        <View style={{ flex: 1 }}></View>
                        <TouchableOpacity style={s.timeEditorButton} onPress={() => moveEndOfLog(300)}><Text style={g.text}>^</Text></TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={s.timeEditorViewWrapper}
                        onPress={() => setDateTimeProps({
                            target: "end",
                            value: log.end,
                            mode: "time",
                            open: true
                        })}
                    >
                        <Text style={s.timeEditorText}>{formatSeconds(log.end, "HH:mm").split(":")[0]}</Text>
                        <Text style={s.timeEditorText}>:</Text>
                        <Text style={s.timeEditorText}>{formatSeconds(log.end, "HH:mm").split(":")[1]}</Text>
                    </TouchableOpacity>
                    <View style={s.timeEditorButtonWrapper}>
                        <TouchableOpacity style={s.timeEditorButton} onPress={() => moveEndOfLog(-3600)}><Text style={g.text}>v</Text></TouchableOpacity>
                        <View style={{ flex: 1 }}></View>
                        <TouchableOpacity style={s.timeEditorButton} onPress={() => moveEndOfLog(-300)}><Text style={g.text}>v</Text></TouchableOpacity>
                    </View>
                </View>
            </View>


            <View style={{ flex: 1 }}></View>
            <View style={s.buttonSection}>
                <TouchableOpacity style={s.button} onPress={() => saveChanges()}>
                    <Text style={g.text}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity style={s.button} onPress={() => deleteLog()}>
                    <Text style={g.text}>Delete</Text>
                </TouchableOpacity>
            </View>
            <Spacer height={50} />
        </View>
    );
}
const s = StyleSheet.create({

    timeCorrector: {
        display: "flex",
        flexDirection: "row",
        width: 200,
        justifyContent: "space-between",
        margin: 10,
    },
    timeCorrectorButton: {
        padding: 10,
        backgroundColor: p.bg2,
        borderRadius: p.br
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: p.bg2,
        borderRadius: p.br,
        margin: 5,
        width: 120,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonSection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    projectPreview: {
        width: 300,
        height: 60,
        backgroundColor: p.bg2,
        borderRadius: p.br,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 8
    },
    datePickerButton: {
        padding: 10,
        borderRadius: p.br
    },
    timeEditorButton: {
        paddingHorizontal: 5,
        paddingVertical: 20
    },
    timeEditorParent: {
        width: "30%"
    },
    timeEditorButtonWrapper: {
        display: "flex",
        flexDirection: "row"
    },
    timeEditorViewWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    timeEditorWrapper: {
        display: "flex",
        flexDirection: "row",
        width: "60%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    timeEditorText:{
        color: p.text__main,
        fontSize: 16,
        fontWeight: "bold"
    }
});
