import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import g from '../styles/global'
import { DefaultText } from '../components/Components'
import getAnalytics from "../js/analysis"
import { VictoryBar, VictoryStack } from 'victory';

let config = {

    backgroundColor: "white",
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
    }
}


export default function Analytics({ navigation, screenProps }) {


    const settings = {
        general_chart: {
            time: 604800, // week
            gap: 86400,
            view: "bar"
        }

    }

    
    
    let analysedData = getAnalytics(screenProps.data, settings)

    console.log(analysedData)

    return (
        <View style={g.body}>
            <DefaultText>Analytics</DefaultText>

            <VictoryStack
                colorScale={["tomato", "orange", "gold", "yellow" , "pink"]}
            >
                {
                    analysedData.general_chart.bar.data.map((data, i) => {
                        console.log(data)
                        return <VictoryBar
                            key={"general_chart-bar"+i}
                            data={data}
                            
                        />
                    }
                    )
                }

            </VictoryStack>

        </View>
    );
}
