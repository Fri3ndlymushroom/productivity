import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { VictoryBar, VictoryStack, VictoryChart, VictoryLine, VictoryArea, VictoryAxis, VictoryLabel } from 'victory-native';
import g, { p } from '../styles/global';


export default function GeneralCharts({ analysedData, setSelectedTime }) {

    const [selectedChart, setSelectedChart] = useState("bar")






    return (
        <View style={s.generalChartsContainer}>

            <View style={s.generalChartsView}>
                <VictoryChart
                    width={300}
                    padding={30}
                >
                    <VictoryAxis
                        tickLabelComponent={<VictoryLabel dy={0} dx={0} angle={0} />}
                        style={{
                            axis: {
                                stroke: p.bg2  //CHANGE COLOR OF X-AXIS
                            },
                            tickLabels: {
                                fill: p.text__dim //CHANGE COLOR OF X-AXIS LABELS
                            }
                        }}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(y) => y}
                        style={{
                            axis: {
                                stroke: p.bg2  //CHANGE COLOR OF Y-AXIS
                            },
                            tickLabels: {
                                fill: p.text__dim //CHANGE COLOR OF Y-AXIS LABELS
                            }
                        }}
                    />
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
                </VictoryChart>
            </View>
            <View style={s.generalChartsButtonContainer}>
                <TouchableOpacity style={s.generalChartsButton} onPress={() => setSelectedChart("bar")}>
                    <Text style={g.text}>Bar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.generalChartsButton} onPress={() => setSelectedChart("line")}>
                    <Text style={g.text}>Line</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.generalChartsButton} onPress={() => setSelectedChart("area")}>
                    <Text style={g.text}>Area</Text>
                </TouchableOpacity>
            </View>
            <View style={s.generalChartsButtonContainer}>
                <TouchableOpacity style={s.generalChartsButton} onPress={() =>setSelectedTime({time: 604800,gap: 86400}) }>
                    <Text style={g.text}>Week</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.generalChartsButton} onPress={() => setSelectedTime({time: 2592000, gap: 86400})}>
                    <Text style={g.text}>Month</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.generalChartsButton} onPress={() => setSelectedTime({time: 31536000,gap: 2628000,})}>
                    <Text style={g.text}>Year</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const s = StyleSheet.create({
    generalChartsButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
    },
    generalChartsButton: {
        backgroundColor: p.bg2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10,
        borderRadius: p.br
    },
    generalChartsView: {
        backgroundColor: p.bg2,
        width: 300,
        borderRadius: p.br
    },
    generalChartsContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
})
