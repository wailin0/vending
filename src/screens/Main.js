import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

const Main = ({navigation}) => {

const start = asyn () => {
 try {
                const serialPort = await SerialPortAPI.open('/dev/ttyS5', {baudRate: 9600});
navigation.replace('Select Item')
                await serialPort.send('03FFFF01');
                serialPort.onReceived(buff => {
                    const hex = buff.toString('hex');
			const ascii = hex2a(hex)
                    console.log(ascii.substring(1, ascii.length-1));
                    if (hex) {
                    //    navigation.replace('Select Payment', {
                     //       item: {
                      //          number: 3, price: 20,
                      //      },
                      //  });
                    }
                });
            } catch (e) {
                console.log(e);
            }
}
 
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 20,
            }}>
                <TouchableOpacity
                    onPress={start}
                    style={{
                        backgroundColor: '#d09b9b',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                        width: '100%',
                        height: 60,
                    }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 20,
                    }}>
                        Touch To Start
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Main;
