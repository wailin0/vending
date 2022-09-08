import React, {useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';
import SerialPortAPI from 'react-native-serial-port-api';

const StartOverButton = ({navigation}) => {

    const startOver = async () => {
        const serialPort = await SerialPortAPI.open('/dev/ttyS5', {baudRate: 9600});
        await serialPort.send('0707');
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    {name: 'Main'},
                ],
            }),
        );
    };

    useEffect(() => {
        const timeOut = setTimeout(() => {
            startOver();
        }, 20000);

        return () => clearTimeout(timeOut);
    }, []);


    return (
        <View style={{
            flex: 1,
            width: '100%',
        }}>
            <TouchableOpacity
                onPress={startOver}
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
                    START OVER
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default StartOverButton;
