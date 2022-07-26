import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import SerialPortAPI from 'react-native-serial-port-api';

const Card = ({navigation}) => {
    const [nfcResult, setNfcResult] = useState();

    async function example() {
        const serialPort = await SerialPortAPI.open('/dev/ttyS7', {baudRate: 115200});

        // subscribe received data
        const sub = serialPort.onReceived(buff => {
            const hex = buff.toString('hex');
            setNfcResult(hex);
        });

        console.log(sub);
        // unsubscribe
        // sub.remove();

        // close
        serialPort.close();
    }

    return (
        <SafeAreaView style={{flex: 1}}>


            <Text style={{
                color:'#000'
            }}>
                {nfcResult && nfcResult}
            </Text>

        </SafeAreaView>
    );
};
export default Card;
