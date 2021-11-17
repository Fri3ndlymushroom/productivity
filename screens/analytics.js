import { StatusBar } from 'expo-status-bar';
import React, {useState}from 'react';
import { Text, View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import g, { p } from '../styles/global'
import { DefaultText } from '../components/Components'
import getAnalytics from "../js/analysis"
import { VictoryPie } from 'victory-native';
import GeneralCharts from "../components/GeneralCharts"
import Navbar from '../components/NavbarDrawer';
import TimePeriodAnalysis from '../components/TimePeriodAnalysis';
import BestDayOfWeek from '../components/BestDayOfWeek';
import WeekComparison from '../components/WeekComparison';
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

    const [selectedTime, setSelectedTime] = useState({
        time: 31536000, 
        gap: 2628000,
    })


    const settings = {
        general_chart: {
            time: selectedTime.time, // week
            gap: selectedTime.gap,
            view: "bar"
        }
    }


    let analysedData = getAnalytics(screenProps.data, settings)


    return (
        <View style={g.body}>
            <Navbar {...{ navigation }} location={"Analytics"} />
            <ScrollView>
                <View style={g.navbarTopMargin}></View>
                {/* info grid */}
                <View style={s.infoGrid}>
                    <View style={[s.infoGridItem, s.infoGridItem1]}>
                        <VictoryPie
                            colorScale={analysedData.distribution_chart.colors}
                            data={analysedData.distribution_chart.data}
                            width={150}
                            height={150}
                            radius={60}
                            cornerRadius={4}
                            innerRadius={40}
                            style={{
                                labels: {
                                    fill: "#00000000"
                                }
                            }}
                        />
                    </View>
                    <View style={[s.infoGridItem, s.infoGridItem2]}>
                        <BestDayOfWeek data={screenProps.data}/>
                    </View>
                    <View style={[s.infoGridItem, s.infoGridItem3]}>
                        <TimePeriodAnalysis data={screenProps.data} settings={screenProps.settings}/>
                    </View>
                    <View style={[s.infoGridItem, s.infoGridItem4]}>
                       <WeekComparison data={screenProps.data} settings={screenProps.settings}/>
                    </View>

                </View>

                {/* general chart */}
                <GeneralCharts analysedData={analysedData}  setSelectedTime={setSelectedTime}/>


            </ScrollView>
        </View>
    );
}


const s = StyleSheet.create({
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
    infoGridItem1:{
        height: 150,
    },
    infoGridItem2:{
        height: 100
    },
    infoGridItem3:{
        height: 170,
    },
    infoGridItem4:{
        height: 80
    }
})
