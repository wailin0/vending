import React, {useState} from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import card from '../utils/card';

const Card = ({navigation}) => {
    const [nfcResult, setNfcResult] = useState();
    const [value, setValue] = useState('');

    const checkCard = async () => {
        try {
            await card.start();
            await card.connect(0);
            await card.selectApplet(0);
            const verifyPin = await card.verifyPin(0);

            if (verifyPin === '9000') {
                const balance = await card.checkBalance(0);
                setNfcResult(parseInt(balance.substring(0, balance.length - 4), 16));
            } else {
                alert('fail to scan ORO card');
            }
        } catch (e) {
            alert('fail to scan ORO card');
            console.log(e);
        }
    };


    return (
        <SafeAreaView style={{flex: 1}}>


            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{
                    color: '#000',
                }}>
                    card balance {nfcResult && nfcResult}
                </Text>
            </View>


            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                <Button title="check" onPress={checkCard}/>
            </View>

        </SafeAreaView>
    );
};
export default Card;
