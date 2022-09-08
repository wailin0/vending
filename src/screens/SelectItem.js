import React, {useState} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import SerialPortAPI from 'react-native-serial-port-api';
import {decodeVMC} from '../utils/vmc';
import {images} from '../constants/theme';
import StartOverButton from '../components/StartOverButton';

const SelectItem = ({navigation}) => {

    useState(() => {
        async function startSession() {
            try {
                const serialPort = await SerialPortAPI.open('/dev/ttyS5', {baudRate: 9600});
                const sub = serialPort.onReceived(buff => {
                    const response = decodeVMC(buff);
                    if (response.substr(0, 4) === '1300') {
                        sub.remove();
                        const price = parseInt(response.substr(4, 4), 16) / 100;
                        navigation.replace('Select Payment', {price});
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }

        startSession();
    });


    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 20,
        }}>
            <View style={{
                flex: 3,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 20,
                width: '100%',
                height: '100%',
            }}>
                <Text style={{
                    fontSize: 20,
                    color: '#000',
                    fontWeight: 'bold',
                }}>
                    use the keypad to select the item
                </Text>
                <Image
                    source={{uri: images.vendingMachine}}
                    style={{
                        width: '100%',
                        height: '50%',
                    }}
                    resizeMode="contain"
                />
            </View>

            <StartOverButton navigation={navigation}/>
        </SafeAreaView>
    );
};

export default SelectItem;
