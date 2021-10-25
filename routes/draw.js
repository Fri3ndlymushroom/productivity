import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

import AnalyticsStack from "./analyticsStack";
import TimelineStack from "./homeStack";


const RootDrawNavigator = createDrawerNavigator({
    Analytics: {
        screen: AnalyticsStack,
    },
    Timeline: {
        screen: TimelineStack,
    },
    
})

export default createAppContainer(RootDrawNavigator)