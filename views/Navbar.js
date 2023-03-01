import {
  StyleSheet,

} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons } from "@expo/vector-icons";
import Search from "./Search";
import Infos from "./Infos";
import Preview from "./Preview";

export default function Navbar() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator  screenOptions={{ headerShown: false }} >
      <Tab.Screen
        name="Recherche"
        component={Search}
        options={{
          // tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused, activecolor  }) => (
            <SimpleLineIcons name="magnifier" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Infos"
        component={Infos}
        options={{
          // tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused, activecolor  }) => (
            <SimpleLineIcons name="info" size={size} color={color}  />
          ),
        }}
      />

<Tab.Screen
        name="Preview"
        component={Preview}
        options={{
          // tabBarLabel: "Home",
        //   tabBarIcon: ({ color, size, focused, activecolor  }) => (
        //     <SimpleLineIcons name="info" size={size} color={color}  />
        //   ),
        // tabBarIconStyle: { display: "none" },
        tabBarButton: () => null,
        // tabBarVisible: false,
        }}
      />


    </Tab.Navigator>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1ff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderRadius: 16,
    backgroundColor: "#fff",
    width: 250,
    height: 50,
    margin: 20,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "blue",
    width: 140,
    height: 36,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 16,
    margin: 36,
  },
  textbutton: {
    color: "white",
    alignSelf: "center",
    fontSize: 16,
  },
});

// import { SimpleLineIcons } from '@expo/vector-icons';

