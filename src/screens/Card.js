import React, {useEffect} from 'react';
import {Alert, Image, SafeAreaView, Text, View} from 'react-native';
import SerialPortAPI from 'react-native-serial-port-api';
import StartOverButton from '../components/StartOverButton';
import {fonts} from '../constants/theme';
import {configs} from '../utils/configs';
import NfcManager from 'react-native-nfc-manager';
import nfc from '../utils/nfc';

const Card = ({navigation, route}) => {

    const {price} = route.params;

    const checkNFC = async () => {
        try {
            //const serialPort = await SerialPortAPI.open(configs.vendingSerialPort, {baudRate: 9600});
            const supported = await NfcManager.isSupported();
            if (supported) {
                const enabled = await NfcManager.isEnabled();
                if (enabled) {
                    const status = await nfc.payWithOROCard(price);
                    console.log(status)
                    //await serialPort.send('0606');
                    // navigation.replace('Result', {
                    //     success: false,
                    //     result: 'ORO Card Payment Fail',
                    //     message: 'not enough card balance',
                    // });

                    // await serialPort.send('05000A0F');
                    // await nfc.removeBalance(slot, price);
                    // navigation.replace('Result', {
                    //     success: true,
                    //     result: 'ORO Card Payment Success',
                    //     message: '',
                    // });

                } else {
                    Alert.alert(
                        'Alert',
                        'NFC is disabled, go to setting?',
                        [
                            {text: 'OK', onPress: () => NfcManager.goToNfcSetting()},
                        ],
                    );
                }
            } else {
                alert('Your device doesn\'t support NFC');
                navigation.goBack();
            }
        } catch (e) {
            console.log(e);
        }
    };


    useEffect(() => {
        checkNFC();
        return () => NfcManager.cancelTechnologyRequest();
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
