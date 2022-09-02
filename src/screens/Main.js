import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import SerialPortAPI from 'react-native-serial-port-api';
import {decodeVMC} from '../utils/vmc';

const Main = ({navigation}) => {

    const start = async () => {
        try {
            const serialPort = await SerialPortAPI.open('/dev/ttyS5', {baudRate: 9600});
            await serialPort.send('03FFFF01');
            serialPort.onReceived(buff => {
                const response = decodeVMC(buff);
                if (response === '00') {
                    navigation.replace('Select Item');
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 20,
            }}>
                <TouchableOpacity
                    onPress={start}
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
