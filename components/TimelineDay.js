import React from 'react'
import { StyleSheet, Text, Touchable, View, TouchableOpacity } from 'react-native'
import g, { p } from "../styles/global"
import { secondsToFormatedString, secondsToDateString } from '../js/timerfunctions'

export default function TimelineDay({ dayData, navigation }) {

   return (
      <View style={s.dayContainer} >
         <Text style={g.dayTitle}>{secondsToDateString(dayData.day * 24*60*60)}</Text>
         {
            dayData.projects.map((project) => {

               return (
                  <TouchableOpacity onPress={() => navigation.navigate("ProjectView", { projectViewProject: project.name })} key={"day" + dayData.day + "project" + project.name} style={g.projectContainer}>
                     <Text style={g.text}>{project.name}</Text>
                     <Text style={g.text}>{secondsToFormatedString(project.total_duration)}</Text>
                  </TouchableOpacity>

               )
            })
         }
      </View>
   )
}

const s = StyleSheet.create({
   dayContainer: {
      marginBottom: "30px",
      marginHorizontal: "60px"
   },

})
