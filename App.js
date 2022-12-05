import React, {useEffect, useState} from 'react';
import MainNavigation from './src/navigations/MainNavigation';
import NavigationContainer from '@react-navigation/native/src/NavigationContainer';
import storage from './src/utils/storage';
import KeyInput from './src/screens/KeyInput';
import {Context} from './src/components/Context';
import {navigationRef} from './src/navigations/rootNavigation';
import { RNSerialport, definitions, actions } from "react-native-usb-serialport";

const App = () => {
    const [hasKey, setHasKey] = useState(false);


    const start = async () => {
        try {
            RNSerialport.startUsbService()
            RNSerialport.getDeviceList().then(res => alert(JSON.stringify(res)))
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        start()
    }, []);

    useEffect(() => {
        storage.getItem().then(item => {
            if (item) {
                setHasKey(true);
            } else {
                setHasKey(false);
            }
        });
    }, []);

    return (
        <Context.Provider value={{hasKey, setHasKey}}>
            {hasKey
                ?
                <NavigationContainer
                    ref={navigationRef}
                >
                    <MainNavigation/>
                </NavigationContainer>
                :
                <KeyInput/>
            }
        </Context.Provider>
    );
};


export default App;
