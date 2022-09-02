import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

const Main = ({navigation}) => {

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 20,
            }}>
                <TouchableOpacity
                    onPress={() => navigation.replace('Select Item')}
                    style={{
                        backgroundColor: '#d09b9b',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                        width: '100%',
                        height: 60,
                    }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 20,
                    }}>
                        Touch To Start
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Main;
