import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import SerialPortAPI from 'react-native-serial-port-api';
import {CommonActions} from '@react-navigation/native';
import {decodeVMC} from '../utils/vmc';

const SelectPayment = ({navigation, route}) => {

    const {price} = route.params;

    const navigatePayment = async (type) => {
        navigation.navigate(type, {price});
    };


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

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'space-between', marginHorizontal: 20}}>
            <View style={{
                flex: 3,
                justifyContent: 'center',
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        fontSize: 40,
                        color: '#000',
                        fontWeight: 'bold',
                    }}>
                        ₱ {price.toFixed(2)}
                    </Text>
                </View>


                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        fontSize: 20,
                        color: '#000',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}>
                        select payment
                    </Text>
                    <View style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <TouchableOpacity
                            onPress={() => navigatePayment('QR')}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#6dcf78',
                                height: 150,
                                width: '47%',
                                borderRadius: 10,
                            }}>
                            <Text style={{
                                color: '#fff',
                                fontSize: 18,
                            }}>
                                QR
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigatePayment('Card')}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#7965d6',
                                height: 150,
                                width: '47%',
                                borderRadius: 10,
                            }}>
                            <Text style={{
                                color: '#fff',
                                fontSize: 18,
                            }}>
                                ORO CARD
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
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

export default SelectPayment;
