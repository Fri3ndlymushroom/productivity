import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

import AnalyticsStack from "./analyticsStack";
import TimelineStack from "./homeStack";


const RootDrawNavigator = createDrawerNavigator({
    Timeline: {
        screen: TimelineStack,
    },
    Analytics: {
        screen: AnalyticsStack,
    },

    
})

export default createAppContainer(RootDrawNavigator)