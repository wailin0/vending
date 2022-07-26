import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';

const Home = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>

            <TouchableOpacity
                onPress={() => navigation.navigate('QR')}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#6dcf78',
                    height: '45%',
                    width: '90%',
                    borderRadius: 20,
                }}>
                <Text style={{
                    color: '#fff',
                    fontSize: 20,
                }}>
                    QR
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Card')}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#961ebe',
                    height: '45%',
                    width: '90%',
                    borderRadius: 20,
                }}>
                <Text style={{
                    color: '#fff',
                    fontSize: 20,
                }}>
                    CARD
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Home;
