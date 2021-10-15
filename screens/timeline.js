import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from "react-native"
import gs from '../styles/global'
import { DefaultText } from '../components/components'
import ProjectSelection from "../components/projectSelection"
import TimelineDay from '../components/TimelineDay';
import StartButton from '../components/StartButton';


export default function Home({ navigation, screenProps }) {


    const [projectSelectionOpen, setProjectSelectionOpen] = useState(false)



    const startProject = (project) => {

        let copy = { ...screenProps.data }

        let start = Math.round(new Date().getTime() / 1000)

        copy.all_logs.push({
            project: project,
            day: Math.ceil(start / 60 / 60 / 24),
            start: start,
            duration: 0,
            running: true,
        })

        screenProps.setData(copy)
    }

    const stopProject = () => {
        let dataCopy = { ...screenProps.data }

        let runningIndex = dataCopy.all_logs.findIndex((log)=>log.running === true)

        let end = Math.round(new Date().getTime() / 1000)
        let start = dataCopy.all_logs[runningIndex].start

        dataCopy.all_logs[runningIndex].running = false
        dataCopy.all_logs[runningIndex].end = end 
        dataCopy.all_logs[runningIndex].duration = end - start 


        screenProps.setData(dataCopy)

    }


    return (
        <View style={gs.container}>
            <StartButton data={screenProps.data} {...{ setProjectSelectionOpen, stopProject }} />
            {
                projectSelectionOpen && <ProjectSelection data={screenProps.data} {...{ navigation, setProjectSelectionOpen, startProject }} />
            }
            {
                screenProps.data.daily_logs.map((dayData) => {
                    return <TimelineDay key={"dayContainer" + dayData.day} {...{navigation, dayData }} />
                })
            }
        </View>
    );
}
