import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Home from "../screens/home"
import Home2 from "../screens/home2"

const screens = {
    Home: {
        screen: Home
    },
    Home2: {
        screen: Home2
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack)