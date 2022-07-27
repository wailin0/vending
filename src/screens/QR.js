import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import SerialPortAPI from 'react-native-serial-port-api';

const QR = ({navigation}) => {
    const [qrResult, setQrResult] = useState();

    function hex_to_ascii(str1) {
        var hex = str1.toString();
        var str = '';
        for (var n = 0; n < hex.length; n += 2) {
            str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
        }
        return str;
    }

    useEffect(() => {
        async function run() {
            try {
                const serialPort = await SerialPortAPI.open('/dev/ttyS3', {baudRate: 9600});

                // subscribe received data
                const sub = serialPort.onReceived(buff => {
                    const hex = buff.toString('hex');
                    setQrResult(hex_to_ascii(hex));
                });
            }
            catch (e) {
                console.log(e)
            }
        }

        run();
    }, []);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{
                    color: '#000',

                }}>
                    {qrResult && qrResult}
                </Text>

            </View>
        </SafeAreaView>
    );
};

export default QR;
