import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import api from '../services/api';
import Loading from './Loading';
import {configs} from '../utils/configs';
import SerialPortAPI from 'react-native-serial-port-api';

const QR = ({navigation, route}) => {

    const {price} = route.params;
    const [qrData, setQRData] = useState(null);

    useEffect(() => {
        let interval;
        if (qrData) {
            const checkQR = async () => {
                try {
                    const serialPort = await SerialPortAPI.open('/dev/ttyS5', {baudRate: 9600});
                    interval = setInterval(async () => {
                        const postData = {
                            'transaction_id': qrData.transaction_id,
                            'transaction_reference': '1234-1234567890124',
                            'apiKey': configs.apiKey,
                        };
                        const response = await api.checkQR(postData);
                        if (response.status === 1) {
                            await serialPort.send('05000A0F');
                            navigation.replace('Result', {
                                success: 1,
                                result: "qr payment success"
                            });
                        } else if (response.status === -1) {
                            await serialPort.send('0606');
                            navigation.replace('Result', {
                                success: 0,
                                result: "qr payment fail, invalid qr code"
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
                    'name': "vending machine app purchase",
                    'quantity': '1',
                    'picture_url': 'https://',
                    'unit_price': price.toFixed(2),
                },
            ],
            'trade_id': (Math.random() + 1).toString(36).substring(2),
            'machine_tag': 'Vending Machine (Ground Floor)',
            'callback_URL': 'https://',
            'remark': '',
            'apiKey': configs.apiKey,
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
        <SafeAreaView style={{flex: 1, marginHorizontal: 20}}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text
                    style={{
                        fontSize: 20,
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
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    backgroundColor: '#2a3498',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    width: '100%',
                    height: 50,
                    marginBottom: 20,
                }}>
                <Text style={{
                    fontSize: 15,
                    color: '#fff',
                }}>
                    CANCEL
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default QR;
