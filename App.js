import React, {useState} from 'react';
import RootNavigator from './routes/draw'


export default function App() {

  const [data, setData] = useState({
    projects: [
      {
        name: "MMonitor",
        trackings: [
        ]
      },
      {
        name: "HyperTyper",
        trackings: [
        ]
      }
    ]
  })


  return (
    <RootNavigator screenProps={{ ...{data, setData} }} />
  );
}


// packages:
// react-navigation
// react-native-gesture-handler
// react-native-reanimated
// react-native-screens
// react-navigation-stack
// react-navigation-drawer