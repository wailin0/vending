import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import api from '../services/api';
import Loading from './Loading';
import SerialPortAPI from 'react-native-serial-port-api';
import StartOverButton from '../components/StartOverButton';
import {fonts} from '../constants/theme';
import {configs} from '../utils/configs';

const QR = ({navigation, route}) => {

    const {price} = route.params;
    const [qrData, setQRData] = useState(null);

    useEffect(() => {
        let interval;
        if (qrData) {
            const checkQR = async () => {
                try {
                    const serialPort = await SerialPortAPI.open(configs.vendingSerialPort, {baudRate: 9600});
                    interval = setInterval(async () => {
                        const postData = {
                            'transaction_id': qrData.transaction_id,
                            'transaction_reference': '1234-1234567890124',
                        };
                        const response = await api.checkQR(postData);
                        if (response.status === 1) {
                            await serialPort.send('05000A0F');
                            navigation.replace('Result', {
                                success: true,
                                result: 'QR Payment Success',
                                message: '',
                            });
                        } else if (response.status === -1) {
                            await serialPort.send('0606');
                            navigation.replace('Result', {
                                success: false,
                                result: 'QR Payment Fail',
                                message: 'invalid QR code',
                            });
                        }

                    }, 4000);

                } catch (e) {
                    console.log(e);
                }
            };

            checkQR();

        }

        return () => clearInterval(interval);
    }, [qrData]);

    useEffect(() => {
        const postData = {
            'transaction_description': 'vending machine app purchase',
            'transaction_amount': price.toFixed(2),
            'transaction_currency': 'PHP',
            'transaction_reference': (Math.random() + 1).toString(36).substring(2),
            'transaction_datetime': new Date(Date.now()),
            'items': [
                {
                    'id': (Math.random() + 1).toString(36).substring(2),
                    'name': 'vending machine app purchase',
                    'quantity': '1',
                    'picture_url': 'https://',
                    'unit_price': price.toFixed(2),
                },
            ],
            'trade_id': (Math.random() + 1).toString(36).substring(2),
            'machine_tag': 'Vending Machine (Ground Floor)',
            'callback_URL': 'https://',
            'remark': '',
        };
        api.generateQR(postData)
            .then(res => {
                if (res.status === 1) {
                    setQRData(res);
                }
            });
    }, []);


    if (!qrData) {
        return <Loading/>;
    }

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
            }}>
                <Text
                    style={{
                        ...fonts.h3,
                        color: '#000',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: 30,
                    }}>
                    Scan to pay with ORO Wallet
                </Text>
                <QRCode
                    value={`vending/${qrData.qr_data}`}
                    size={200}
                />
            </View>
            <StartOverButton navigation={navigation}/>
        </SafeAreaView>
    );
};

export default QR;
