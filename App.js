import React, {useEffect, useState} from 'react';
import MainNavigation from './src/navigations/MainNavigation';
import NavigationContainer from '@react-navigation/native/src/NavigationContainer';
import storage from './src/utils/storage';
import KeyInput from './src/screens/KeyInput';
import {Context} from './src/components/Context';
import {navigationRef} from './src/navigations/rootNavigation';
import Loading from './src/screens/Loading';
import SerialPortAPI from 'react-native-serial-port-api';

const App = () => {
    const [hasKey, setHasKey] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        SerialPortAPI.devicePathsAsync().then(r => alert('serial port list, \n'+r));
    }, []);

    useEffect(() => {
        setLoading(true)
        storage.getItem().then(item => {
            if (item) {
                setHasKey(true);
            } else {
                setHasKey(false);
            }
            setLoading(false)
        });
    }, []);

    if (loading){
        return <Loading />
    }

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
