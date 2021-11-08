import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

import AnalyticsStack from "./analyticsStack";
import TimelineStack from "./homeStack";
import SettingsStack from "./settingsStack";


const RootDrawNavigator = createDrawerNavigator(
    {
        Timeline: {
            screen: TimelineStack,

        },
        Analytics: {
            screen: AnalyticsStack,
        },

        Settings: {
            screen: SettingsStack,
        },

    },
    {
        edgeWidth: 0
    }

)

export default createAppContainer(RootDrawNavigator)