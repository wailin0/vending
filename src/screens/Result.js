import React, {useEffect} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import SerialPortAPI from 'react-native-serial-port-api';
import {decodeVMC} from '../utils/vmc';
import {icons} from '../constants/theme';

const Result = ({navigation, route}) => {

    const {success, result, message} = route.params;

    useEffect(() => {
        async function endSession() {
            try {
                const serialPort = await SerialPortAPI.open('/dev/ttyS5', {baudRate: 9600});
                const sub = serialPort.onReceived(buff => {
                    const response = decodeVMC(buff);
                    if (response === '130417') {
                        serialPort.send('0707').then(buff => {
                            const response = decodeVMC(buff);


                            sub.remove();
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

                        });

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
                <Image
                    source={success ? icons.success : icons.error}
                    style={{
                        width: 150,
                        height: 150,
                    }}
                />
                <Text style={{
                    color: '#000',
                    marginTop: 20,
                    fontSize: 20,
                }}>
                    {result}
                </Text>
            </View>

            <Text style={{
                marginBottom: 40,
                textAlign: 'center',
            }}>
                {message}
            </Text>
        </SafeAreaView>
    );
};

export default Result;
