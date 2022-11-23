import React, {useContext, useState} from 'react';
import {SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import storage from '../utils/storage';
import {Context} from '../components/Context';
import {fonts} from '../constants/theme';

const KeyInput = () => {
    const [key, setKey] = useState('');

    const {setHasKey} = useContext(Context);

    const submitKey = async () => {
        await storage.saveItem(key);
        alert('API key saved successfully');
        setHasKey(true);
    };


    return (
        <SafeAreaView style={{flex: 1, marginHorizontal: 20}}>

            <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                    ...fonts.h3,
                    color: 'black',
                }}>
                    Enter API Key
                </Text>

                <TextInput
                    value={key}
                    onChangeText={text => setKey(text)}
                    style={{
                        backgroundColor: '#f7f2f2',
                        width: '100%',
                        height: 40,
                        borderRadius: 5,
                        marginTop: 20,
                        borderWidth: 1,
                    }}
                />
                <TouchableOpacity
                    onPress={submitKey}
                    style={{
                        marginTop: 40,
                        backgroundColor: '#2196F3',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                        width: '100%',
                        height: 60,
                    }}>
                    <Text style={{
                        ...fonts.h3,
                        color: '#fff',
                    }}>
                        SUBMIT
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

export default KeyInput;
