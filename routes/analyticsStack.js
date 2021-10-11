import { createStackNavigator } from "react-navigation-stack";

import Analytics from "../screens/analytics"

import {headerStyle} from "../styles/global"

const screens = {
    Analytics: {
        screen: Analytics,
        navigationOptions: {headerStyle: headerStyle}
    }
}

const AnalyticsStack = createStackNavigator(screens);

export default AnalyticsStack