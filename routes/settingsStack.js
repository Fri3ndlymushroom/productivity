import { createStackNavigator } from "react-navigation-stack";

import {headerStyle} from "../styles/global"

import Settings from "../screens/Settings";

const screens = {
    Settings: {
        screen: Settings,
        navigationOptions: {headerStyle: headerStyle}
    }
}

const SettingsStack = createStackNavigator(screens);

export default SettingsStack