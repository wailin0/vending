import {createStackNavigator} from '@react-navigation/stack';
import React from "react";
import Home from '../screens/Home';
import QR from '../screens/QR';
import Card from '../screens/Card';

const Stack = createStackNavigator();


const MainNavigation = () => {

    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="QR" component={QR}/>
            <Stack.Screen name="Card" component={Card}/>
        </Stack.Navigator>
    );
};

export default MainNavigation;
