import React, { useState } from 'react';
import { ScrollView, Text, View, Platform } from "react-native"
import g from '../styles/global'
import { DefaultText } from '../components/Components'
import ProjectSelection from "../components/ProjectSelection"
import TimelineDay from '../components/TimelineDay';
import { v4 as uuidv4 } from 'uuid';
import TimelineToday from "../components/TimelineToday"
import Navbar from '../components/NavbarDrawer';
import { Spacer } from '../components/Components';
import ProjectIcons from '../components/ProjectIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { copyObject } from '../js/functions';

let contentsizeChanged = false
export default function Timeline({ navigation, screenProps }) {
    const [projectSelectionOpen, setProjectSelectionOpen] = useState(false)

    const startProject = (pid) => {

        let alreadyRunning = screenProps.data.all_logs.filter((log) => log.running).length > 0

        if (!alreadyRunning) {
            let copy = copyObject(screenProps.data)

            let start = Math.round(new Date().getTime() / 1000)
            let name = copy.projects.filter((projectRef) => projectRef.pid === pid)[0].name

            let color = copy.projects.filter((projectRef) => projectRef.pid === pid)[0].color

            copy.all_logs.push({
                project: name,
                pid: pid,
                lid: "L_" + uuidv4(),
                day: Math.floor((start - screenProps.settings.start_of_day) / 60 / 60 / 24),
                start: start,
                duration: 0,
                running: true,
                color: color
            })

            screenProps.setData(copy)
        }
    }

    const stopProject = () => {
        let dataCopy = { ...screenProps.data }

        let runningIndex = dataCopy.all_logs.findIndex((log) => log.running === true)

        let end = Math.round(new Date().getTime() / 1000)
        let start = dataCopy.all_logs[runningIndex].start
        let duration = end - start
        let project = dataCopy.all_logs[runningIndex].project
        let pid = dataCopy.all_logs[runningIndex].pid

        // if not same day
        if (Math.floor((start - screenProps.settings.start_of_day) / 60 / 60 / 24) !== Math.floor((end - screenProps.settings.start_of_day) / 60 / 60 / 24)) {

            let current = start
            let day = Math.floor((start - screenProps.settings.start_of_day) / 60 / 60 / 24)
            let all = []

            while (current < end) {

                let timezoneOffset = new Date().getTimezoneOffset()

                let endOfDay = day * 60 * 60 * 24 + 86399 + timezoneOffset * 60

                all.push({ start: current, end: endOfDay > end ? end : endOfDay, day: day })

                current = endOfDay + 1
                day++
            }

            dataCopy.all_logs.splice(runningIndex, 1)


            all.forEach((log, i) => {

                dataCopy.all_logs.push({
                    project: project,
                    pid: pid,
                    lid: "L_" + uuidv4(),
                    day: log.day,
                    start: log.start,
                    end: log.end,
                    duration: log.end - log.start,
                    running: false
                })

            })

        } else {
            dataCopy.all_logs[runningIndex].running = false
            dataCopy.all_logs[runningIndex].end = end
            dataCopy.all_logs[runningIndex].duration = end - start
        }

        screenProps.setData(dataCopy)
    }


    const [renderedAmount, setRenderedAmount] = useState(50)


    return (
        <View style={g.bodyWrapper}>
            <View
                style={g.body}
            >
                <Navbar {...{ navigation }} location={"Timeline"} />
                {
                    projectSelectionOpen && <ProjectSelection data={screenProps.data} {...{ navigation, setProjectSelectionOpen, startProject }} />
                }
                <View>
                    <ScrollView
                        ref={ref => { this.timelineScrollView = ref }}
                        onContentSizeChange={() => {
                            if (!contentsizeChanged) {
                                this.timelineScrollView.scrollToEnd({ animated: true })
                                contentsizeChanged = true
                            }
                        }}
                    >
                        {
                            screenProps.data.projects.length === 0 &&
                        <>
                            <Spacer height={200} />
                            <TouchableOpacity style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                                onPress={() => navigation.navigate("AddProject")}>
                                <ProjectIcons figure={"projectplaceholder"} />
                            </TouchableOpacity>
                        </>
                        }
                        {
                            screenProps.data.projects.length > 0 &&
                            <Spacer height={70} />
                        }
                        <Spacer height={50} />
                        {
                            screenProps.data.reversed_daily_logs.length > renderedAmount &&
                            <TouchableOpacity
                                style={{
                                    width: "100%",
                                    margin: 10,
                                    padding: 10,
                                    paddingVertical: 10,
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    alignSelf: "center",
                                }}
                                onPress={() => { setRenderedAmount(renderedAmount + 50) }}
                            >
                                <Text style={{ fontSize: 16 }}>Show older logs</Text>
                            </TouchableOpacity>
                        }
                        {
                            screenProps.data.reversed_daily_logs.slice(screenProps.data.reversed_daily_logs.length - 1 - renderedAmount, screenProps.data.reversed_daily_logs.length - 1).map((dayData, i) => {
                                if (dayData.day !== Math.floor(Math.round(new Date().getTime() / 1000) / 60 / 60 / 24))
                                    return <TimelineDay key={"dayContainer" + dayData.day} startProject={startProject} {...{ navigation, dayData }} />
                                else return
                            })
                        }
                        {
                            <TimelineToday setProjectSelectionOpen={setProjectSelectionOpen} goal={screenProps.settings.daily_goal} stopProject={stopProject} startProject={startProject} projects={screenProps.data.projects} {...{ navigation }} />
                        }
                        {
                            Platform.OS === 'ios' &&
                            <Spacer height={20} />
                        }
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}