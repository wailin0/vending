import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import SerialPortAPI from 'react-native-serial-port-api';
import {fonts, images} from '../constants/theme';
import {configs} from '../utils/configs';

const Main = ({navigation}) => {

    const start = async () => {
        navigation.navigate('Select Item');
        try {
            const serialPort = await SerialPortAPI.open(configs.vendingSerialPort, {baudRate: 9600});
            await serialPort.send('03FFFF01');
            navigation.replace('Select Item');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <SafeAreaView style={{
            flex: 1, justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 20,
        }}>


            <View style={{
                flex: 3,
                width: '100%',
                height: '100%',
            }}>

                {/*<Text style={{*/}
                {/*    marginTop: 50,*/}
                {/*    fontSize: 17,*/}
                {/*    color: 'black',*/}
                {/*}}>*/}
                {/*    DEVELOPMENT VERSION (10-26-2022)*/}
                {/*</Text>*/}
                <Image source={images.welcome}
                       style={{
                           width: '100%',
                           height: '100%',
                       }}
                       resizeMode="contain"
                />

            </View>


            <View style={{
                flex: 1,
                width: '100%',
            }}>
                <TouchableOpacity
                    onPress={start}
                    style={{
                        backgroundColor: '#2196F3',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                        width: '100%',
                        height: 60,
                    }}>
                    <Text style={{
                        ...fonts.h3,
                        color: '#fff',
                    }}>
                        START
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Main;
