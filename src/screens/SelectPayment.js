import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

const SelectPayment = ({navigation, route}) => {

    const {price} = route.params;

    const navigatePayment = async (type) => {
        navigation.navigate(type, {price});
    };

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', marginHorizontal: 20}}>
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{
                    marginTop: 10,
                    fontSize: 40,
                    color: '#000',
                    fontWeight: 'bold',
                }}>
                    ₱ {price}
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
                    marginTop: 30,
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

            {/*<TouchableOpacity*/}
            {/*    onPress={() => navigation.goBack()}*/}
            {/*    style={{*/}
            {/*        backgroundColor: '#2a3498',*/}
            {/*        justifyContent: 'center',*/}
            {/*        alignItems: 'center',*/}
            {/*        borderRadius: 10,*/}
            {/*        width: '100%',*/}
            {/*        height: 50,*/}
            {/*        marginBottom: 20,*/}
            {/*    }}>*/}
            {/*    <Text style={{*/}
            {/*        fontSize: 15,*/}
            {/*        color: '#fff',*/}
            {/*    }}>*/}
            {/*        START OVER*/}
            {/*    </Text>*/}
            {/*</TouchableOpacity>*/}
        </SafeAreaView>
    );
};

export default SelectPayment;
