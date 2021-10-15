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

    let copy = { ...screenProps.timer }

    copy.running = true
    copy.start = new Date().getTime()
    copy.project = project


    screenProps.setTimer(copy)
  }

  const stopProject = () =>{

  }


  return (
    <View style={gs.container}>
      <StartButton timer={screenProps.timer} {...{ setProjectSelectionOpen, stopProject }} />
      {
        projectSelectionOpen && <ProjectSelection data={screenProps.data} {...{ navigation, setProjectSelectionOpen, startProject }} />
      }
      {
        screenProps.data.daily_logs.map((dayData) => {
          return <TimelineDay key={"dayContainer"+dayData.day} {...{ dayData }} />
        })
      }
    </View>
  );
}
