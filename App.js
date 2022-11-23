import React, {useEffect, useState} from 'react';
import MainNavigation from './src/navigations/MainNavigation';
import NavigationContainer from '@react-navigation/native/src/NavigationContainer';
import storage from './src/utils/storage';
import KeyInput from './src/screens/KeyInput';
import {Context} from './src/components/Context';
import {navigationRef} from './src/navigations/rootNavigation';

const App = () => {
    const [hasKey, setHasKey] = useState(false);

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
