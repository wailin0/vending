import React, {useEffect} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import card from '../utils/card';

const Card = ({navigation, route}) => {

    const {price} = route.params;

    const checkCard = async () => {
        const slot = 0;
        try {
            await card.start();
            const interval = setInterval(async () => {
                await card.connect(slot);
                await card.selectApplet(slot);
                const verifyPin = await card.verifyPin(slot);
                if (verifyPin === '9000') {
                    const balance = await card.checkBalance(slot);
                    clearInterval(interval);
                    console.log(parseInt(balance.substring(slot, balance.length - 4), 16));
                    if (price > parseInt(balance.substring(slot, balance.length - 4), 16)) {
                        navigation.replace('Result', {
                            success: false,
                            result: 'ORO Card Payment Fail',
                            message: "not enough card balance"
                        });
                    } else {
                        await card.removeBalance(slot, price);
                        navigation.replace('Result', {
                            success: true,
                            result: 'ORO Card Payment Success',
                            message: ""
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

    //
    // useEffect(
    //     () =>
    //         navigation.addListener('beforeRemove', (e) => {
    //             e.preventDefault();
    //             Alert.alert(
    //                 '',
    //                 'Cancel ORO Card payment?',
    //                 [
    //                     {
    //                         text: 'cancel',
    //                         onPress: () => {
    //                         },
    //                     },
    //                     {
    //                         text: 'confirm',
    //                         onPress: () => navigation.dispatch(e.data.action),
    //                     },
    //                 ],
    //             );
    //         }),
    //     [navigation],
    // );

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
                        fontSize: 20,
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
            <View style={{
                flex: 1,
                width: '100%',
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        backgroundColor: '#2196F3',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                        fontSize: 18, width: '100%',
                        height: 60,
                    }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 18,
                    }}>
                        CANCEL
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
export default Card;
