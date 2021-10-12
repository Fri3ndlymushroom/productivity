import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from "react-native"
import gs from '../styles/global'
import { DefaultText } from '../components/components'
import ProjectSelection from "../components/projectSelection"

export default function Home({ navigation }) {


  return (
    <View style={gs.container}>
        <Text>Hello</Text>
    </View>
  );
}