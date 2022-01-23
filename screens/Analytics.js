import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import g, { p, gestureRecognizerConfig } from '../styles/global'
import { DefaultText } from '../components/Components'
import { VictoryPie } from 'victory-native';
import GeneralCharts from "../components/GeneralCharts"
import Navbar from '../components/NavbarDrawer';
import TimePeriodAnalysis from '../components/TimePeriodAnalysis';
import BestDayOfWeek from '../components/BestDayOfWeek';
import WeekComparison from '../components/WeekComparison';
import { formatSeconds } from "../js/timerfunctions"
import { Spacer } from '../components/Components'
import GestureRecognizer from 'react-native-swipe-gestures';




export default function Analytics({ navigation, screenProps }) {

    let allTime = Math.round(screenProps.data.all_logs.reduce((sum, log) => sum += log.duration / 60 / 60, 0))
    let dailyAverage = "0h 0min"
    try{
        let days = Math.floor(new Date().getTime() / 1000 / 60 / 60 / 24 - screenProps.data.all_logs[screenProps.data.all_logs.length - 1].day)
        dailyAverage = formatSeconds(Math.round(screenProps.data.all_logs.reduce((sum, log) => sum += log.duration, 0) / days), "HH'h' mm'min'")
    }catch{}


    let pieChartData = getPieChartData(screenProps.data)

    return (
        <View style={g.bodyWrapper}>
            <GestureRecognizer
                onSwipe={(direction, state) => { direction === "SWIPE_LEFT" ? navigation.navigate("Settings") : (direction === "SWIPE_RIGHT" ? navigation.navigate("Timeline") : null) }}
                config={gestureRecognizerConfig}
                style={g.body}
            >
                <Navbar {...{ navigation }} location={"Analytics"} />
                <ScrollView>
                    <View style={g.navbarTopMargin}></View>
                    {/* info grid */}
                    <View style={s.infoGrid}>
                        <View style={[s.infoGridItem, s.infoGridItem1]}>
                            <Text style={s.allTime}>{allTime}h</Text>
                            <VictoryPie
                                colorScale={pieChartData.colors}
                                data={pieChartData.data}
                                width={150}
                                height={150}
                                radius={60}
                                cornerRadius={5}
                                innerRadius={40}
                                padAngle={2}
                                style={{
                                    labels: {
                                        fill: "#00000000"
                                    }
                                }}
                            />
                        </View>
                        <View style={[s.infoGridItem, s.infoGridItem2]}>
                            <BestDayOfWeek data={screenProps.data} />
                        </View>
                        <View style={[s.infoGridItem, s.infoGridItem3]}>
                            <TimePeriodAnalysis data={screenProps.data} settings={screenProps.settings} />
                        </View>
                        <View style={[s.infoGridItem, s.infoGridItem4]}>
                            <WeekComparison data={screenProps.data} settings={screenProps.settings} />
                        </View>

                    </View>

                    {/* general chart */}
                    <GeneralCharts dailyAverage={dailyAverage} data={screenProps.data} />

                    <Spacer height={30} />
                </ScrollView>
            </GestureRecognizer>
        </View>
    );
}


const s = StyleSheet.create({
    allTime: {
        position: "absolute",
        color: p.text__main,
        top: "45%"
    },
    infoGrid: {
        display: "flex",
        flexDirection: 'column',
        flexWrap: 'wrap',
        position: "relative",
        maxHeight: 300,
        alignContent: "center"

    },
    infoGridItem: {
        maxWidth: '45%',
        width: 150,
        margin: "2.5%",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: p.bg2,
        borderRadius: p.br
    },
    statsParent: {
        display: "flex",
    },
    statsText: {
        color: p.text__main,
        margin: 30
    },
    infoGridItem1: {
        height: 150,
    },
    infoGridItem2: {
        height: 100
    },
    infoGridItem3: {
        height: 170,
    },
    infoGridItem4: {
        height: 80
    }
})



const getPieChartData = (data) => {

    let dataObj = {}
    let colors = []

    data.all_logs.forEach((log) => {
        if (!dataObj[log.project]) dataObj[log.project] = 0
        dataObj[log.project] += log.duration

        if (colors.filter((color) => color === log.color).length === 0) colors.push(log.color)
    })
    let dataArr = []

    for (let project in dataObj) {
        let info = dataObj[project]
        dataArr.push({ x: project, y: info })
    }

    let returnObj = {
        data: dataArr,
        colors: colors
    }

    return returnObj
}
