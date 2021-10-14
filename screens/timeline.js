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
  /*
  if(navigation.getParam("closeProjectSelection")){
    navigation.setParams({closeProjectSelection: false})
    console.log("a: "+navigation.getParam("closeProjectSelection"))
    setProjectSelectionOpen(false)
  }
  */


  const startProject = (project) => {

    let copy = { ...screenProps.data }

    copy.running.running = true
    copy.running.start = new Date().getTime()
    copy.running.project = project

    screenProps.setData(copy)

  }

  const stopProject = () =>{
    
  }


  return (
    <View style={gs.container}>
      <StartButton data={screenProps.data} {...{ setProjectSelectionOpen, stopProject }} />
      {
        projectSelectionOpen && <ProjectSelection data={screenProps.data} {...{ navigation, setProjectSelectionOpen, startProject }} />
      }
      {
        screenProps.data.daily_logs.map((dayData) => {
          return <TimelineDay {...{ dayData }} />
        })
      }
    </View>
  );
}
