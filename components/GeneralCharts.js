import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { VictoryBar, VictoryStack, VictoryChart, VictoryLine, VictoryArea } from 'victory-native';
import g, { p } from '../styles/global';


export default function GeneralCharts({ analysedData }) {

    const [selectedChart, setSelectedChart] = useState("bar")




    return (
        <View style={s.generalChartsContainer}>

            <View style={s.generalChartsView}>
                {
                    selectedChart === "bar" &&
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
                }
                {
                    selectedChart === "line" &&
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
                    </VictoryChart>
                }
                {
                    selectedChart === "area" &&
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
                }
            </View>
            <View style={s.generalChartsButtonContainer}>
                <TouchableOpacity style={s.generalChartsButton} onPress={()=>setSelectedChart("bar")}>
                    <Text style={g.text}>Bar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.generalChartsButton} onPress={()=>setSelectedChart("line")}>
                    <Text style={g.text}>Line</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.generalChartsButton} onPress={()=>setSelectedChart("area")}>
                    <Text style={g.text}>Area</Text>
                </TouchableOpacity>


            </View>
        </View>
    )
}


const s = StyleSheet.create({
    generalChartsButtonContainer:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
    },
    generalChartsButton:{
        backgroundColor: p.bg2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10,
        borderRadius: p.br
    }
})
