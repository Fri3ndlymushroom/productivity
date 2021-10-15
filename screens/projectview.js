import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native'
import g from "../styles/global"
import { secondsToTimeString , secondsToFormatedString, secondsToDateString} from '../js/timerfunctions';

export default function ProjectView({ navigation, screenProps }) {
   let projectName = navigation.getParam("projectViewProject")
   let projectIndex = screenProps.data.projects.findIndex((project) => project.name === projectName)
   let projectData = screenProps.data.projects[projectIndex]


   let lastDay = 0
   return (

      <View style={g.container}>
         <Text style={g.text}>{projectName}</Text>
         {
            projectData.logs.map((log) => {

               let logs = null


               if (lastDay !== log.day) {
                  logs = (
                     <View key={"projectViewLog" + log.start}>
                        <Text style={g.dayTitle}>{secondsToDateString(log.start)}</Text>
                        <View style={g.projectContainer}>

                           <Text style={g.text}>{secondsToTimeString(log.start)} - {secondsToTimeString(log.end)}</Text>

                           <Text style={g.text}>{secondsToFormatedString(log.duration)}</Text>
                        </View>
                     </View>
                  )
               } else {
                  logs = (
                     <View key={"projectViewLog" + log.start}>
                        <View style={g.projectContainer}>
                           <Text style={g.text}>{secondsToTimeString(log.start)} - {secondsToTimeString(log.end)}</Text>
                           <Text style={g.text} >{secondsToFormatedString(log.duration)}</Text>
                        </View>
                     </View>
                  )

               }

               lastDay = log.day

               return (
                  logs
               )


            })
         }
      </View >
   )
}


const styles = StyleSheet.create({})
