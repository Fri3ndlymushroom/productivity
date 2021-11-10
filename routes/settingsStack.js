import { createStackNavigator } from "react-navigation-stack";

import {headerStyle} from "../styles/global"

import Settings from "../screens/Settings";
import Backups from "../screens/Backups"

const navigationOptions = {

    headerStyle: headerStyle,
    headerTintColor: '#fff',
    headerTitleStyle: {
    }, 
    headerShown: false

}

const screens = {
    Settings: {
        screen: Settings,
        navigationOptions: navigationOptions
    },
    Backups: {
        screen: Backups,
        navigationOptions: navigationOptions
    }
}

const SettingsStack = createStackNavigator(screens);

export default SettingsStack