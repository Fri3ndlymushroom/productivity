import { createStackNavigator } from "react-navigation-stack";

import {headerStyle} from "../styles/global"

import Settings from "../screens/Settings";
import Backups from "../screens/Backups"
import Signin from "../screens/Signin"
import Pro from "../screens/Pro"

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
    Signin:{
        screen: Signin,
        navigationOptions: navigationOptions
    },
    Backups: {
        screen: Backups,
        navigationOptions: navigationOptions
    },
    Pro:{
        screen: Pro,
        navigationOptions: navigationOptions
    }
}

const SettingsStack = createStackNavigator(screens);

export default SettingsStack