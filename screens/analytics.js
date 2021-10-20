import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import gs from '../styles/global'
import {DefaultText} from '../components/Components'

export default function Analytics({ navigation }) {
  return (
    <View style={gs.container}>
      <DefaultText>Analytics</DefaultText>
      <StatusBar style="auto" />
    </View>
  );
}
