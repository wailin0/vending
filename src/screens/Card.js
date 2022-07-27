import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, Text, TextInput, View} from 'react-native';
import SerialPortAPI from 'react-native-serial-port-api';

const Card = ({navigation}) => {
    const [nfcResult, setNfcResult] = useState();
    const [value, setValue] = useState('');

    const send = async () => {
       try {
           const serialPort = await SerialPortAPI.open("/dev/ttyS7", { baudRate: 115200 });

           const sub = serialPort.onReceived(buff => {
               console.log(buff.toString('hex').toUpperCase());
           })


           // send data with hex format
           await serialPort.send('00FF');

           // close
           serialPort.close();
       }
       catch (e) {
           console.log(e)
       }
    }

    useEffect(() => {
        async function run() {
           try {
               const serialPort = await SerialPortAPI.open('/dev/ttyS7', {baudRate: 115200});

               // subscribe received data
               const sub = serialPort.onReceived(buff => {
                   const hex = buff.toString('hex');
                   setNfcResult(hex);
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
                    {nfcResult && nfcResult}
                </Text>
            </View>


            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                    value={value}
                    onChangeText={text => setValue(text)}
                    style={{
                        borderColor: '#000000',
                        borderWidth: 1,
                        borderRadius: 10,
                        width: '80%',
                        backgroundColor: 'white',
                        height: 50,
                        marginBottom: 20,
                    }}
                />
                <Button title="send" onPress={send}/>
            </View>

        </SafeAreaView>
    );
};
export default Card;
