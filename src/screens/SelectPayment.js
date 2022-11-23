import React, {useEffect} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import StartOverButton from '../components/StartOverButton';
import {fonts} from '../constants/theme';

const SelectPayment = ({navigation, route}) => {

    const {price} = route.params;

    const navigatePayment = async (type) => {
        navigation.replace(type, {price});
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
                        ...fonts.h2,
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
                                ...fonts.h3,
                                color: '#fff',
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
                                ...fonts.h3,
                                color: '#fff',
                            }}>
                                ORO CARD
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <StartOverButton navigation={navigation}/>
        </SafeAreaView>
    );
};

export default SelectPayment;
