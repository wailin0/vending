import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SelectPayment from '../screens/SelectPayment';
import QR from '../screens/QR';
import Card from '../screens/Card';
import Main from '../screens/Main';
import SelectItem from '../screens/SelectItem';
import Result from '../screens/Result';

const Stack = createStackNavigator();

const MainNavigation = () => {

    return (
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Main" component={Main}/>
            <Stack.Screen name="Select Item" component={SelectItem}/>
            <Stack.Screen name="Select Payment" component={SelectPayment}/>
            <Stack.Screen name="QR" component={QR}/>
            <Stack.Screen name="Card" component={Card}/>
            <Stack.Screen name="Result" component={Result}/>
        </Stack.Navigator>
    );
};

export default MainNavigation;
