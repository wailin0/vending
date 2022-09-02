import React, {useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import SerialPortAPI from 'react-native-serial-port-api';
import {decodeVMC} from '../utils/vmc';

const Result = ({navigation, route}) => {

    const {success, result} = route.params;

    useEffect(() => {
        async function endSession() {
            try {
                const serialPort = await SerialPortAPI.open('/dev/ttyS5', {baudRate: 9600});
                const sub = serialPort.onReceived(buff => {
                    const response = decodeVMC(buff);
				console.log(response)
                    //if (response === '00') {
                      //  serialPort.send('0707').then(res => {
                      //      console.log(res)
                      //  })
                        // sub.remove();
                        // setTimeout(() => {
                        //     navigation.dispatch(
                        //         CommonActions.reset({
                        //             index: 1,
                        //             routes: [
                        //                 {name: 'Main'},
                        //
                        //             ],
                        //         }),
                        //     );
                        // }, 3000);
                   // }
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
