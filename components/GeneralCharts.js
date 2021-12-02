import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { VictoryBar, VictoryStack, VictoryChart, VictoryLine, VictoryArea, VictoryAxis, VictoryLabel } from 'victory-native';
import g, { p } from '../styles/global';
import { eachMonthOfInterval, eachWeekOfInterval, eachDayOfInterval, eachYearOfInterval, sub, add, format, fromUnixTime } from "date-fns"
import { formatSeconds } from "../js/timerfunctions"


export default function GeneralCharts({ dailyAverage, data }) {

    const [selectedChart, setSelectedChart] = useState("bar")
    const [selectedTime, setSelectedTime] = useState({
        start: sub(new Date(), { months: 10 }),
        end: new Date,
    })

    let chartsData = getChartsData(data, selectedTime)


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
                            colorScale={chartsData.bar.colors}
                        >
                            {
                                chartsData.bar.data.map((data, i) => {

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
                        chartsData.line.data.map((data, i) => {
                            let colors = ["gray", "white", p.hl]


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
                            colorScale={chartsData.bar.colors}
                        >
                            {
                                chartsData.bar.data.map((data, i) => {
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
                <TouchableOpacity style={s.generalChartsButton} onPress={() => setSelectedTime({ end: new Date(), start: sub(new Date(), { days: 5 }) })}>
                    <Text style={g.text}>Week</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.generalChartsButton} onPress={() => setSelectedTime({ end: new Date(), start: add(sub(new Date(), { months: 1 }), { days: 2 }) })}>
                    <Text style={g.text}>Month</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.generalChartsButton} onPress={() => setSelectedTime({ end: new Date(), start: sub(new Date(), { months: 10 }) })}>
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
    dailyAverageHeader: {
        fontSize: 11,
        color: p.text__dim
    },
    dailyAverageValue: {
        fontSize: 18,
        color: p.text__main
    }
})









const getChartsData = (data, settings) => {
    let start = settings.start
    let end = settings.end



    let barData = getBarData(data, start, end)
    let lineData = getLineData(data, start, end)
    return { bar: barData, line: lineData }
}

const getLineData = (data, start, end) => {

    let currentStart = start
    let currentEnd = end
    let currentInfo = getTimeFrame(currentStart, currentEnd)

    let distance = Math.round(currentInfo.frames[currentInfo.frames.length-1].to - currentInfo.frames[0].from)
    let lastStart = sub(start, { seconds: distance })
    let lastEnd = sub(end, { seconds: distance })
    let lastInfo = getTimeFrame(lastStart, lastEnd)

    let averageStart = fromUnixTime(data.all_logs[data.all_logs.length-1].start)
    let averageEnd =  new Date()
    let averageInfo = getTimeFrame(averageStart, averageEnd, "w")

    let currentLine = currentInfo.frames.map((frame) => {
        return (
            {
                x: format(new Date(frame.from * 1000), currentInfo.label_format),
                y: data.all_logs.filter((log) => (log.start >= frame.from && log.start < frame.to)).reduce((sum, log) => sum += log.duration, 0)
            }
        )
    })

    let lastLine = lastInfo.frames.map((frame) => {
        return (
            {
                x: format(new Date(frame.from * 1000), lastInfo.label_format),
                y: data.all_logs.filter((log) => (log.start >= frame.from && log.start < frame.to)).reduce((sum, log) => sum += log.duration, 0)
            }
        )
    })

    let grouped = averageInfo.frames.map((frame, i) => {
        return (
            {
                x: format(new Date(frame.from * 1000), lastInfo.label_format),
                y: data.all_logs.filter((log) => (log.start >= frame.from && log.start < frame.to)).reduce((sum, log) => sum += log.duration, 0)
            }
        )
    })




    let averageLine = currentLine.map(point=>{
        return{
            x: point.x,
            y: 0
        }
    })

    let i = currentInfo.frames.length - 1
    grouped.reverse().forEach((frame) => {
        averageLine[i].y += frame.y / averageInfo.frames.length
        if (i === 0) i = currentInfo.frames.length - 1
        else i--
    })

    

    data = [averageLine, lastLine, currentLine]

    return {
        data: data
    }

}

const getBarData = (data, start, end) => {
    let info = getTimeFrame(start, end)


    info.frames.forEach((frame, i) => {
        info.frames[i].logs = data.all_logs.filter((log) => (log.start >= frame.from && log.start < frame.to))
    })

    let projects = data.projects.map((project) => project.pid)
    info.colors = data.projects.map((project) => project.color)
    info.labels = info.frames.map((frame) => format(new Date(frame.from * 1000), info.label_format))

    info.data = info.frames.map((frame) => {

        return projects.map(project => {
            return {
                y: frame.logs.filter(log => log.pid === project).reduce((sum, log) => sum += log.duration, 0),
                x: format(new Date(frame.from * 1000), info.label_format)
            }
        })
    })

    let turned = projects.map((project, i) => {
        return (info.data.map((dataPoint) => dataPoint[i]))
    })

    info.data = turned

    return info
}


const getTimeFrame = (start, end, format="") => {

    let distance = Math.round((end.getTime() - start.getTime()) / 1000)


    if ((distance <= 604800 && format === "") || format==="w") {
        // Week
        var labelFormat = "eeeeee"
        var frames = eachDayOfInterval({
            start: sub(start, { days: 1 }),
            end: add(end, { days: 1 })
        })
    } else if ((distance <= 2678400&& format === "") || format==="m") {
        // Month
        var labelFormat = "dd"
        var frames = eachDayOfInterval({
            start: sub(start, { days: 1 }),
            end: add(end, { days: 1 })
        })
    } else if ((distance <= 31536000&& format === "") || format==="y") {
        // Year
        var labelFormat = "LLL"
        var frames = eachMonthOfInterval({
            start: sub(start, { months: 1 }),
            end: add(end, { months: 1 })
        })
    } else {
        // Lifetime
        var labelFormat = "yyyy"
        var frames = eachYearOfInterval({
            start: sub(start, { years: 1 }),
            end: add(end, { years: 1 })
        })
    }




    let info = {
        label_format: labelFormat,
        frames: frames.map((date, i) => {
            if (i !== frames.length - 1)
                return {
                    from: date.getTime() / 1000,
                    to: frames[i + 1].getTime() / 1000,
                    string: date.toString() + " to " + frames[i + 1].toString()
                }
        })
    }

    info.frames.pop()

    return info
}


const getUTCDate = (date) => {
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

    return new Date(now_utc);
}