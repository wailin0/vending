import React, {useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import SerialPortAPI from 'react-native-serial-port-api';

const Result = ({navigation, route}) => {

    const {success, result} = route.params;

    useEffect(() => {
        async function endSession() {
            try {
                const serialPort = await SerialPortAPI.open('/dev/ttyS5', {baudRate: 9600});
                await serialPort.send('0707');
                serialPort.onReceived(buff => {
                    const hex = buff.toString('hex');
                    console.log(hex);
                    if (hex) {
                        setTimeout(() => {
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 1,
                                    routes: [
                                        {name: 'Main'},

                                    ],
                                }),
                            );
                        }, 3000);
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }

        endSession();
    });

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 20,
            }}>
                <Text>
                    {result}
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default Result;
