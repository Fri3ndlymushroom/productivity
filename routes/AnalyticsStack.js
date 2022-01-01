import { createStackNavigator } from "react-navigation-stack";

import Analytics from "../screens/Analytics"

import {headerStyle} from "../styles/global"

const navigationOptions = {

    headerStyle: headerStyle,
    headerTintColor: '#fff',
    headerTitleStyle: {
    }, 
    headerShown: false

}

const screens = {
    Analytics: {
        screen: Analytics,
        navigationOptions: navigationOptions
    }
}

const AnalyticsStack = createStackNavigator(screens);

export default AnalyticsStack