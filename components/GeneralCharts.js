import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { VictoryBar, VictoryStack, VictoryChart, VictoryLine, VictoryArea, VictoryAxis, VictoryLabel } from 'victory-native';
import g, { p } from '../styles/global';



export default function GeneralCharts({ analysedData, setSelectedTime, dailyAverage }) {

    const [selectedChart, setSelectedChart] = useState("bar")






    return (
        <View style={s.generalChartsContainer}>

            <View style={s.generalChartsView}>
                <View style={s.dailyAverageContainer}>
                    <Text style={s.dailyAverageHeader}>Daily Average</Text>
                    <Text style={s.dailyAverageValue}>{dailyAverage}</Text>
                </View>
                <VictoryChart
                    height={250}
                    width={300}
                >
                    <VictoryAxis
                        tickLabelComponent={<VictoryLabel dy={0} dx={0} angle={0} />}
                        style={{
                            axis: {
                                stroke: p.bg2  //CHANGE COLOR OF X-AXIS
                            },
                            tickLabels: {
                                fill: p.text__dim, //CHANGE COLOR OF X-AXIS LABELS
                                fontSize: 10
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
                                fill: p.text__dim, //CHANGE COLOR OF X-AXIS LABELS
                                fontSize: 10
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
                                        cornerRadius={{
                                            topLeft: 2,
                                            topRight: 2,
                                            bottomLeft: 2,
                                            bottomRight: 2,
                                        }}
                                        animate={{
                                            duration: 2000,
                                            onLoad: { duration: 1000 }
                                        }}
                                    />
                                })
                            }

                        </VictoryStack>
                    }
                    {
                        selectedChart === "line" &&
                        analysedData.general_chart.line.data.map((data, i) => {
                            let colors = [p.hl, "white", "gray"]


                            return (<VictoryLine
                                key={"general_chart-line" + i}
                                data={data}
                                interpolation="natural"
                                animate={{
                                    duration: 2000,
                                    onLoad: { duration: 1000 }
                                }}
                                style={{ data: { stroke: colors[i] } }}
                            />)
                        })
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
                                        animate={{
                                            duration: 2000,
                                            onLoad: { duration: 1000 }
                                        }}
                                        interpolation="natural"
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
                <TouchableOpacity style={s.generalChartsButton} onPress={() => setSelectedTime({ time: 604800, gap: 86400 })}>
                    <Text style={g.text}>Week</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.generalChartsButton} onPress={() => setSelectedTime({ time: 2592000, gap: 86400 })}>
                    <Text style={g.text}>Month</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.generalChartsButton} onPress={() => setSelectedTime({ time: 31536000, gap: 2628000, })}>
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
        borderRadius: p.br,
        width: 80,
        marginVertical: 5,
        paddingVertical: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    generalChartsView: {
        backgroundColor: p.bg2,
        width: "80%",
        borderRadius: p.br
    },
    generalChartsContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    dailyAverageContainer: {
        marginTop: 20,
        marginLeft: 20
    },
    dailyAverageHeader:{
        fontSize: 11,
        color: p.text__dim
    },
    dailyAverageValue:{
        fontSize: 18,
        color: p.text__main
    }
})
