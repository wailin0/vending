import React from 'react';
import MainNavigation from './src/navigations/MainNavigation';
import NavigationContainer from '@react-navigation/native/src/NavigationContainer';

const App = () => {

    return (
        <NavigationContainer
        >
            <MainNavigation/>
        </NavigationContainer>
    );
};


export default App;
