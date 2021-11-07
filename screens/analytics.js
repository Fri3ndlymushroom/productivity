import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Dimensions, ScrollView } from 'react-native';
import g from '../styles/global'
import { DefaultText } from '../components/Components'
import getAnalytics from "../js/analysis"
import { VictoryPie } from 'victory-native';
import GeneralCharts from "../components/GeneralCharts"

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


    return (
        <View style={g.body}>
            <ScrollView>
            <GeneralCharts analysedData={analysedData} />
                <VictoryPie
                    colorScale={analysedData.distribution_chart.colors}
                    data={analysedData.distribution_chart.data}
                />

            </ScrollView>
        </View>
    );
}
