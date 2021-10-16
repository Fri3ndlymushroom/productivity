import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import g from "../styles/global"
import { secondsToShortTimeString, secondsToFormatedString, secondsToDateString } from '../js/timerfunctions';

export default function ProjectView({ navigation, screenProps }) {
   let projectName = navigation.getParam("projectViewProject")
   let projectIndex = screenProps.data.projects.findIndex((project) => project.name === projectName)
   let projectData = screenProps.data.projects[projectIndex]
   let lastDay = 0

   const addLog = () =>{
      let copy = {...screenProps.data}
      let start = Math.round(new Date().getTime() / 1000)
      copy.all_logs.push({
         project: projectName,
         day: Math.ceil(start / 60 / 60 / 24),
         start: start,
         duration: 600,
         end: start+600,
         running: false,
      })
      screenProps.setData(copy)
   }


   return (

      <View style={g.body}>
         <Text style={g.text}>{projectName}</Text>
         <Button title="add" onPress={()=>addLog()}/>
         {
            projectData.logs.map((log) => {

               let logs = null

               let card = (
                  <TouchableOpacity onPress={() => { navigation.navigate("EditLog", { edited_log: log }) }} style={g.projectCard}>
                     <Text style={g.text}>{secondsToShortTimeString(log.start)} - {secondsToShortTimeString(log.end)}</Text>
                     <Text style={g.text}>{secondsToFormatedString(log.duration)}</Text>
                  </TouchableOpacity>
               )


               if (lastDay !== log.day) {
                  logs = (
                     <View key={"projectViewLog" + log.start}>
                        <Text style={g.dayTitle}>{secondsToDateString(log.start)}</Text>
                        {card}
                     </View>
                  )
               } else {
                  logs = (
                     <View key={"projectViewLog" + log.start}>
                        {card}
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

