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
                            success: 0,
                            result: 'not enough oro card balance',
                        });
                    } else {
                        await card.removeBalance(slot, price);
                        navigation.replace('Result', {
                            success: 1,
                            result: 'oro card payment success',
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
        <SafeAreaView style={{flex: 1, marginHorizontal: 20}}>
            <View
                style={{
                    flex: 1,
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
export default Card;
