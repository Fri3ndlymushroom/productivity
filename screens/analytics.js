import { StatusBar } from 'expo-status-bar';
import { Button } from "react-native"
import React from 'react';
import { Text, View } from 'react-native';
import gs from '../styles/global'
import {DefaultText} from '../components/components'

export default function Analytics({ navigation }) {
  return (
    <View style={gs.container}>
      <DefaultText>Analytics</DefaultText>
      <StatusBar style="auto" />
    </View>
  );
}
