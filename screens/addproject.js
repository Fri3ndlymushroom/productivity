import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Text, View } from "react-native"
import g, { p } from '../styles/global'
import { DefaultText } from '../components/components'
import ProjectSelection from "../components/projectSelection"
import ColorPicker from 'react-native-wheel-color-picker'

export default function Home({ navigation, screenProps }) {

   const [newProjectName, setNewProjectName] = React.useState("");

   const addProject = () => {

      let copy = screenProps.data

      copy.refactored = false


      copy.projects.push({
         name: newProjectName,
         trackings: [
         ]
      })
      navigation.navigate("Timeline", { closeProjectSelection: true })

      screenProps.setData(copy)
   }

   return (
      <View style={g.body}>
         <View>
            <ColorPicker
               thumbSize={20}
               sliderSize={20}
               noSnap={true}
               row={false}
               onColorChangeComplete={(color) => { console.log(color) }}
            />
         </View>
         <TextInput
            style={s.input}
            onChangeText={setNewProjectName}
            value={newProjectName} />
         <Button title={"Add Project"} onPress={() => addProject()} />
      </View>
   );
}

const s = StyleSheet.create({
   input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
   },
});