import React, { useState } from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from "react-native"
import g from '../styles/global'
import DateTimePicker from '@react-native-community/datetimepicker';
import { secondsToFormatedString, secondsToShortTimeString, secondsToDateString } from '../js/timerfunctions';
import { LongPressGestureHandler } from 'react-native-gesture-handler';


export default function EditLog({ navigation, screenProps }) {

   let log = navigation.getParam("edited_log")



   const editLog = () => {

   }

   const add10ToLog = (type, value) => {
      let copy = { ...screenProps.data }


      let index = copy.all_logs.findIndex((fit) => fit.start === log.start && fit.end === log.end && fit.project === log.project)

      if (type === "end") {
         copy.all_logs[index].end += value
      } else if (type === "start") {
         copy.all_logs[index].start += value
      }

      copy.all_logs[index].duration = copy.all_logs[index].end - copy.all_logs[index].start


      if (copy.all_logs[index].duration > 0)
         screenProps.setData(copy)
   }




   return (
      <View style={g.body}>

         <DateTimePicker
            testID="dateTimePicker"
            value={new Date(log.start)}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={() => editLog()}
         />
         <TouchableOpacity><Text>Date: {secondsToDateString(log.start)}</Text></TouchableOpacity>
         <Text>{secondsToFormatedString(log.duration)}</Text>
         <View style={s.timeCorrector}>
            <TouchableOpacity onPress={() => add10ToLog("start", -600)}><Text>-</Text></TouchableOpacity>
            <TouchableOpacity><Text>From: {secondsToShortTimeString(log.start)}</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => add10ToLog("start", 600)}><Text>+</Text></TouchableOpacity>
         </View>
         <View style={s.timeCorrector}>
            <TouchableOpacity onPress={() => add10ToLog("end", -600)}><Text>-</Text></TouchableOpacity>
            <TouchableOpacity><Text>To: {secondsToShortTimeString(log.end)}</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => add10ToLog("end", 600)}><Text>+</Text></TouchableOpacity>
         </View>
      </View>
   );
}
const s = StyleSheet.create({
   timeCorrector: {
      display: "flex",
      flexDirection: "row"
   }
});
