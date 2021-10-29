import React, { useState } from 'react';
import { ScrollView, Button, Text, View } from "react-native"
import g from '../styles/global'
import { DefaultText } from '../components/Components'
import ProjectSelection from "../components/ProjectSelection"
import TimelineDay from '../components/TimelineDay';
import StartButton from '../components/StartButton';
import { v4 as uuidv4 } from 'uuid';
import { copyObject } from '../js/functions';
import TimelineToday from "../components/TimelineToday"


export default function Timeline({ navigation, screenProps }) {


    const settings = {
        general_chart: {
            time: 604800, // week
            gap: 86400,
            view: "bar"
        }

    }


    const [projectSelectionOpen, setProjectSelectionOpen] = useState(false)



    const startProject = (pid) => {

        let alreadyRunning = screenProps.data.all_logs.filter((log) => log.running).length > 0

        if (!alreadyRunning) {


            let copy = { ...screenProps.data }

            let start = Math.round(new Date().getTime() / 1000)
            let name = copy.projects.filter((projectRef) => projectRef.pid === pid)[0].name

            copy.all_logs.push({
                project: name,
                pid: pid,
                lid: "L_" + uuidv4(),
                day: Math.floor((start - screenProps.settings.start_of_day) / 60 / 60 / 24),
                start: start,
                duration: 0,
                running: true
            })

            screenProps.setData(copy)
        }
    }

    const stopProject = () => {
        let dataCopy = { ...screenProps.data }

        let runningIndex = dataCopy.all_logs.findIndex((log) => log.running === true)

        let end = Math.round(new Date().getTime() / 1000)
        let start = dataCopy.all_logs[runningIndex].start

        dataCopy.all_logs[runningIndex].running = false
        dataCopy.all_logs[runningIndex].end = end
        dataCopy.all_logs[runningIndex].duration = end - start


        screenProps.setData(dataCopy)

    }
    return (
        <View style={g.body}>
            <StartButton data={screenProps.data} {...{ setProjectSelectionOpen, stopProject }} />
            {
                projectSelectionOpen && <ProjectSelection data={screenProps.data} {...{ navigation, setProjectSelectionOpen, startProject }} />
            }
            <ScrollView
                ref={ref => {this.timelineScrollView = ref}}
                onContentSizeChange={() => this.timelineScrollView.scrollToEnd({animated: true})}
            >
                {
                    screenProps.data.reversed_daily_logs.map((dayData, i) => {
                        if(screenProps.data.reversed_daily_logs.length -1 !== i)
                            return <TimelineDay key={"dayContainer" + dayData.day} startProject={startProject} {...{ navigation, dayData }} />
                        else return
                    })
                }
                {
                <TimelineToday stopProject={stopProject} startProject={startProject} projects={screenProps.data.projects} {...{navigation}}/>
                }
            </ScrollView>
        </View>
    );
}
