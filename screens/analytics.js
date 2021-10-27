import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Dimensions, ScrollView } from 'react-native';
import g from '../styles/global'
import { DefaultText } from '../components/Components'
import getAnalytics from "../js/analysis"
import { VictoryBar, VictoryStack, VictoryChart, VictoryLine, VictoryArea, VictoryPie } from 'victory-native';

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
                <VictoryPie
                    colorScale={analysedData.distribution_chart.colors}
                    data={analysedData.distribution_chart.data}
                />

                <VictoryStack
                    colorScale={analysedData.general_chart.bar.colors}
                >
                    {
                        analysedData.general_chart.bar.data.map((data, i) => {
                            return <VictoryBar
                                key={"general_chart-bar" + i}
                                data={data}

                            />
                        })
                    }

                </VictoryStack>
                <VictoryStack
                    colorScale={analysedData.general_chart.bar.colors}
                >
                    {
                        analysedData.general_chart.bar.data.map((data, i) => {
                            return <VictoryArea
                                key={"general_chart-bar" + i}
                                data={data}

                            />
                        })
                    }
                </VictoryStack>
                {

                    <VictoryChart>
                        {
                            analysedData.general_chart.line.data.map((data, i) => {
                                return (<VictoryLine
                                    key={"general_chart-line" + i}
                                    data={data}
                                    interpolation="natural"
                                />)
                            })
                        }

                    </VictoryChart>}
            </ScrollView>
        </View>
    );
}
