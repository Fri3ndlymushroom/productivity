import React from 'react';
import RootNavigator from './routes/draw'
import getUserData from "./data"

export default function App() {
  let data = getUserData()
  return (
      <RootNavigator screenProps={{data: data}}/>
  );
}


// packages:
// react-navigation
// react-native-gesture-handler
// react-native-reanimated
// react-native-screens
// react-navigation-stack
// react-navigation-drawer