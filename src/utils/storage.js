import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'key';

const saveItem = async (value) => {
    try {
        return await AsyncStorage.setItem(key, value);
    } catch (e) {
        return e;
    }
};

const getItem = async () => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (e) {
        return e;
    }
};

const clearItem = async () => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        return e;
    }
};


export default {
    getItem,
    saveItem,
    clearItem,
};
