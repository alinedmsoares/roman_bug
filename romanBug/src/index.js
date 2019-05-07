import {
    createBottomTabNavigator,
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator
} from "react-navigation";

import Projetos from "./pages/projetos";
import Swipeable from "react-native-gesture-handler/Swipeable";

const ProjetosNavigator = createBottomTabNavigator(
    {
        Projetos
    },
    {
        initialRouteName: "Main",
        swipeEnabled: true,
        tabBarOptions: {
            showLabel: false,
            showIcon: true,
            inactiveBackgroundColor: "#dd99ff",
            activeBackgroundColor: "#B727FF",
            activeTintColor: "#FFFFFF",
            inactiveTintColor: "#FFFFFF",
            style: {
                height: 50
            }
        }
    }
);

