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

    async function example() {
        const serialPort = await SerialPortAPI.open('/dev/ttyS3', {baudRate: 9600});

        // subscribe received data
        const sub = serialPort.onReceived(buff => {
            const hex = buff.toString('hex');
            setQrResult(hex_to_ascii(hex));
        });

        console.log(sub);
        // unsubscribe
        // sub.remove();

        // close
        serialPort.close();
    }

    useEffect(() => {
        async function run() {
            const serialPort = await SerialPortAPI.open('/dev/ttyS3', {baudRate: 9600});

            // subscribe received data
            const sub = serialPort.onReceived(buff => {
                const hex = buff.toString('hex');
                setQrResult(hex_to_ascii(hex));
            });
            console.log(sub);
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
