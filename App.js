import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./views/Login";
import Navbar from './views/Navbar';
import * as React from "react";





export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer >
      <Stack.Navigator  screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Navbar" component={Navbar}  /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
        // <Stack.Screen name="Navbar" component={Navbar}  /> */}