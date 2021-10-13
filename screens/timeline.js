import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from "react-native"
import gs from '../styles/global'
import { DefaultText } from '../components/components'
import ProjectSelection from "../components/projectSelection"


export default function Home({ navigation, screenProps }) {



  const [projectSelectionOpen, setProjectSelectionOpen] = useState(false)
  /*
  if(navigation.getParam("closeProjectSelection")){
    navigation.setParams({closeProjectSelection: false})
    console.log("a: "+navigation.getParam("closeProjectSelection"))
    setProjectSelectionOpen(false)
  }
  */


  const startProject = (projectIndex) => {
    console.log(projectIndex)
  }


  return (
    <View style={gs.container}>
      <Button title="Go" onPress={() => setProjectSelectionOpen(true)} />
      {
        projectSelectionOpen && <ProjectSelection data={screenProps.data} {...{ navigation, setProjectSelectionOpen, startProject}} />
      }
    </View>
  );
}
