import { StatusBar } from 'expo-status-bar';
import {Button} from "react-native"
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Home({navigation}) {

    const pressHandeler = () =>{
        navigation.navigate("Home2")
    }



    return (
        <View style={styles.container}>
          <Text>Hello World</Text>
          <StatusBar style="auto" />
          <Button title="change" onPress={pressHandeler}/>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });