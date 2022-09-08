import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import SerialPortAPI from 'react-native-serial-port-api';
import {images} from '../constants/theme';

const Main = ({navigation}) => {

    const start = async () => {
        try {
            const serialPort = await SerialPortAPI.open('/dev/ttyS5', {baudRate: 9600});
            await serialPort.send('03FFFF01');
            navigation.replace('Select Item');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <SafeAreaView style={{
            flex: 1, justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 20,
        }}>
            <View style={{
                flex: 3,
                width: '100%',
                height: '100%',
            }}>
                <Image source={{uri: images.welcome}}
                       style={{
                           width: '100%',
                           height: '100%',
                       }}
                       resizeMode="contain"
                />
            </View>
            <View style={{
                flex: 1,
                width: '100%',
            }}>
                <TouchableOpacity
                    onPress={start}
                    style={{
                        backgroundColor: '#2196F3',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                        width: '100%',
                        height: 60,
                    }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 18,
                    }}>
                        START
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Main;
