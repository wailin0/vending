import React, {useEffect, useState} from 'react';
import SerialPortAPI from 'react-native-serial-port-api';
import {Button, SafeAreaView, Text, TextInput, View} from 'react-native';

const App = () => {
    const [nfcResult, setNfcResult] = useState('');
    const [qrResult, setQrResult] = useState('');
    const [value, setValue] = useState('');

    async function run() {
        const nfcPort = await SerialPortAPI.open('/dev/ttyS7', {baudRate: 115200});
        const qrPort = await SerialPortAPI.open('/dev/ttyS3', {baudRate: 9600});

        // subscribe received data
        nfcPort.onReceived(buff => {
            setNfcResult(buff);
        });

        qrPort.onReceived(buff => {
            setQrResult(buff);
        });

        // unsubscribe0
        // sub.remove();

        // // send data with hex format
        // await serialPort.send('00FF');

        // // close
        // serialPort.close();
    }

    const send = async () => {
        const nfcPort = await SerialPortAPI.open('/dev/ttyS7', {baudRate: 115200});
        await nfcPort.send(value.toUpperCase());
    };

    useEffect(() => {
        run();
    }, []);


    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center',
            marginHorizontal: 20,
        }}>
            <View style={{
                flex: 1,
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: 20,
                    marginBottom:10
                }}>
                    QR Code Test
                </Text>
                <Text style={{
                    color: 'black',
                    fontSize: 17,
                }}>
                    Output
                </Text>
                <Text style={{
                    backgroundColor: '#fff',
                    marginTop: 10,
                    padding: 10,
                    elevation: 3,
                }}>
                    {qrResult && qrResult}
                </Text>
            </View>

            <View style={{
                flex: 1,
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: 20,
                    marginBottom:10
                }}>
                    NFC Test
                </Text>
                <Text style={{
                    color: 'black',
                    fontSize: 17,
                }}>
                    Output
                </Text>
                <Text style={{
                    backgroundColor: '#fff',
                    marginTop: 10,
                    padding: 10,
                    elevation: 3,
                }}>
                    {nfcResult && nfcResult}
                </Text>

                <Text style={{
                    marginTop: 20,
                    color: '#000',
                }}>
                    HEX:
                </Text>
                <TextInput
                    value={value}
                    placeholder="enter hex value"
                    onChangeText={text => setValue(text)}
                    style={{
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingLeft: 10,
                        marginVertical: 10,
                        borderColor: '#d2cbcb',
                        height: 40,
                    }}
                />
                <Button title="send" onPress={send}/>
            </View>
        </SafeAreaView>
    );
};


export default App;
