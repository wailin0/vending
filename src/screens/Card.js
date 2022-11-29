import React, {useEffect} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import card from '../utils/card';
import SerialPortAPI from 'react-native-serial-port-api';
import StartOverButton from '../components/StartOverButton';
import {fonts} from '../constants/theme';
import {configs} from '../utils/configs';

const Card = ({navigation, route}) => {

    const {price} = route.params;

    const checkCard = async () => {
        const slot = 0;
        try {
            const serialPort = await SerialPortAPI.open(configs.vendingSerialPort, {baudRate: 9600});
            await card.start();
            const interval = setInterval(async () => {
                await card.connect(slot);
                await card.selectApplet(slot);
                const verifyPin = await card.verifyPin(slot);
                if (verifyPin === '9000') {
                    const balance = await card.checkBalance(slot);
                    clearInterval(interval);
                    if (price > parseInt(balance.substring(slot, balance.length - 4), 16)) {
                        await serialPort.send('0606');
                        navigation.replace('Result', {
                            success: false,
                            result: 'ORO Card Payment Fail',
                            message: 'not enough card balance',
                        });
                    } else {
                        await serialPort.send('05000A0F');
                        await card.removeBalance(slot, price);
                        navigation.replace('Result', {
                            success: true,
                            result: 'ORO Card Payment Success',
                            message: '',
                        });
                    }
                }
            }, 2000);
        } catch (e) {
            alert(e);
        }
    };

    useEffect(() => {
        checkCard();
    }, []);

    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 20,
        }}>
            <View
                style={{
                    flex: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        ...fonts.h3,
                        color: '#000',
                        fontWeight: 'bold',
                        marginBottom: 30,
                    }}>
                    Scan to pay with ORO Card
                </Text>
                <Image
                    source={{uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Universal_Contactless_Card_Symbol.svg/250px-Universal_Contactless_Card_Symbol.svg.png'}}
                    style={{
                        width: 200,
                        height: 100,
                    }}
                    resizeMode="contain"
                />
            </View>
            <StartOverButton navigation={navigation}/>
        </SafeAreaView>
    );
};
export default Card;
