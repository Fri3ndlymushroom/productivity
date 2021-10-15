import { createStackNavigator } from "react-navigation-stack";

import Timeline from "../screens/timeline"
import AddProject from "../screens/addproject"
import ProjectView from "../screens/projectview";


import {headerStyle} from "../styles/global"

const screens = {
    Timeline: {
        screen: Timeline,
        navigationOptions: {headerStyle: headerStyle}
    },
    AddProject:{
        screen: AddProject,
        navigationOptions: {headerStyle: headerStyle}
    },
    ProjectView:{
        screen: ProjectView,
        navigationOptions: {headerStyle: headerStyle}
    }
}

const TimelineStack = createStackNavigator(screens);

export default TimelineStack