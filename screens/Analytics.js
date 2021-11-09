import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import g, { p } from '../styles/global'
import { DefaultText } from '../components/Components'
import getAnalytics from "../js/analysis"
import { VictoryPie } from 'victory-native';
import GeneralCharts from "../components/GeneralCharts"
import Navbar from '../components/NavbarDrawer';
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
            <Navbar {...{ navigation }} location={"Analytics"} />
            <ScrollView>
                <View style={g.navbarTopMargin}></View>
                <GeneralCharts analysedData={analysedData} />
                <View style={s.infoGrid}>
                    <View style={[s.infoGridItem]}>
                        <VictoryPie
                            colorScale={analysedData.distribution_chart.colors}
                            data={analysedData.distribution_chart.data}
                            width={250}
                            height={250}
                            labelRadius={({ innerRadius }) => innerRadius + 30 }
                        />
                    </View>
                    <View style={[s.infoGridItem, s.statsParent]}>
                        <Text style={s.statsText}>
                            stat
                        </Text>
                        <Text style={s.statsText}>
                            stat
                        </Text>
                        <Text style={s.statsText}>
                            stat
                        </Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}


const s = StyleSheet.create({
    infoGrid: {
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    infoGridItem: {
        width: '45%',
        margin: "2.5%",
        alignContent: "center",
        alignItems: "center"
    },
    statsParent:{
        display: "flex",
    },
    statsText:{
        color: p.text__main,
        margin: 30
    }
})
