import React, {useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import SerialPortAPI from 'react-native-serial-port-api';
import {CommonActions} from '@react-navigation/native';
import {decodeVMC} from '../utils/vmc';
import {images} from '../constants/theme';

const SelectItem = ({navigation}) => {

    const startOver = async () => {
        const serialPort = await SerialPortAPI.open('/dev/ttyS5', {baudRate: 9600});
        await serialPort.send('0707');
        const sub = serialPort.onReceived(buff => {
            const response = decodeVMC(buff);
            if (response === '00') {
                sub.remove();
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            {name: 'Main'},

                        ],
                    }),
                );
            }
        });
    };


    useState(() => {
     setTimeout(() => {
         navigation.replace('Select Payment', {price: 6});
     }, 4000)
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
            <View style={{
                flex: 1,
                width: '100%',
            }}>
                <TouchableOpacity
                    onPress={startOver}
                    style={{
                        backgroundColor: '#2196F3',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                        width: '100%',
                        height: 60,
                    }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 18,
                    }}>
                        START OVER
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default SelectItem;
