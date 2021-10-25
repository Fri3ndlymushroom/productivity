import React, { useState } from 'react';
import { Button, Text, View } from "react-native"
import g from '../styles/global'
import { DefaultText } from '../components/Components'
import ProjectSelection from "../components/ProjectSelection"
import TimelineDay from '../components/TimelineDay';
import StartButton from '../components/StartButton';
import { v4 as uuidv4 } from 'uuid';
import getAnalytics from "../js/analysis"


export default function Timeline({ navigation, screenProps }) {


    const settings = {
        general_chart: {
            time: 604800, // week
            gap: 86400,
            view: "bar"
        }

    }

    let analysedData = getAnalytics(screenProps.data, settings)

    const [projectSelectionOpen, setProjectSelectionOpen] = useState(false)



    const startProject = (pid) => {

        let copy = { ...screenProps.data }

        let start = Math.round(new Date().getTime() / 1000)
        let name = copy.projects.filter((projectRef)=>projectRef.pid === pid)[0].name

        copy.all_logs.push({
            project: name,
            pid: pid,
            lid: "L_"+uuidv4(),
            day: Math.floor(start / 60 / 60 / 24),
            start: start,
            duration: 0,
            running: true
        })

        screenProps.setData(copy)
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
            {
                screenProps.data.daily_logs.map((dayData) => {
                    return <TimelineDay key={"dayContainer" + dayData.day} {...{ navigation, dayData }} />
                })
            }
        </View>
    );
}