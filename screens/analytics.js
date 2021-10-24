import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import g from '../styles/global'
import { DefaultText } from '../components/Components'
import { LineChart, StackedBarChart } from "react-native-chart-kit"
import getAnalytics from "../js/analysis"

let dummy_data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
            ]
        }
    ]
}

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
            gap: 50400,
            view: "bar"
        }

    }

    let analysedData = getAnalytics(screenProps.data, settings)



    return (
        <View style={g.body}>
            <DefaultText>Analytics</DefaultText>
            <LineChart
                data={dummy_data}
                width={Dimensions.get("window").width}
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1}
                chartConfig={config}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />

            <StackedBarChart
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
                data={analysedData.general_chart.bar}
                width={Dimensions.get("window").width}
                height={220}
                chartConfig={config}
                withHorizontalLabels={false}
                showValuesOnTopOfBars={false}
            />


        </View>
    );
}
