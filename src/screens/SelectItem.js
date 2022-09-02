import React, {useState} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import SerialPortAPI from 'react-native-serial-port-api';

const SelectItem = ({navigation}) => {


    useState(() => {
        async function startSession() {
            try {
                const serialPort = await SerialPortAPI.open('/dev/ttyS5', {baudRate: 9600});
                await serialPort.send('03FFFF01');
                serialPort.onReceived(buff => {
                    const hex = buff.toString('hex');
                    console.log(hex);
                    if (hex) {
                        navigation.replace('Select Payment', {
                            item: {
                                number: 3, price: 20,
                            },
                        });
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }

        startSession();
    });

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 20,
            }}>
                <Text style={{
                    fontSize: 20,
                    color: '#000',
                    fontWeight: 'bold',
                }}>
                    use the keypad to select the item
                </Text>
                <Image
                    source={{uri: 'https://envato-shoebox-0.imgix.net/2d66/0088-2893-4ff4-a856-2a8cd8ba120c/syda_0218836.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=700&s=556119c6115982e0d9766183f3f2fdbe'}}
                    style={{
                        width: '100%',
                        height: 300,
                    }}
                    resizeMode="contain"
                />
            </View>
        </SafeAreaView>
    );
};

export default SelectItem;
