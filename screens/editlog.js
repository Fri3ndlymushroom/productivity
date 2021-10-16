import React, { useState } from 'react';
import { Button, Text, View } from "react-native"
import g from '../styles/global'


export default function EditLog({ navigation, screenProps }) {

   let log = navigation.getParam("edited_log")

   return (
      <View style={g.container}>

         <Text style={g.text}>Info:</Text>
         <Text style={g.text}>name: {log.project}</Text>
         <Text style={g.text}>start: {log.start}</Text>
         <Text style={g.text}>end: {log.end}</Text>
         <Text style={g.text}>duration: {log.duration}</Text>

      </View>
   );
}
