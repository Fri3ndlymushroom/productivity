import { createStackNavigator } from "react-navigation-stack";

import Timeline from "../screens/Timeline"
import AddProject from "../screens/AddProject"
import ProjectView from "../screens/ProjectView";
import EditLog from "../screens/EditLogs"
import EditProject from "../screens/EditProject"
import Archive from "../screens/Archive";

import { headerStyle } from "../styles/global"

const navigationOptions = {

    headerStyle: headerStyle,
    headerTintColor: '#fff',
    headerTitleStyle: {
    },

}

const screens = {
    Timeline: {
        screen: Timeline,

        navigationOptions: {
            header: null
        }
    },
    AddProject: {
        screen: AddProject,
        navigationOptions: navigationOptions
    },
    ProjectView: {
        screen: ProjectView,
        navigationOptions: navigationOptions
    },
    EditLog: {
        screen: EditLog,
        navigationOptions: navigationOptions
    },
    EditProject: {
        screen: EditProject,
        navigationOptions: navigationOptions
    },
    Archive: {
        screen: Archive,
        navigationOptions: navigationOptions
    }
}

const TimelineStack = createStackNavigator(screens);

export default TimelineStack